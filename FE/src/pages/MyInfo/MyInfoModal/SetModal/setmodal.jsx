import { useState, useEffect } from "react";
import "../../MyInfoModal/myInfoModal.css";
import "./setmodal.css";
import Slider from "react-input-slider";
import styled from "styled-components";

function SetModal({ SetRange }) {
  // 성별 바꾸기
  const [gender, setGender] = useState(true);
  const handleClick = () => setGender((setGender) => !setGender);

  //range
  const [fromrange, setfromrange] = useState({ x: 0 });
  const [agerange, setagerange] = useState({ x: 0 });

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
                {gender ? <p>Male</p> : <p>FeMale</p>}
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
              <Slider className="rangelocation" axis="x" xmax="50" x={fromrange.x} onChange={({ x }) => setfromrange((state) => ({ ...state, x }))} />
            </div>
          </div>

          <div className="ModalInputBox3">
            <span className="SetMidPartnerLable">Partner's age group</span>
            {agerange.x} 살
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv"></div>
              <Slider className="rangelocation" axis="x" x={agerange.x} xmax="10" onChange={({ x }) => setagerange((state) => ({ ...state, x }))} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetModal;
