import "../../App.css";
import "./index.css";
import React, { useState } from "react";

function MyInfo() {
  const [modal, setModal] = useState(false);
  const [settingModal, setsettingModal] = useState(false);

  function Modal() {
    return (
      <div className="Modal">
        <div className="leftModal">
          <div className="leftModalImg"></div>
          <div className="leftModalNameDiv">
            <span className="leftModalName"> welcome 김블리 </span>
          </div>
          <div className="LMbtnDiv">
            <div
              className="lmProfileEditbtn"
              onClick={() => {
                setsettingModal(false);
              }}
            >
              <spna className="lmProfileEditText"> Profile Edit</spna>
            </div>
            <div
              className="lmSetiingbtn"
              onClick={() => {
                setsettingModal(true);
              }}
            >
              <spna className="lmProfileEditText"> Setting</spna>
            </div>
          </div>
        </div>

        <div className="MiddleModal">
          <span className="MideModalProfileEdit">Profile Edit</span>
          <div className="MiddleDivId">
            <span className="MidIdLabel">ID</span>
            <div className="inputtext"></div>
          </div>
          <div className="MiddleDivAGE">
            <span className="MidIdLabel">Age</span>
            <div className="MidIdInputDiv"></div>
          </div>
          <div className="MiddleDivMBTI">
            <span className="MidIdLabel">MBTI</span>
            <div className="MidIdInputDiv"></div>
          </div>
          <div className="MiddleDivEmail">
            <span className="MidIdLabel">E-mail</span>
            <div className="MidIdInputDiv"></div>
          </div>
        </div>

        <div className="RightModal">
          <div className="RMGender">
            <span className="RMGenderLabel"> Gender</span>
            <div className="RmGenderCheck">
              <div className="RmGenderMale">Male</div>
              <div className="RmGenderFemale">Felmale</div>
            </div>
            <div className="RMIntroducing">
              <span className="RMItroLabel">Introducing</span>
              <div className="RMItrInput"></div>
            </div>
          </div>
        </div>

        <span className="ModalOut">
          <span
            className="ModalOutText"
            onClick={() => {
              setModal(false);
              setsettingModal(false);
            }}
          >
            confirm
          </span>
        </span>
      </div>
    );
  }

  function SettingModal() {
    return (
      <div className="Modal">
        <div className="leftModal">
          <div className="leftModalImg"></div>
          <div className="leftModalNameDiv">
            <span className="leftModalName"> welcome 김블리 </span>
          </div>
          <div className="LMbtnDiv">
            <div
              className="lmProfileEditbtn"
              onClick={() => {
                setsettingModal(false);
              }}
            >
              <spna className="lmProfileEditText"> Profile Edit</spna>
            </div>
            <div
              className="lmSetiingbtn"
              onClick={() => {
                setsettingModal(true);
              }}
            >
              <spna className="lmProfileEditText"> Setting</spna>
            </div>
          </div>
        </div>

        <div className="SetMiddleModal">
          <span className="SEtMidLabel">Setting</span>
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
              </div>
                <span className="SetMMPartnerCheck"></span>
            </div>

            <div className="ModalInputBox3">
              <span className="SetMidPartnerLable">Partner's age group</span>
              <div className="SetMMPartnerCheckdiv">
                <span className="SetMMPartnerCheck"></span>
              </div>
            </div>
          </div>
        </div>
        <span className="ModalOut">
          <span
            className="ModalOutText"
            onClick={() => {
              setModal(false);
              setsettingModal(false);
            }}
          >
            confirm
          </span>
        </span>
      </div>
    );
  }

  return (
    <div>
      <span className="MIProfilebackbtn">out</span>
      <div className="MIProfileImgDiv">
        <div className="MIProfilefictureSet">
          <div className="MIProfileEditProfileAdd"></div>
          <span className="MIProfileEditProfileText">사진 설정</span>
        </div>
      </div>

      <span className="MIProfileHashTag">Hash Tag</span>

      <div className="MIProfileSetting">
        <div className="MIProfileSettingIcon">
          <div className="MiProfileSettingback"></div>
          <span className="MIProfileSettingText">설정하기</span>
        </div>
      </div>

      <div className="MIProfileNameAge">
        <span className="MIProfileName">김블리</span>
        <span className="MIProfileAge">26</span>
      </div>

      <span
        className="MIProfileEditProfile"
        onClick={() => {
          setModal(true);
        }}
      >
        profile edit ->
      </span>
      <div className="MIProfileIntroducing">
        <span className="MIProfileIntroducingTitle">Introducing</span>
        <span className="MIProfileIntroducingText">안녕하세요. 스물 여섯 김블리입니다!</span>
      </div>
      <span className="MIProfileLogo">Blur:)</span>

      {modal == true ? <Modal style></Modal> : null}
      {settingModal == true ? <SettingModal style></SettingModal> : null}
    </div>
  );
}

export default MyInfo;
