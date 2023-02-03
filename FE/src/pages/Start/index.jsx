import { useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import SignIn from "./SignIn/signIn";
import ModalWrap from "./ModalWrap/modalWrap";
import SignUp from "./SignUp/signUp";
import SearchPw from "./SearchPw/searchPw";
import Alert from "./Alert/alert";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Start() {
  const [signInModal, setSignInModal] = useState(false);
  const showSignInModal = () => {
    setSignInModal((pre) => !pre);
  };

  const [signUpModal, setSignUpModal] = useState(false);
  const showSignUpModal = () => {
    setSignUpModal((pre) => !pre);
  };

  const [searchPwModal, setSearchPwModal] = useState(false);
  const showSearchPwModal = () => {
    setSearchPwModal((pre) => !pre);
  };

  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  const userState = useSelector((state) => state.strr.token);
  const navigate = useNavigate();
  const StartBtn = () => {
    if (userState) {
      navigate("/home");
    } else {
      showSignInModal();
    }
  };

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
      <div className="SubFrame">
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
    </div>
  );
}

export default Start;
