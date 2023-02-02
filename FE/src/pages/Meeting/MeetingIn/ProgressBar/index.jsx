import "./index.css";
import { useState } from "react";

function ProgressBar({ done }) {
  const [style, setStyle] = useState({});
  const a = `lightDivMoving 0.5s 0s linear forwards`;
  setTimeout(() => {
    const newStyle = { width: `${done}%`, animation: `${a}` };
    setStyle(newStyle);
  }, 2000);

  return (
    <div className="ProgressBar">
      <div className="pgb" style={style}>
        {done}%
      </div>
    </div>
  );
}

export default ProgressBar;
