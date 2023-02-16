import "./NotFound.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Link to="/home">
        <div className="NotFoundbox">
          <div className="squish-unsquish"></div>
        </div>
      </Link>
      ;<span className="NotFoundText"> 404 NOT FOUND &gt; &lt; </span>
    </div>
  );
}

export default NotFound;
