import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const chatDto = {
      channelId: 1,
      writerId: 1,
      chat: "Hello, world!",
    };
    socket.send("/pub/chat", {}, JSON.stringify(chatDto));
  };

  useEffect(() => {
    const socket = new SockJS("http://172.30.1.45:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      setSocket(stompClient);
      stompClient.subscribe("/sub/chat/1", (message) => {
        setMessages([...messages, JSON.parse(message.body)]);
      });
    });
  }, [messages]);

  return (
    <div>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <span>{message.writerId}: </span>
            <span>{message.chat}</span>
          </li>
        ))}
      </ul>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
