import "./signIn.css";

function SignIn({ showSignUpModal, showSignInModal, showSearchPwModal }) {
  return (
    <div className="SIModal">
      <div className="SIModalHeader">
        <span className="SIModalHeaderText">Sign In</span>
      </div>
      <form>
        <div className="ModalInputIdDiv">
          <label className="ModalInputIdLabel" htmlFor="user_id">
            ID
          </label>
          <input
            className="ModalInputId"
            id="user_id"
            placeholder="  ID를 입력해 주세요"
          ></input>
        </div>
        <div className="ModalInputPwDiv">
          <label className="ModalInputPwLabel" htmlFor="user_pw">
            PW
          </label>
          <input
            className="ModalInputPw"
            id="user_pw"
            placeholder="  PW를 입력해 주세요"
          ></input>
        </div>
      </form>

      <div className="LoginBtnDiv">
        <button className="LoginBtn" style={{ cursor: "pointer" }}>
          로그인
        </button>
        <div className="IdSaveDiv">
          <input className="IdSaveToggle" type="checkbox"></input>
          <label className="IdSaveText">아이디 저장</label>
        </div>
        <button
          className="SISignUpBtn"
          style={{ cursor: "pointer" }}
          onClick={() => {
            showSignInModal();
            showSignUpModal();
          }}
        >
          회원가입
        </button>
        <button
          className="SISearchingPwBtn"
          style={{ cursor: "pointer" }}
          onClick={() => {
            showSearchPwModal();
            showSignInModal();
          }}
        >
          비밀번호 찾기
        </button>
      </div>

      <button className="KakaoLoginBtn" style={{ cursor: "pointer" }}>
        카카오로 로그인
      </button>
      <button className="NaverLoginBtn" style={{ cursor: "pointer" }}>
        네이버로 로그인
      </button>
      <button className="GoogleLoginBtn" style={{ cursor: "pointer" }}>
        구글로 로그인
      </button>
      <div className="PlaceHolder"></div>
    </div>
  );
}

export default SignIn;
