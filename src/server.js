import express from "express";
import { createServer } from "https";
import { Server } from "socket.io";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());

const server = createServer(
  {
    ca: fs.readFileSync('/etc/letsencrypt/live/i8b307.p.ssafy.io/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/i8b307.p.ssafy.io/privkey.pem', "utf-8").toString(),
    cert: fs.readFileSync('/etc/letsencrypt/live/i8b307.p.ssafy.io/cert.pem', "utf-8").toString(),
  },
  app
);

const io = new Server(server, { 
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);
  socket.on("join_room", async (roomName) => {
    console.log("브라우저에서 받은 roomName : ", roomName);
    socket.join(roomName); // 방에 들어가는거
    socket.to(roomName).emit("welcome", rooms);
    socket.to(roomName).emit("roomsCheck", rooms);
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
  socket.on("leave-room", (roomName, done) => {
    socket.to(roomName).emit("peer-leaving");
    socket.leave(roomName);
    done();
  });
  socket.on("disconnecting", () => {
    socket.rooms.forEach((room) => {
      socket.to(room).emit("peer-leaving");
      socket.leave(room);
    });
  });
});

server.listen(`${process.env.REACT_APP_NODE}`, () => {
  console.log("Server started");
});
