import { WebSocketServer } from "ws";

export const initWebSocket = (server) => {
  const wss = new WebSocketServer({ 
    server,
    path: "/ws",
  });

  wss.on("connection", (ws, req) => {
    const clientIp = req.socket.remoteAddress;
    console.log(`🔌 WebSocket client connected from ${clientIp}`);

    // Send welcome message
    ws.send(JSON.stringify({ 
      type: "welcome", 
      message: "Connected to WebSocket server" 
    }));

    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message.toString());
        console.log("📨 Received:", data);

        // Echo back
        ws.send(JSON.stringify({ 
          type: "echo", 
          data,
          timestamp: new Date().toISOString() 
        }));
      } catch (error) {
        ws.send(JSON.stringify({ 
          type: "error", 
          message: "Invalid JSON format" 
        }));
      }
    });

    ws.on("close", () => {
      console.log(`🔌 WebSocket client disconnected from ${clientIp}`);
    });

    ws.on("error", (error) => {
      console.error("❌ WebSocket error:", error);
    });
  });

  return wss;
};

