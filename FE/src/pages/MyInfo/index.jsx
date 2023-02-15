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
  const id = "123123";

  const API_URL = `http://192.168.31.192:8000/blur-profile/profile/${id}`;
  const [proFile, setProFile] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [getInterest, setGetInterest] = useState([]);
  useEffect(() => {
    axios({
      method: "GET",
      url: `${API_URL}`,
      data: {},
    })
      .then((res) => {
        console.log(res.data);
        // console.log(res.status);
        console.log(res.data.userInterests);
        setProFile(res.data);
        setUserInterests(res.data.userInterests);
        console.log("성공><");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, intro, age]);

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

  //alert modal
  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  // 페이지 이동
  const navigate = useNavigate();

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
          setUserInterests={setUserInterests}
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
        <img className="MIImg" src={proFile.image}></img>
        <div className="MISetDiv"></div>
      </div>
      <span className="MIHashTag">Hash Tag</span>
      {userInterests.length > 0 ? (
        <div
          className="showint"
          onClick={showHashModal}
          disabled={alertModal === true ? true : false}
        >
          {userInterests.map((item, idx) => {
            return (
              <div className="showintdiv" key={item.userinterests}>
                {item.interestName}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="MIHashSet"
          onClick={showHashModal}
          disabled={alertModal === true ? true : false}
        >
          <div className="MIHashSetIcon">
            <span className="MIHashSetText">설정하기</span>
          </div>
        </div>
      )}
      {/*  */}
      <div className="MINameAgeDiv">
        <span className="MIAge"> {age === "" ? proFile.age : age}</span>
        <span className="MIName">{user === "" ? proFile.nickname : user}</span>
      </div>
      <div className="MIIntroducingDiv">
        <span className="MIIntroducingTitle">Introducing</span>
        <span className="MIIntroducingText">
          {intro === "" ? proFile.introduce : intro}{" "}
        </span>
      </div>
      <span className="MIProfileLogo">Blur:</span>
      <div
        className="MIEdit"
        onClick={() => {
          showMyinfoModal();
        }}
        disabled={alertModal === true ? true : false}
      >
        profile edit -
      </div>
    </div>
  );
}

export default MyInfo;
