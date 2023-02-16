/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const VideoCall = ({ roomId }) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    // request user media
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        localVideoRef.current.srcObject = stream;

        // create peer connection
        const peerConnection = new RTCPeerConnection({
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });
        setPeerConnection(peerConnection);
        peerConnection.ontrack = (event) => {
          setRemoteStream(event.streams[0]);
        };
        peerConnection.addTrack(stream.getTracks()[0], stream);
        peerConnection.addTrack(stream.getTracks()[1], stream);

        // create STOMP client
        const socket = new SockJS("https://i8b307.p.ssafy.io:7777/ws/meeting");
        const stompClient = Stomp.over(socket);
        setStompClient(stompClient);
        stompClient.connect({}, () => {
          console.log("connect 성공");
          stompClient.subscribe(`/topic/${roomId}`, (message) => {
            const signalingMessage = JSON.parse(message.body);
            if (signalingMessage.type === "offer") {
              peerConnection.setRemoteDescription(signalingMessage.message);
              peerConnection.createAnswer().then((answer) => {
                peerConnection.setLocalDescription(answer);
                stompClient.send(
                  `/pub/answer/${roomId}`,
                  {},
                  JSON.stringify({
                    type: "answer",
                    roomId,
                    message: answer,
                  })
                );
              });
            } else if (signalingMessage.type === "answer") {
              peerConnection.setRemoteDescription(signalingMessage.message);
            } else if (signalingMessage.type === "candidate") {
              peerConnection.addIceCandidate(signalingMessage.message);
            }
          });

          // send offer signal
          peerConnection.createOffer().then((offer) => {
            peerConnection.setLocalDescription(offer);
            stompClient.send(
              `/pub/offer/${roomId}`,
              {},
              JSON.stringify({
                type: "offer",
                roomId,
                message: offer,
              })
            );
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [roomId]);

  useEffect(() => {
    if (remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div>
      <video ref={localVideoRef} autoPlay muted></video>
      <video ref={remoteVideoRef} autoPlay></video>
    </div>
  );
};

export default VideoCall;
