import "../../../App.css";
import "./myInfoModal.css";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../../redux/reducers/userEdit";
import { intro } from "../../../redux/reducers/introEdit";
import { age } from "../../../redux/reducers/ageEdit";
import SetModal from "./SetModal/setmodal";

import axios from "axios";
// import styled from "styled-components";

function MyInfoModal({ showMyinfoModal, showAlertModal }) {
  const API_URL = `http://192.168.31.192:8000/blur-profile/profile`;
  // const id = useSelector((state) => {
  //   return state.strr.id;
  // });
  const id = "123123";

  // const getProfile = () => {
  //   axios({
  //     method: "GET",
  //     url: `${API_URL}/${id}`,
  //     data: {},
  //   })
  //     .then((res) => {
  //       console.log(res.data);
  //       console.log(res.status);
  //     })
  //     .catch((err) => {
  //       alert("기존 데이터 없다");
  //       console.log(err);
  //     });
  // };

  // 컴포넌트 켜지자말자 데이터 받아 오기
  const [proFile, setProFile] = useState([]);
  const token = useSelector((state) => {
    return state.strr.token;
  });

  // useEffect(() => {
  axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    url: `${API_URL}/${id}/getProfile`,
    data: {},
  })
    .then((res) => {
      console.log(res.data);
      console.log(res.status);
      setProFile(res.data);
      console.log("성공><");
    })
    .catch((err) => {
      alert("기존 데이터 없다.");
      console.log(err);
    });
  // }, []);

  // 유저프로필 업데이트 하기

  console.log(`${API_URL}/${id}/updateProfile`);

  const handleSave = () => {
    axios({
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      url: `${API_URL}/${id}/updateProfile`,
      data: {
        userId: id,
        age: ageInput,
        nickname: nameInput,
        introduce: introInput,
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);

        console.log("성공><");
      })
      .catch((err) => {
        alert("기존 데이터 없다.");
        console.log(err);
      });
  };

  // const handleSave = async () => {
  //   console.log(nameInput);
  //   console.log(ageInput);
  //   console.log(introInput);

  //   const response = await fetch(`${API_URL}/${id}/updateProfile`, {
  //     method: "PUT",
  //     headers: {
  //       // "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify({
  //       userId: id,
  //       age: ageInput,
  //       nickname: nameInput,
  //       // image: document.querySelector(".leftModalImg"),
  //       // gender: gender,
  //       introduce: introInput,
  //       // mbti: mbti,
  //       // maxAge: 0,
  //       // maxDistance: 0,
  //       // mbti: "infp",
  //       // minAge: 0,
  //     }),
  //   });
  //   if (response.ok) {
  //     console.log("성공적으로 업데이트 됐다.");
  //   } else {
  //     console.error("실패했다.");
  //     console.dir(response);
  //   }
  // };

  //setmodal
  const [setModal, setSettingmodal] = useState(false);
  const showSettingModal = () => {
    setSettingmodal((pre) => !pre);
  };

  //profile 변경
  const [nameInput, setNameInput] = useState("");
  const [introInput, setIntroInput] = useState("");
  const [ageInput, setAgeInput] = useState("");

  // nicName
  const [nickName, setNickName] = useState("");
  // const handleInputChange = (e) => {
  //   setNameInput(e.target.value);
  // };

  const handleInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setNameInput(e.target.value);
    } else {
      alert("10글자 이상 입력할 수 없습니다.");
    }
  };

  // age
  const [agee, setAge] = useState("");
  console.log(agee);
  const handleAgeChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.length <= 2) {
      setAgeInput(inputValue);
    } else {
      alert("숫자 2자리 이하만 입력 가능합니다.");
    }
  };

  //introducing
  const [introducing, setIntroducing] = useState("");
  console.log(introducing);
  const introHandleChange = (e) => {
    setIntroInput(e.target.value);
  };

  //
  const [mbti, setMbti] = useState([
    { value: "ISTJ", label: "ISTJ - Inspector" },
    { value: "ISFJ", label: "ISFJ - Protector" },
    { value: "INFJ", label: "INFJ - Counselor" },
    { value: "INTJ", label: "INTJ - Architect" },

    { value: "ISTP", label: "ISTP - Craftsman" },
    { value: "ISFP", label: "ISFP - Composer" },
    { value: "INFP", label: "INFP - Healer" },
    { value: "INTP", label: "INTP - Architect" },

    { value: "ESTP", label: "ESTP - Dynamo" },
    { value: "ESFP", label: "ESFP - Performer" },
    { value: "ENFP", label: "ENFP - Champion" },
    { value: "ENTP", label: "ENTP - Visionary" },

    { value: "ESTJ", label: "ESTJ - Supervisor" },
    { value: "ESFJ", label: "ESFJ - Provider" },
    { value: "ENFJ", label: "ENFJ - Teacher" },
    { value: "ENTJ", label: "ENTJ - Commander" },
  ]);
  console.log(setMbti);

  const [selectedMbti, setSelectedMbti] = useState("");

  const handleMbtiChange = (e) => {
    setSelectedMbti(e.target.value);
  };
  console.log(handleMbtiChange);

  //emil
  const [email, setEmail] = useState("");
  console.log(setEmail);
  // state 변경 핸들러
  const handleUpload = () => {
    setNickName(() => {
      return nameInput;
    });
    setAge(() => {
      return ageInput;
    });
    setIntroducing(() => {
      return introInput;
    });
  };

  // 엔터 누르는 거 onKeyPress 랑 써야됨
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleUpload(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
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

  // 데이터 주고 받기
  const dispatch = useDispatch();

  return (
    <div className="Modal">
      <div>
        {(proFile, agee, introducing, setMbti, handleMbtiChange, setEmail)}
      </div>
      {/* <button onClick={getProfile}>ddd</button> */}
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
          <img className="leftModalImg" src={imgFile ? imgFile : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`} alt="사진" />
          {/* 이미지 업로드 input */}
          <input type="file" accept="image/*" id="profileImg" onChange={saveImgFile} ref={imgRef} style={{ display: "none" }}></input>
        </div>
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
          <span className="PMIdLable">NickName </span>
          <input type="text" className="PMIdInput" value={nameInput} onChange={handleInputChange} placeholder="10자까지만 가능합니다." onKeyPress={handleOnKeyPress}>
            {/* {proFile.nickname} */}
          </input>
        </div>
        <div className="PMAge">
          <span className="PMAgeLabel">Age</span>
          <input type="text" className="PMAgeSelect" value={ageInput} onChange={handleAgeChange} placeholder="숫자만 입력 가능합니다."></input>
        </div>
        <div className="PMMBTI">
          <span className="PMMBTILabel">MBTI</span>
          {/* <select className="PMMBTISelect"> */}
          <select value={selectedMbti} onChange={email} className="PMMBTISelect">
            {mbti.map((mbti) => (
              <option key={mbti.value} value={mbti.value}>
                {mbti.label}
              </option>
            ))}
          </select>
        </div>

        <div className="PMMEmail">
          <span className="PMMEmailLabel">E-mail </span>
          <input
            type="text"
            className="PMMEmailInput"
            value={email}
            // // onChange={emailHandleChange}
            // placeholder="Enter email"
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
        </div>

        <div className="PMIntroducing">
          <span className="PMIntroducingLabel">Introducing</span>
          <input
            type="text"
            className="PMIntroducingInput"
            value={introInput}
            onChange={introHandleChange}
            // onKeyPress={handleOnKeyPress}
          />
        </div>
      </div>
      <button
        className="ModalOut"
        onClick={() => {
          showMyinfoModal();
          showAlertModal();
          {
            const namechange = document.querySelector(".PMIdInput").value;
            const introchange = document.querySelector(".PMIntroducingInput").value;
            const ageChange = document.querySelector(".PMAgeSelect").value;
            dispatch(edit(namechange));
            dispatch(intro(introchange));
            dispatch(age(ageChange));
          }
          handleSave();
        }}
      >
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
