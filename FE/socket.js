import express from "express"; // express를 사용한 일반적인 NodeJS
import http from "http";
import { Server } from "socket.io";
import path from "path";
const __dirname = path.resolve();

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");
// 유저에게 공개해주는 코드
// 유저는 /public로 이동할 때 public 폴더 내용을 볼 수 있음
app.use("/public", express.static(__dirname + "/src/public"));
// 홈페이지로 이동 시 사용될 템플릿을 렌더링해주는 역할
// url 선언하고/ (유저가 url로 가면, req와 res를 받고 response를 보냄)
app.get("/", (_, res) => res.render("home"));

// express를 이용해 http 서버를 만듦(노출 서버)
const httpServer = http.createServer(app);

// // http 서버 위에 ws(webSocket) 서버를 만듦
// const wss = new WebSocketServer({ httpServer });
// SocketIO 프레임워크 사용하기
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("join_room", (roomName) => {
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
});

const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
