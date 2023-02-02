import "../../../App.css";
import "./myInfoModal.css";

import React, { useState, useRef, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../../reducer/userEdit";
import store from "../../../store";
import userEdit from "../../../reducer/userEdit";
import { edit } from "../../../reducer/userEdit";
import SetModal from "./SetModal/setmodal";
import styled from "styled-components";
// import Avatar from "react-avatar";
// import "../index";

// 리덕스 툴킷 실습
// function reducer(state, action){
//   if(action.type === 'edit') {
//     return (...state, value: state.value + action)
//   }
// }

function MyInfoModal({ showMyinfoModal }) {
  //setmodal
  const [setModal, setSettingmodal] = useState(false);
  const showSettingModal = () => {
    setSettingmodal((pre) => !pre);
  };

  //profile 변경
  const [input, setInput] = useState("");

  // nicName
  const [nickName, setNickName] = useState("");
  // const [nickedit, setNickEdit] = useState(false);
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // state 변경 핸들러
  const handleUpload = () => {
    setNickName(() => {
      return input;
    });
  };

  // 엔터 누르는 거 onKeyPress 랑 써야됨
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpload(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  // const [name, dispatch] = useReducer(reducer, "");

  //emil
  const [email, setEmail] = useState("");
  const [emailedit, setEmailEdit] = useState(false);

  //introducing
  const [introducing, setIntroducing] = useState("");

  ////////////////////////////////////////////////////////////////////////////////////////////////
  // 이미지 업로드
  //   <form>
  //   <label className="signup-profileImg-label" htmlFor="profileImg">프로필 이미지 추가</label>
  //   <input
  //   className="signup-profileImg-input"
  //   type="file"
  //   accept="image/*"
  //   id="profileImg"
  //   />
  // </form>
  ////////////////////////////////////////////////////////////////////////////////////////////////

  // 이미지 미리보기
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  // localStorage.setItem("data", JSON.stringify(imgRef));

  // 성별
  const gender = ["Male", "FeMale"];
  const [genderCheck, setgenderCheck] = useState("check");

  // 데이터 가져오는 거

  //nicName
  // let nicNamecontent = (
  //   <div>
  //     <button onClick={() => setNickEdit(true)}>수정</button>
  //   </div>
  // );

  // if (nickedit) {
  //   nicNamecontent = (
  //     <div>
  //       <input
  //         className="PMIdInput"
  //         type="text"
  //         value={nickName}
  //         onChange={(e) => {
  //           setNickName(e.target.value);
  //         }}
  //         onKeyPress={handleOnKeyPress}
  //       />
  //       <button onClick={() => setNickEdit(false)}>수정완료</button>
  //     </div>
  //   );
  // }

  // //e-mail
  // let emailContent = (
  //   <div>
  //     <button onClick={() => setEmailEdit(true)}>수정</button>
  //   </div>
  // );

  // if (emailedit) {
  //   emailContent = (
  //     <div>
  //       <input
  //         className="PMIdInput"
  //         type="text"
  //         value={email}
  //         onChange={(e) => {
  //           setEmail(e.target.value);
  //         }}
  //         onKeyPress={handleOnKeyPress}
  //       />
  //       <button onClick={() => setEmailEdit(false)}>수정완료</button>
  //     </div>
  //   );
  // }

  const age = (19, 70);

  // const ages = new Array(50).fill({ age });

  const ages = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];

  // 데이터 가져오는 거
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.user.value;
  });

  return (
    <div className="Modal">
      {setModal ? <SetModal showSettingModal={showSettingModal} /> : null}
      <div className="leftModal">
        <div className="imgbox">
          {/* <form>
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>

          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
        </form> */}

          {/* 업로드 된 이미지 미리보기 */}
          <label className="imageEditBtn" htmlFor="profileImg">
            변경
          </label>
          <img
            className="leftModalImg"
            src={
              imgFile
                ? imgFile
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
            }
            alt="사진"
          />
          {/* 이미지 업로드 input */}
          <input
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
            style={{ display: "none" }}
          ></input>
        </div>
        <div>
          <button
            onClick={() => {
              const a = document.querySelector(".PMIdInput").value;
              console.log(a);
              dispatch(edit(a));
            }}
          >
            +
          </button>
        </div>
        <span className="leftModalName"> {user} </span>
        <div className="leftModalNameDiv">
          <span className="leftModalName"> welcome {nickName} </span>
        </div>
        <div className="leftModalbtnDiv">
          <button
            className="leftModalEditbtn"
            onClick={() => {
              setSettingmodal(false);
            }}
          >
            <span className="leftModalProText"> Profile Edit</span>
          </button>
          <button className="leftModalSetbtn" onClick={showSettingModal}>
            <span className="leftModalSetText"> Setting</span>
          </button>
        </div>
      </div>
      <div className="ProfileModal">
        <span className="PMLabel">Profile Edit</span>
        <div className="PMIdDiv">
          {/* <span className="PMIdLable">NickName {nicNamecontent}</span> */}
          <span className="PMIdLable">NickName </span>
          <input
            type="text"
            className="PMIdInput"
            value={input}
            // onChange={(event) => {
            //   setNickName(event.target.value);
            // }}
            // onChange={user}
            onChange={handleInputChange}
            onKeyPress={handleOnKeyPress}
          />
          {/* <button
            onClick={() => {
              handleUpload();
            }}
          >
            버튼
          </button> */}
          {/* <button
            onClick={() => {
              dispatch(edit);
              handleUpload()
            }}
          >
            저장
          </button> */}
        </div>
        <div className="PMAge">
          <span className="PMAgeLabel">Age</span>
          <select className="PMAgeSelect">
            <option> {ages[0]}</option>;<option> {ages[1]}</option>;
            <option> {ages[2]}</option>;<option> {ages[3]}</option>;
            <option> {ages[4]}</option>;<option> {ages[5]}</option>;
            <option> {ages[6]}</option>;<option> {ages[7]}</option>;
            <option> {ages[8]}</option>;<option> {ages[9]}</option>;
            <option> {ages[10]}</option>;<option> {ages[11]}</option>;
            <option> {ages[12]}</option>;<option> {ages[13]}</option>;
            <option> {ages[14]}</option>;<option> {ages[15]}</option>;
          </select>
        </div>
        <div className="PMMBTI">
          <span className="PMMBTILabel">MBTI</span>
          <select className="PMMBTISelect">
            <option> INTJ</option>
            <option> INTP </option>
            <option> ENTJ </option>
            <option> ENTP</option>

            <option> INFJ </option>
            <option> INFP </option>
            <option> ENFJ </option>
            <option> ENFP </option>

            <option> ISTJ</option>
            <option> ISFJ</option>
            <option> ESTJ</option>
            <option> ESFJ </option>

            <option> ISTP</option>
            <option> ISFP </option>
            <option> ESTP </option>
            <option> ESFP </option>
          </select>
        </div>
        <div className="PMMEmail">
          <span className="PMMEmailLabel">E-mail </span>
          {/* <div className="PMMEmailInput">
            <div className="PMMEmailInput">{email}</div>
          </div> */}
          <input
            type="text"
            className="PMMEmailInput"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="PMMGender">
          <span className="PMMGenderLable">Gender</span>
          <div className="PMMGenderdiv">
            <button
              className={`btn ${genderCheck === "check" ? "active" : ""}`} // tab 값이 'curr' 이면 active 클래스를 추가
              onClick={() => setgenderCheck("check")}
            >
              {gender[0]}
            </button>
            <button
              className={`-btn ${genderCheck === "prev" ? "active" : ""}`} // tab 값이 'prev' 이면 active 클래스를 추가
              onClick={() => setgenderCheck("prev")} // 클릭했을 때 tab 값이 'prev'로 변경된다.
            >
              {gender[1]}
            </button>
          </div>
          <div className="PMIntroducing">
            <span className="PMIntroducingLabel">Introducing</span>
            {/* <input type="text" className="PMIntroducingInput"></input> */}
            <input
              type="text"
              className="PMIntroducingInput"
              value={introducing}
              onChange={(event) => {
                setIntroducing(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <button className="ModalOut" onClick={showMyinfoModal}>
        {/* <button className="ModalOut" onClick={UserEdit}> */}
        <span className="ModalOutText">confirm</span>
        {/* 이미지 업로드 input 추가하기
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onClick={saveImgFile}
          ref={imgRef}
        /> */}
      </button>
    </div>
  );
}

export default MyInfoModal;
// ReactDOM.render(<ExampleSlider />, document.getElementById("root"));
