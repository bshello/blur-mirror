import "./index.css";
import { useEffect } from "react";
function Timer() {
  useEffect(() => {
    let timer = 0;
    let min = "";
    let sec = "";
    let timeCheckFunc = setInterval(function () {
      min = parseInt(timer / 60);
      sec = timer % 60;

      document.querySelector(".MTimer").innerHTML = `${min}분 ${sec}초`;
      timer++;

      if (timer > 60 * 17) {
        clearInterval(timeCheckFunc);
      }
    }, 1000);
  }, []);

  return (
    <div className="Timer">
      <div className="MTimer">0분 0초</div>
    </div>
  );
}

export default Timer;
