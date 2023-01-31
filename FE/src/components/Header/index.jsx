// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./index.css";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="CommNavDiv">
      <span className="CommNavLogo">Blur:-)</span>
      <div className="CommNavBtnsDiv">
        <span className="CommNavBtnChat">Chat</span>
        <span className="CommNavBtnAbout">About</span>
        <Link to="/MyInfo">
          <span className="CommNavBtnMyInfo">MyInfo</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
