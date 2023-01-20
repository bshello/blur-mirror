import { useState } from "react";
import Header from "../../components/Header";
import "./index.css";
import SignIn from "./SignIn/signIn";
import SignInWrap from "./SignIn/signInWrap";
import SignUp from "./SignUp/signUp";
import SearchPw from "./SearchPw/searchPw";

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

  return (
    <div className="Start">
      {signInModal || signUpModal || searchPwModal ? (
        <SignInWrap
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

      {searchPwModal && !signInModal && !signUpModal ? <SearchPw /> : null}

      <Header />
      <div className="SubFrame">
        <div className="SubLeftDiv">
          <span className="SubLeftTitle">Hey, Just Blur!</span>
          <span className="SubLeftDesc">Show me your own color.</span>
          <div className="CommBoxFrame1" onClick={showSignInModal}>
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
