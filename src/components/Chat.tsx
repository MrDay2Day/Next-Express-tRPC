/* eslint-disable @typescript-eslint/no-explicit-any */
// components/WebSocketClient.tsx
"use client";

import { useEffect, useState } from "react";

export default function WebSocketClient() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    // Create WebSocket connection
    const ws = new WebSocket(
      `${window.location.protocol === "https:" ? "wss:" : "ws:"}//${
        window.location.host
      }/api/socket`
    );

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data]);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    // Cleanup on unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && inputMessage) {
      socket.send(JSON.stringify({ message: inputMessage }));
      setInputMessage("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>

      <div className="border p-4 h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="text-gray-500 text-sm">{msg.timestamp}</span>
            <p>{JSON.stringify(msg.data)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
