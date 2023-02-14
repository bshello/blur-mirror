import express from "express"; // express를 사용한 일반적인 NodeJS
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

// express를 이용해 http 서버를 만듦(노출 서버)
const httpServer = http.createServer(app);

// // http 서버 위에 ws(webSocket) 서버를 만듦
const wsServer = new Server(httpServer, {
  cors: {
    origin: "https://i8b307.p.ssafy.io/",
    methods: ["GET", "POST"],
  },
});

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
    console.log("브라우저에서 받은 roomName : ", roomName);
    socket.join(roomName);
    socket.to(roomName).emit("welcome");
  });
  socket.on("offer", (offer, roomName) => {
    socket.to(roomName).emit("offer", offer);
  });
  socket.on("answer", (answer, roomName) => {
    socket.to(roomName).emit("answer", answer);
  });
  socket.on("ice", (ice, roomName) => {
    socket.to(roomName).emit("ice", ice);
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      // Notify other peer that current user is leaving
      socket.to(room).emit("peer-leaving");
      // Leave the room
      socket.leave(room);
    });
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
