import "../../../App.css";
import "./myInfoModal.css";

import React, { useState, useRef, useEffect } from "react";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeName } from "../../../reducer/userEdit";
import "../../../reducer/userEdit";
import SetModal from "./SetModal/setmodal";
// import "../index";

function MyInfoModal({ showMyinfoModal }) {
  //setmodal
  const [setModal, setSettingmodal] = useState(false);
  const showSettingModal = () => {
    setSettingmodal((pre) => !pre);
  };

  //profile 변경
  const [nickName, setNickName] = useState("");
  const [nickedit, setNickEdit] = useState(false);
  const [email, setEmail] = useState("");
  const [emailedit, setEmailEdit] = useState(false);

  const [introducing, setIntroducing] = useState("");

  // const user = useSelector((state) => state.member);
  // const { memberId, memberRepIcon, memberNickname } = member;

  // useEffect(() => {
  //   if (memberNickname && memberRepIcon) {
  //     setNickName(memberNickname);
  //   }
  // }, [member]);

  // 이미지 업로드

  // const [Image, setImage] = useState(
  //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  // );
  // const fileInput = useRef(null);

  // const onChange = (e) => {
  //   if (e.target.files[0]) {
  //     setFile(e.target.files[0]);
  //   } else {
  //     //업로드 취소할 시
  //     setImage(
  //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  //     );
  //     return;
  //   }
  //   //화면에 프로필 사진 표시
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //     }
  //   };
  //   reader.readAsDataURL(e.target.files[0]);
  // };

  // 성별
  const gender = ["Male", "FeMale"];
  const [genderCheck, setgenderCheck] = useState("check");

  // 데이터 가져오는 거
  const dispatch = useDispatch({});
  const { user } = useSelector((state) => state.userEdit);
  // console.log(user);

  const change = () => {
    // store에 있는 state 바꾸는 함수 실행
    dispatch(changeName());
  };

  // 가져온 데이터 값 변경
  const UserEdit = () => {
    return (
      <div>
        {user}
        <button onChange={user}></button>
      </div>
    );
  };

  // 엔터 누르는거
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      setNickEdit(true); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  //nicName
  let nicNamecontent = (
    <div>
      <button onClick={() => setNickEdit(true)}>수정</button>
    </div>
  );

  if (nickedit) {
    nicNamecontent = (
      <div>
        <input
          className="PMIdInput"
          type="text"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
          onKeyPress={handleOnKeyPress}
        />
        <button onClick={() => setNickEdit(false)}>수정완료</button>
      </div>
    );
  }

  //e-mail
  let emailContent = (
    <div>
      <button onClick={() => setEmailEdit(true)}>수정</button>
    </div>
  );

  if (emailedit) {
    emailContent = (
      <div>
        <input
          className="PMIdInput"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onKeyPress={handleOnKeyPress}
        />
        <button onClick={() => setEmailEdit(false)}>수정완료</button>
      </div>
    );
  }

  const age = (19, 70);

  const ages = new Array(50).fill({ age });

  return (
    <div className="Modal">
      {setModal ? <SetModal showSettingModal={showSettingModal} /> : null}
      <div className="leftModal">
        {/* <input
          className="leftModalImg"
          type="file"
          // style={{ display: "none" }}
          id="file"
          accept="image/*"
          // onChange={onChange}
          // ref={fileInput}
        ></input> */}
        {/* <input
          type="file"
          style={{ display: "none" }}
          accept="image/jpg,impge/png,image/jpeg"
          name="profile_img"
          onChange={onChange}
          ref={fileInput}
        /> */}

        <div className="leftModalNameDiv">
          <h1 className="leftModalName"> welcome {user[0]} </h1>
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
          {/* <div className="PMIdInput"> {nickName}</div> */}
          <input
            type="text"
            className="PMIdInput"
            value={nickName}
            onChange={(event) => {
              setNickName(event.target.value);
            }}
          />
        </div>
        <div className="PMAge">
          <span className="PMAgeLabel">Age</span>
          <select className="PMAgeSelect">
            {ages.map(() => {
              return <option> {age}</option>;
            })}
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
            {/* <button className="PMMGenderMale ">{gender[0]}</button> */}
            <button
              className={`btn ${genderCheck === "check" ? "active" : ""}`} // tab 값이 'curr' 이면 active 클래스를 추가
              onClick={() => setgenderCheck("check")}
            >
              {gender[0]}
            </button>
            {/* <button className="PMMGenderFemale">{gender[1]}</button> */}
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
      </button>
    </div>
  );
}

export default MyInfoModal;
// ReactDOM.render(<ExampleSlider />, document.getElementById("root"));
