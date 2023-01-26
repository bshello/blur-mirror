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
            placeholder="ID를 입력해 주세요"
          ></input>
        </div>
        <div className="ModalInputPwDiv">
          <label className="ModalInputPwLabel" htmlFor="user_pw">
            PW
          </label>
          <input
            className="ModalInputPw"
            id="user_pw"
            placeholder="PW를 입력해 주세요"
          ></input>
        </div>
      </form>

      <div className="LoginBtnDiv">
        <button className="LoginBtn">로그인</button>
        <div className="IdSaveDiv">
          <input className="IdSaveToggle" type="checkbox"></input>
          <label className="IdSaveText">아이디 저장</label>
        </div>
        <button
          className="SISignUpBtn"
          onClick={() => {
            showSignInModal();
            showSignUpModal();
          }}
        >
          회원가입
        </button>
        <button
          className="SISearchingPwBtn"
          onClick={() => {
            showSearchPwModal();
            showSignInModal();
          }}
        >
          비밀번호 찾기
        </button>
      </div>

      <button className="KakaoLoginBtn">카카오로 로그인</button>
      <button className="NaverLoginBtn">네이버로 로그인</button>
    </div>
  );
}

export default SignIn;
