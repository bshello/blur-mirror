import "../../../App.css";
import "./myInfoModal.css";
import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { changeNickName } from "../../../store";
// import Select from "react-select";
// import "./MyInfo/index";

function MyInfoModal() {
  const [settingModal, setsettingModal] = useState(false);

  // const [profileModal, setProfileModal] = useState(false);

  // const dispatch = useDispatch();

  // const [nickName, setnickName] = useState("");
  // const state = useSelector((state) => state);
  // const [nickName, setnickName] = useSelector((state) => {
  //   return state.nickName;
  // });
  // const nickNameHansdler = () => {
  //   setnickName(e.target.value);
  // };

  function SetModal() {
    return (
      <div className="SettingModal">
        <div className="SetModal">
          <span className="SEtLabel">Setting</span>
          <div className="SEtMidModalChangediv">
            <div className="ModalInputBox">
              <span className="SetMidPartnerLable">Partner Gender</span>
              <div className="SetMMPartnerCheckdiv">
                <span className="SetMMPartnerCheck">Male</span>
              </div>
            </div>

            <div className="ModalInputBox2">
              <span className="SetMidPartnerLable">Distance from partner</span>
              <div className="SetMMPartnerCheckdiv">
                <input type="range" className="distancePartner"></input>
              </div>
            </div>

            <div className="ModalInputBox3">
              <span className="SetMidPartnerLable">Partner's age group</span>
              <div className="SetMMPartnerCheckdiv">
                <input type="range" className="SetMMPartnerCheck"></input>
              </div>
            </div>
          </div>
        </div>
        <button
          className="ModalOut"
          // onMouseDown={() => {
          //   if (setMyInfoModal === true) {
          //     showMyinfoModal(false);
          //   }
          // }}
        >
          <span className="ModalOutText">confirm</span>
        </button>
      </div>
    );
  }
  return (
    <div className="Modal">
      <div className="leftModal">
        <div className="leftModalImg"></div>
        <div className="leftModalNameDiv">
          <span className="leftModalName"> welcome 김블리 </span>
        </div>
        <div className="leftModalbtnDiv">
          <button
            className="leftModalEditbtn"
            onClick={() => {
              setsettingModal(false);
            }}
          >
            <spna className="leftModalProText"> Profile Edit</spna>
          </button>
          <button
            className="leftModalSetbtn"
            onClick={() => {
              setsettingModal(true);
            }}
          >
            <spna className="leftModalSetText"> Setting</spna>
          </button>
        </div>
      </div>

      <div className="ProfileModal">
        <span className="PMLabel">Profile Edit</span>
        <div className="PMIdDiv">
          <span className="PMIdLable">NickName</span>
          <input
            type="text"
            // required
            // value={nickName}
            // onChange={(e) => setnickName(e.target.value)}
            className="PMIdInput"
          ></input>
        </div>
        <div className="PMAge">
          <span className="PMAgeLabel">Age</span>
          {/* <Select className="PMAgeSelect"></Select> */}
        </div>
        <div className="PMMBTI">
          <span className="PMMBTILabel">MBTI</span>
          <select className="PMMBTISelect"></select>
        </div>
        <div className="PMMEmail">
          <span className="PMMEmailLabel">E-mail</span>
          <input className="PMMEmailInput"></input>
        </div>

        <div className="PMMGender">
          <span className="PMMGenderLable">Gender</span>
          <div className="PMMGenderdiv">
            <div className="PMMGenderMale">Male</div>
            <div className="PMMGenderFemale">Felmale</div>
          </div>
          <div className="PMIntroducing">
            <span className="PMIntroducingLabel">Introducing</span>
            <input className="PMIntroducingInput"></input>
          </div>
        </div>
      </div>
      <button
        className="ModalOut"
        // onMouseDown={() => {
        //   if (setMyInfoModal === true) {
        //     showMyinfoModal(false);
        //   }
        // }}
      >
        <span className="ModalOutText">confirm</span>
      </button>
      {settingModal == true ? <SetModal style></SetModal> : null}
      {/* {profileModal == true ? <setProfileModal style></setProfileModal> : null} */}
    </div>
  );
}

export default MyInfoModal;
