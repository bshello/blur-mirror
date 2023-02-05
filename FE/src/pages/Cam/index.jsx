import "./index.css";

function Cam() {
  return (
    <div id="main1">
      <div id="welcome">
        <input type="text" placeholder="room name" required />
        <button>Enter Room</button>
      </div>
      <div id="call">
        <div id="myStream">
          <video id="myFace" autoplay playsinline></video>
          <button id="mute">Muted</button>
          <button id="camera">Camera OFF</button>
          <select name="" id="cameras"></select>
        </div>
        <video id="peerFace" autoplay playsinline></video>
        <button>Enter Room</button>
      </div>
    </div>
  );
}

export default Cam;
