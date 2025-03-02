/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useSocket } from "@/lib/socket/socketHook";
import { useQuery } from "@tanstack/react-query";

interface CallMadeData {
  socket: string;
  offer: RTCSessionDescriptionInit;
}

interface AnswerMadeData {
  socket: string;
  answer: RTCSessionDescriptionInit;
}

interface CallRejectedData {
  socket: string;
}

interface RemoveUserData {
  socketId: string;
}

interface UpdateUserListData {
  users: string[];
}

interface CallEndData {
  from: string;
}

const WebRTCVideoChat: React.FC = () => {
  const soc = useSocket();

  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [isAlreadyCalling, setIsAlreadyCalling] = useState<boolean>(false);
  const [getCalled, setGetCalled] = useState<boolean>(false);
  const [calledId, setCalledId] = useState<string | null>(null);
  const [connectionState, setConnectionState] = useState<string>("new");

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  // Initialize WebRTC peer connection
  const createPeerConnection = () => {
    console.log("Creating new peer connection");

    // Close any existing connection first
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.day2dayja.com:3478",
            "turn:stun.day2dayja.com:3478",
          ],
          username: "1735831006:demo",
          credential: "dT3gZCCn4Dfa/kachCT3369m6v0=",
        },
      ],
    });

    // Set up event handlers
    pc.ontrack = (event: RTCTrackEvent) => {
      console.log("Remote track received", event.streams);
      if (remoteVideoRef.current && event.streams && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        soc?.socketEmitListen("ice-candidate", {
          candidate: event.candidate,
          to: calledId || selectedUser,
        });
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state changed to:", pc.iceConnectionState);
      if (
        pc.iceConnectionState === "disconnected" ||
        pc.iceConnectionState === "failed" ||
        pc.iceConnectionState === "closed"
      ) {
        // Handle disconnect
        resetCall();
      }
    };

    pc.onsignalingstatechange = () => {
      console.log("Signaling state changed to:", pc.signalingState);
      setConnectionState(pc.signalingState);
      if (pc.signalingState === "closed") {
        resetCall();
      }
    };

    // Add tracks from local stream if available
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        if (localStreamRef.current) {
          pc.addTrack(track, localStreamRef.current);
        }
      });
    }

    peerConnectionRef.current = pc;
    return pc;
  };

  // Reset call state without closing the connection
  const resetCall = () => {
    setIsAlreadyCalling(false);
    setGetCalled(false);
    setSelectedUser(null);
  };

  // Set up socket event listeners
  useEffect(() => {
    if (!soc) return;

    // Function for handling socket events
    const handleUpdateUserList = (data: UpdateUserListData) => {
      console.log("User list updated:", data);
      const newList: string[] = [];
      data.users.forEach((c) => {
        if (c !== soc?.socketId) {
          newList.push(c);
        }
      });
      setActiveUsers(newList);
    };

    const handleRemoveUser = (data: RemoveUserData) => {
      console.log("User removed:", data.socketId);
      setActiveUsers((prev) => prev.filter((user) => user !== data.socketId));

      // If the removed user was the one we're calling, reset call
      if (data.socketId === selectedUser || data.socketId === calledId) {
        resetCall();
        setCalledId(null);
      }
    };

    const handleCallMade = async (data: CallMadeData) => {
      console.log("Call made received from:", data.socket, data.offer);

      // If already in a call and get another call
      if (getCalled || isAlreadyCalling) {
        const confirmed = window.confirm(
          `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
        );

        if (!confirmed) {
          soc.socketEmitListen("reject-call", {
            from: data.socket,
          });
          return;
        } else {
          // End current call before accepting new one
          endCall();
        }
      }

      // Create a new peer connection for incoming call
      const pc = createPeerConnection();

      try {
        console.log("Setting remote description for incoming call");
        // Set the remote description
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));

        console.log("Creating answer for incoming call");
        // Create an answer
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(new RTCSessionDescription(answer));

        console.log("Sending answer to caller", answer);
        // Send the answer
        soc.socketEmitListen("make-answer", {
          answer,
          to: data.socket,
        });

        setGetCalled(true);
        setCalledId(data.socket);
        setSelectedUser(data.socket);
      } catch (error) {
        console.error("Error handling incoming call:", error);
        resetCall();
      }
    };

    const handleAnswerMade = async (data: AnswerMadeData) => {
      console.log("Answer received from:", data.socket, data.answer);

      // Only process if we have an active peer connection
      if (
        peerConnectionRef.current &&
        peerConnectionRef.current.signalingState !== "closed"
      ) {
        try {
          console.log("Setting remote description for received answer");
          await peerConnectionRef.current.setRemoteDescription(
            new RTCSessionDescription(data.answer)
          );

          // If not already in a call, this is the first answer
          if (!isAlreadyCalling) {
            setIsAlreadyCalling(true);
            setCalledId(data.socket);
          }
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      } else {
        console.warn(
          "Cannot set remote description - connection is closed or null"
        );
      }
    };

    const handleCallRejected = (data: CallRejectedData) => {
      alert(`User: "Socket: ${data.socket}" rejected your call.`);
      resetCall();
    };

    const handleCallEnd = (data: CallEndData) => {
      alert(`Call ended by the other party`);
      resetCall();
      setCalledId(null);
    };

    const handleIceCandidate = async (data: { candidate: RTCIceCandidate }) => {
      try {
        await peerConnectionRef.current?.addIceCandidate(
          new RTCIceCandidate(data.candidate)
        );
      } catch (error) {
        console.error("Error adding received ICE candidate", error);
      }
    };

    // Refresh user list on init
    soc.socketEmitListen("refresh", {}, (list: string[]) => {
      const newList: string[] = [];
      list.forEach((c) => {
        if (c !== soc?.socketId) {
          newList.push(c);
        }
      });
      setActiveUsers(newList);
    });

    // Add event listeners
    soc.socketListenOn("update-user-list", handleUpdateUserList);
    soc.socketListenOn("ice-candidate", handleIceCandidate);
    soc.socketListenOn("remove-user", handleRemoveUser);
    soc.socketListenOn("call-made", handleCallMade);
    soc.socketListenOn("answer-made", handleAnswerMade);
    soc.socketListenOn("call-rejected", handleCallRejected);
    soc.socketListenOn("call-end", handleCallEnd);

    // Cleanup function
    return () => {
      // Remove event listeners - using the correct socketListenOff function
      soc.socketListenOff("update-user-list", handleUpdateUserList);
      soc.socketListenOff("ice-candidate", handleIceCandidate);
      soc.socketListenOff("remove-user", handleRemoveUser);
      soc.socketListenOff("call-made", handleCallMade);
      soc.socketListenOff("answer-made", handleAnswerMade);
      soc.socketListenOff("call-rejected", handleCallRejected);
      soc.socketListenOff("call-end", handleCallEnd);

      // End any ongoing call
      endCall();
    };
  }, [soc]);

  // Initialize media stream
  useEffect(() => {
    // Get user media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream: MediaStream) => {
        console.log("Local media stream obtained", stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        localStreamRef.current = stream;

        // Initialize peer connection after getting media
        createPeerConnection();
      })
      .catch((error: Error) => {
        console.warn("Media error:", error.message);
        alert("Failed to access camera and microphone: " + error.message);
      });

    return () => {
      // Clean up on component unmount
      endCall();

      // Stop all local media tracks
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const callUser = async (socketId: string): Promise<void> => {
    console.log("Initiating call to:", socketId);

    if (isAlreadyCalling || getCalled) {
      alert(
        "You are already in a call. End the current call before starting a new one."
      );
      return;
    }

    // Create a new connection for outgoing call
    const pc = createPeerConnection();

    try {
      // Create and set local description
      console.log("Creating offer for outgoing call");
      const offer = await pc.createOffer();
      console.log("Setting local description for outgoing call", offer);
      await pc.setLocalDescription(new RTCSessionDescription(offer));

      // Send the offer
      console.log("Sending offer to callee");
      soc?.socketEmitListen("call-user", {
        offer,
        to: socketId,
      });

      setSelectedUser(socketId);
    } catch (error) {
      console.error("Error making call:", error);
      resetCall();
    }
  };

  const handleUserSelect = (socketId: string): void => {
    callUser(socketId);
  };

  const endCall = (): void => {
    console.log("Ending call");

    // Close the peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Reset remote video
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Inform the other user the call has ended
    if ((calledId || selectedUser) && soc) {
      soc.socketEmitListen("end-call", {
        to: calledId || selectedUser,
      });
    }

    // Reset state variables
    resetCall();
    setCalledId(null);

    // Create a new peer connection for future calls
    setTimeout(() => {
      createPeerConnection();
    }, 500);
  };

  return (
    <>
      <div className="controls">
        {(isAlreadyCalling || getCalled) && (
          <button onClick={endCall} className="end-call-button">
            End Call
          </button>
        )}
        {selectedUser && (
          <div id="talking-with-info">
            {`Talking with: "Socket: ${selectedUser}"`}
          </div>
        )}
        <div className="connection-state">
          Connection state: {connectionState}
        </div>
      </div>

      <div className="max-w-full flex flex-col items-center">
        <div className="max-w-[400px] w-full">
          <div className="video-box">
            <h2>Local Video</h2>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-[400px] bg-slate-40"
            ></video>
          </div>
          <div className="video-box">
            <h2>Remote Video</h2>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="w-[400px] bg-slate-400"
            ></video>
          </div>
        </div>

        <div className="users-container">
          <h2>Active Users</h2>
          <div className="active-user-container">
            {activeUsers.map((socketId) => (
              <Button
                key={socketId}
                disabled={isAlreadyCalling || getCalled}
                className={`${selectedUser === socketId ? "bg-slate-500" : ""}`}
                onClick={() => handleUserSelect(socketId)}
              >
                <p className="username">Socket: {socketId}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WebRTCVideoChat;
