import { useEffect } from "react";
import "./index.css";

function ProgressBar() {
  let currentVal = false;
  // const user = useSelector((state) => state.mt.togg); // Redux에 저장되어있는 MToggle

  const start = () => {
    const processBar = document.querySelector(".ProgressBar");
    const currentProcessBar = document.createElement("div");
    currentProcessBar.className = "currentProcessBar";
    const msgCurrentTime = document.createElement("span");
    msgCurrentTime.className = "msgCurrentTime";
    processBar.appendChild(currentProcessBar);
    currentProcessBar.appendChild(msgCurrentTime);

    if (!currentVal) {
      currentVal = true;

      let width = 3;
      let timer = setInterval(frame, 1000);

      function frame() {
        // 50분(600)이 다채워졌을 경우, 채팅창에 리스트 추가(시간은 계속감)
        let minute = parseInt(width / 60);
        let second = width % 60;
        if (width > 600) {
          currentProcessBar.innerHTML = `${minute}분 0초`;
          clearInterval(timer);

          alert("김블리님이 채팅목록에 추가 되었습니다:)");
        } else {
          if (width > 20) currentProcessBar.innerHTML = `${minute}분 ${second}초`;

          width++;
          currentProcessBar.style.width = (width / 600) * 100 + "%";
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      start();
    }, 3000);
  }, []);

  return <div className="ProgressBar">{/* <Timer /> */}</div>;
}

export default ProgressBar;
