import { useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import SignIn from "./SignIn/signIn";
import ModalWrap from "./ModalWrap/modalWrap";
import SignUp from "./SignUp/signUp";
import SearchPw from "./SearchPw/searchPw";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { useRef } from "react";

function Start() {
  const [signInModal, setSignInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [searchPwModal, setSearchPwModal] = useState(false);
  const [alertModal, setalertModal] = useState(false);

  const userState = useSelector((state) => state.strr.token);
  const navigate = useNavigate();
  const ref1 = useRef(null); //subFrame 1, 2, 3, 4, 5에 달아놈
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  console.log(process.env);

  const showSignInModal = () => {
    setSignInModal((pre) => !pre);
  };

  const showSignUpModal = () => {
    setSignUpModal((pre) => !pre);
  };

  const showSearchPwModal = () => {
    setSearchPwModal((pre) => !pre);
  };

  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  const StartBtn = () => {
    if (userState) {
      navigate("/home");
    } else {
      showSignInModal();
    }
  };

  //스크롤 함수
  let page = 1;
  let selectedRef;

  window.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();

      const deltaY = event.deltaY;
      const direction = deltaY > 0 ? "down" : "up"; //마우스 휠 방향

      if (direction === "down") {
        if (page === 5) {
          return;
        }
        page = page + 1;
      } else {
        if (page === 1) {
          return;
        }
        page = page - 1;
      }

      switch (page) {
        case 1:
          selectedRef = ref1.current;
          break;
        case 2:
          selectedRef = ref2.current;
          break;
        case 3:
          selectedRef = ref3.current;
          break;
        case 4:
          selectedRef = ref4.current;
          break;
        case 5:
          selectedRef = ref5.current;
          break;
        default:
          // 예외 처리 코드 작성
          break;
      }

      selectedRef.scrollIntoView({ behavior: "smooth" });
    },
    {
      passive: false,
    }
  );

  return (
    <div className="Start">
      {signInModal || signUpModal || searchPwModal ? (
        <ModalWrap
          signInModal={signInModal}
          signUpModal={signUpModal}
          searchPwModal={searchPwModal}
          showSignInModal={showSignInModal}
          showSignUpModal={showSignUpModal}
          showSearchPwModal={showSearchPwModal}
        />
      ) : null}

      {signInModal && !signUpModal && !searchPwModal ? (
        <SignIn
          showSignUpModal={showSignUpModal}
          showSignInModal={showSignInModal}
          showSearchPwModal={showSearchPwModal}
        />
      ) : null}

      {signUpModal && !signInModal && !searchPwModal ? (
        <SignUp
          showSignUpModal={showSignUpModal}
          showSignInModal={showSignInModal}
        />
      ) : null}

      {searchPwModal && !signInModal && !signUpModal ? (
        <SearchPw
          showSignInModal={showSignInModal}
          showSearchPwModal={showSearchPwModal}
          showAlertModal={showAlertModal}
        />
      ) : null}

      {alertModal && !signInModal && !signUpModal && !searchPwModal ? (
        <Alert
          showAlertModal={showAlertModal}
          content={"임시비밀번호가 이메일로 전송되었습니다."}
        />
      ) : null}

      <Header showSignInModal={showSignInModal} />
      <div className="SubFrame" ref={ref1}>
        <div className="SubLeftDiv">
          <span className="SubLeftTitle">Hey, Just Blur!</span>
          <span className="SubLeftDesc">Show me your own color.</span>

          <div
            className="CommBoxFrame1 color-5"
            onClick={StartBtn}
            disabled={alertModal === true ? true : false}
          >
            <span className="CommBoxFrameStart">Start</span>
          </div>
        </div>

        <div className="SubRightDiv">
          <div className="SubRightImg"></div>
        </div>
      </div>
      <div className="SubFrame2" ref={ref2}></div>
      <div className="SubFrame3" ref={ref3}></div>
      <div className="SubFrame4" ref={ref4}></div>
      <div className="SubFrame5" ref={ref5}></div>
    </div>
  );
}

export default Start;
