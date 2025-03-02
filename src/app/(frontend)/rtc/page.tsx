import WebRTCVideoChat from "@/components/webRTC/WebRTCVideoChat";

export default function WebRTC() {
  return (
    <>
      <h3>Web RTC Example</h3>
      <p>This is done using a local deployed STUN/TURN Server</p>
      <WebRTCVideoChat />
    </>
  );
}
