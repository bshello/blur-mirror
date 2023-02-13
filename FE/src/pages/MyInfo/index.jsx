import "../../App.css";
import "./index.css";
import MyInfoModal from "./MyInfoModal/myInfoModal";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Hash from "./Hash/Hash";
import { useNavigate } from "react-router-dom";
import ModalWrap from "../Start/ModalWrap/modalWrap";
import Alert from "../../pages/Start/Alert";
import axios from "axios";

function MyInfo() {
  // 화면 켜지자 말자 띄우는 거
  // const API_URL = `http://192.168.31.73:8000/blur-profile/profile`;
  const id = "123123";
  const API_URL = `http://192.168.31.73:8000/blur-profile/profile/${id}`;
  // const id = "123123";
  // const [proFile, setProFile] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${API_URL}`,
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.status);
        // setProFile(res.data);
        console.log("성공><");
      })
      .catch((err) => {
        alert("기존 데이터 없다.");
        console.log(err);
      });
  }, []);

  //profile edit modal
  const [miModal, setMyInfoModal] = useState(false);
  const showMyinfoModal = () => {
    setMyInfoModal((pre) => !pre);
  };

  //hash modal
  const [hashModal, setHashModal] = useState(false);
  const showHashModal = () => {
    setHashModal((pre) => !pre);
  };

  // // hash 관심사 적용되면 보일 거
  // const [changeHash, setChangeHash] = useState(false);
  // const showChangeHash = () => {
  //   setChangeHash((change) => !change);
  // };

  //alert modal
  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  // 관심사 5개 띄우는 거
  // const [myInterest, setMyInterest] = useState([]);
  // const showMyInterest = () => {
  //   setMyInterest((int) => !int);
  // };

  // 페이지 이동
  const navigate = useNavigate();

  // reducer에서 변경된 값을 가져오자
  const user = useSelector((state) => {
    return state.user.value;
  });

  const intro = useSelector((state) => {
    return state.intro.value;
  });

  const age = useSelector((state) => {
    return state.age.value;
  });

  // 이미지 미리보기
  // const [imgFile, setImgFile] = useState("");
  // const imgRef = useRef();

  // const saveImgFile = () => {
  //   const file = imgRef.current.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onloadend = () => {
  //     setImgFile(reader.result);
  //   };
  // };

  return (
    <div className="myinfo">
      {miModal || hashModal ? (
        <ModalWrap
          miModal={miModal}
          hashModal={hashModal}
          showHashModal={showHashModal}
          showMyinfoModal={showMyinfoModal}
        />
      ) : null}
      {miModal && !hashModal ? (
        <MyInfoModal
          showHashModal={showHashModal}
          showMyinfoModal={showMyinfoModal}
          showAlertModal={showAlertModal}
        />
      ) : null}

      {hashModal && !miModal ? (
        <Hash
          showMyinfoModal={showMyinfoModal}
          showHashModal={showHashModal}
          showAlertModal={showAlertModal}
        />
      ) : null}

      {alertModal && !miModal && !hashModal ? (
        <Alert
          showAlertModal={showAlertModal}
          content={"변경사항이 저장되었습니다."}
        />
      ) : null}

      <div className="DarkBlurDiv"></div>
      <div
        onClick={() => {
          navigate("/home");
        }}
        className="MIbackbtn"
      >
        out
      </div>
      <div className="MIImgDiv">
        <div className="MIImg"></div>
        {/* <label className="imageEditBtn" htmlFor="profileImg">
          변경
        </label>
        <img
        htmlFor="profileImg"
          className="MIImg"
          src={
            imgFile
              ? imgFile
              : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`
          }
          alt="사진"
        /> */}
        {/* 이미지 업로드 input */}
        {/* <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
          style={{ display: "none" }}
        ></input> */}
        <div className="MISetDiv"></div>
      </div>
      <span className="MIHashTag">Hash Tag</span>
      <div
        className="MIHashSet"
        onClick={showHashModal}
        // onChange={showChangeHash}
        disabled={alertModal === true ? true : false}
      >
        <div className="MIHashSetIcon">
          <span className="MIHashSetText">설정하기</span>
        </div>
      </div>
      <div className="MINameAgeDiv">
        <span className="MIAge"> {age}</span>
        <span className="MIName"> {user} </span>
      </div>
      <div className="MIIntroducingDiv">
        <span className="MIIntroducingTitle">Introducing</span>
        <span className="MIIntroducingText"> {intro} </span>
      </div>
      <span className="MIProfileLogo">Blur:</span>
      <div
        className="MIEdit"
        onClick={() => {
          showMyinfoModal();
          // anima();
        }}
        disabled={alertModal === true ? true : false}
      >
        profile edit -
      </div>
    </div>
  );
}

export default MyInfo;
