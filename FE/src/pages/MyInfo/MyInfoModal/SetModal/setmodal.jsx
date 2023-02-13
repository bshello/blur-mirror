import { useState } from "react";
import "../../MyInfoModal/myInfoModal.css";
import "./setmodal.css";

function SetModal() {
  // 성별 바꾸기
  const [gender, setGender] = useState(true);
  const handleClick = () => setGender((setGender) => !setGender);

  // //range

  const [distance, setDistance] = useState();
  const changeDistance = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setDistance(slider.value);
    const dis = slider.value * 2 + "%";
    progress.style.width = dis;
  };

  /// 양방향
  const [leftSliderValue, setLeftSliderValue] = useState(20);
  const [rightSliderValue, setRightSliderValue] = useState(50);

  const handleLeftSliderChange = (event) => {
    const newLeftSliderValue = event.target.value;
    if (newLeftSliderValue <= rightSliderValue) {
      setLeftSliderValue(newLeftSliderValue);
    }
  };

  const handleRightSliderChange = (event) => {
    const newRightSliderValue = event.target.value;
    if (newRightSliderValue >= leftSliderValue) {
      setRightSliderValue(newRightSliderValue);
    }
  };
  return (
    <div className="SettingModal">
      <div></div>
      <div className="SetModal">
        <span className="SEtLabel">Setting</span>
        <div className="SEtMidModalChangediv">
          <div className="ModalInputBox">
            <span className="SetMidPartnerLable">Partner Gender</span>
            <div className="SetMMPartnerCheckdiv">
              <div className="SetMMPartnerChekdiv">
                <div className="arrow" onClick={handleClick}></div>
                {gender ? <p>FeMale</p> : <p>Male</p>}
                {gender}
              </div>

              <div className="blurdiv"></div>
            </div>
          </div>

          <div className="ModalInputBox2">
            <span className="SetMidPartnerLable">Distance from partner</span>
            {distance} km
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv" />

              <div className="range-slider">
                <input type="range" className="slider" min="0" max="50" onChange={changeDistance}></input>
                <div className="progressSlider"></div>
              </div>
            </div>
          </div>

          <div className="ModalInputBox3">
            <span className="SetMidPartnerLable">Partner's age group</span>
            {leftSliderValue}살 ~ {rightSliderValue}살
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv"></div>

              <div className="range-slider">
                <input
                  className="range-slider1 range-slider1-left"
                  type="range"
                  min="20"
                  max="50"
                  style={{ pointerEvents: "none" }}
                  value={leftSliderValue}
                  onChange={handleLeftSliderChange}
                />
                <input
                  className="range-slider1 range-slider1-right"
                  type="range"
                  min="20"
                  max="50"
                  style={{ pointerEvents: "none" }}
                  value={rightSliderValue}
                  onChange={handleRightSliderChange}
                />
                <div
                  className="range-bar"
                  style={{
                    left: `${leftSliderValue / 20}% `,
                    width: `${rightSliderValue * 2 - leftSliderValue}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetModal;
