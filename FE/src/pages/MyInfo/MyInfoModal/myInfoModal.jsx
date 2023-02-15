import "../../../App.css";
import "./myInfoModal.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { edit } from "../../../redux/reducers/userEdit";
import { intro } from "../../../redux/reducers/introEdit";
import { age } from "../../../redux/reducers/ageEdit";
import { setLeftValue, setRightValue } from "../../../redux/reducers/ageRange";
import { setDistance } from "../../../redux/reducers/partnerDistance";
import SetModal from "./SetModal/setmodal";

import axios from "axios";
// import styled from "styled-components";

function MyInfoModal({ showMyinfoModal, showAlertModal }) {
  const API_URL = `http://192.168.31.73:8000/blur-profile/profile`;
  // const id = useSelector((state) => {
  //   return state.strr.id;
  // });
  const id = "123123";

  // 컴포넌트 켜지자말자 데이터 받아 오기
  const [proFile, setProFile] = useState([]);
  const token = useSelector((state) => {
    return state.strr.token;
  });

  useEffect(() => {
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
        setProFile(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // 유저프로필 업데이트 하기

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
        mbti: mbti,
        gender: gender[genderCheck === "check" ? 0 : 1],
        // minAge: dispatch(setLeftValue(leftValue)),
        // maxAge: dispatch(setRightValue(rightValue)),
        // maxDistance: dispatch(setDistance(distance)),
      },
    })
      .then((res) => {
        dispatch(edit(res.data.nickname));
        dispatch(intro(res.data.introduce));
        dispatch(age(res.data.age));
        console.log(FormData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const handleInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setNameInput(e.target.value);
      setProFile({ ...proFile, nickname: e.target.value });
    } else {
      alert("10글자 이상 입력할 수 없습니다.");
    }
  };
  // age
  const [agee, setAge] = useState("");
  const handleAgeChange = (e) => {
    const inputValue = e.target.value;
    if (!isNaN(inputValue) && inputValue.length <= 2) {
      setAgeInput(inputValue);
      setProFile({ ...proFile, age: e.target.value });
    } else {
      alert("숫자 2자리 이하만 입력 가능합니다.");
    }
  };

  //introducing
  const [introducing, setIntroducing] = useState("");
  const introHandleChange = (e) => {
    setIntroInput(e.target.value);
    setProFile({ ...proFile, introduce: e.target.value });
  };

  // mbti
  const [mbti, setMbti] = useState("");

  const [mbtiOptions, setMbtiOptions] = useState([
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

  const handleSelectChange = (event) => {
    setMbti(event.target.value);
  };
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

  // 이미지
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("profileImage", selectedImage);
    axios
      .post(`${API_URL}/${id}/updateImage`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {});
  }

  function handleImageChange(event) {
    setSelectedImage(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  }

  // 성별
  const gender = ["M", "F"];
  const [genderCheck, setgenderCheck] = useState("check");

  // 데이터 주고 받기
  const dispatch = useDispatch();
  return (
    <div className="Modal">
      {setModal ? <SetModal showSettingModal={showSettingModal} /> : null}
      <div className="leftModal">
        <div className="imgbox">
          <form onSubmit={handleSubmit}>
            <button type="submit" className="imageEditBtn" htmlFor="profileImg">
              저장
            </button>
          </form>

          <label htmlFor="profileImg">
            <img
              className="leftModalImg"
              src={
                previewImage ||
                `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
              }
              alt="사진"
            />
            <input
              type="file"
              id="profileImg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
        </div>
        <div className="leftModalNameDiv">
          <span className="leftModalName">
            welcome {proFile.nickName || "Guest"}
          </span>
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
          <input
            type="text"
            className="PMIdInput"
            value={proFile.nickname ? proFile.nickname : nameInput}
            onChange={handleInputChange}
            placeholder="10자까지만 가능합니다."
            onKeyPress={handleOnKeyPress}
          ></input>
        </div>
        <div className="PMAge">
          <span className="PMAgeLabel">Age</span>
          <input
            type="text"
            className="PMAgeSelect"
            value={proFile.age ? proFile.age : ageInput}
            onChange={handleAgeChange}
            placeholder="숫자만 입력 가능합니다."
          ></input>
        </div>
        <div className="PMMBTI">
          <span className="PMMBTILabel">MBTI</span>
          <select
            value={mbti}
            onChange={handleSelectChange}
            className="PMMBTISelect"
          >
            {mbtiOptions.map((mbtiOptions) => (
              <option key={mbtiOptions.value} value={mbtiOptions.value}>
                {mbtiOptions.label}
              </option>
            ))}
          </select>
        </div>

        <div className="PMMEmail">
          <span className="PMMEmailLabel">E-mail </span>
          <input type="text" className="PMMEmailInput" value={proFile.email} />
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
            value={proFile.introduce ? proFile.introduce : introInput}
            onChange={introHandleChange}
          />
        </div>
      </div>
      <button
        className="ModalOut"
        onClick={() => {
          showMyinfoModal();
          showAlertModal();
          handleSave();
        }}
      >
        <span className="ModalOutText">confirm</span>
      </button>
    </div>
  );
}

export default MyInfoModal;
// ReactDOM.render(<ExampleSlider />, document.getElementById("root"));
