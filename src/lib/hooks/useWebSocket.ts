import { useEffect, useRef, useState, useCallback } from "react";

export const useWebSocket = () => {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const connectWebSocket = useCallback(() => {
    // Use relative URL for same-origin WebSocket connection
    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/api/ws`;

    console.log({ wsUrl });

    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
      // Attempt to reconnect after 3 seconds
      setTimeout(connectWebSocket, 3000);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      socket.close();
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    connectWebSocket();
    return () => {
      ws.current?.close();
    };
  }, [connectWebSocket]);

  const sendMessage = useCallback((message: string) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  return { isConnected, messages, sendMessage };
};
