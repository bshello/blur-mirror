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
    const dis = slider.value + "%";
    progress.style.width = dis;
  };

  const [leftSliderValue, setLeftSliderValue] = useState(18);
  const [rightSliderValue, setRightSliderValue] = useState(40);

  const handleLeftSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= rightSliderValue) {
      setRightSliderValue(newValue);
    }
    setLeftSliderValue(newValue);
  };

  const handleRightSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue <= leftSliderValue) {
      setLeftSliderValue(newValue);
    }
    setRightSliderValue(newValue);
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

              <input type="range" className="range-slider1 range-slider1-left" value={leftSliderValue} onChange={handleLeftSliderChange} style={{ pointerEvents: "none" }} min={18} max={40} />
              <input type="range" className="range-slider1 range-slider1-right" value={rightSliderValue} onChange={handleRightSliderChange} style={{ pointerEvents: "none" }} min={18} max={40} />
              <div
                className="range-bar"
                style={{
                  left: `${leftSliderValue}%`,
                  width: `${rightSliderValue - leftSliderValue}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetModal;
