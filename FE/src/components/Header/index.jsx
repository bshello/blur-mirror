// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";

function Header() {
  return (
    <div className="CommNavDiv">
      <span className="CommNavLogo">Blur:-)</span>
      <div className="CommNavBtnsDiv">
        <span className="CommNavBtnChat">Chat</span>
        <span className="CommNavBtnAbout">About</span>
        <span className="CommNavBtnMyInfo">MyInfo</span>
      </div>
    </div>
  );
}

export default Header;
