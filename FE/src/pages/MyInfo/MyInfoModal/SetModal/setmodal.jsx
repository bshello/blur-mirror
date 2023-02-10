import { useState, useEffect } from "react";
import "../../MyInfoModal/myInfoModal.css";
import "./setmodal.css";
import Slider from "react-input-slider";
import styled from "styled-components";

function SetModal() {
  // 성별 바꾸기
  const [gender, setGender] = useState(true);
  const handleClick = () => setGender((setGender) => !setGender);

  //range
  const [fromrange, setfromrange] = useState({ x: 0 });
  const [agerange, setagerange] = useState({ x: 0 });
  const [mySoundVal, setMySoundVal] = useState(50);
  const onChangeMySoundSlider = () => {
    const slider = document.querySelector(".slider");
    const progress = document.querySelector(".progressSlider");
    setMySoundVal(slider.value);
    const val = slider.value + "%";
    progress.style.width = val;
  };

  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
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
            {fromrange.x} km
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv" />
              {/* <Slider
                className="rangelocation"
                axis="x"
                xmax="50"
                x={fromrange.x}
                onChange={({ x }) => setfromrange((state) => ({ ...state, x }))}
              /> */}
              <div className="range-slider">
                <input
                  type="range"
                  className="slider"
                  min="0"
                  max="100"
                  onChange={onChangeMySoundSlider}
                ></input>
                <div className="progressSlider"></div>
              </div>
            </div>
          </div>

          <div className="ModalInputBox3">
            <span className="SetMidPartnerLable">Partner's age group</span>
            {agerange.x} 살
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv"></div>
              <div className="range-slider">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  className="slider"
                  onChange={handleChange}
                />
                <div
                  className="progressSlider"
                  style={{ width: `${value}%` }}
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
