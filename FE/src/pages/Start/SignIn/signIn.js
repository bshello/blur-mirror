import "./signIn.css";

function SignIn() {
  return (
    <div className="SIModal">
      <div>
        <h3>Sign In</h3>
      </div>
      <div>
        <form>
          <label htmlFor="user_id"></label>
          <input id="user_id" placeholder="ID를 입력해 주세요"></input>
          <label htmlFor="user_pw"></label>
          <input id="user_pw" placeholder="PW를 입력해 주세요"></input>
        </form>
        <button>로그인</button>
        <button>아이디 저장</button>
        <button>회원가입</button>
        <button>비밀번호 찾기</button>
      </div>
      <div>
        <button>카카오로 로그인</button>
        <button>네이버로 로그인</button>
      </div>
    </div>
  );
}

export default SignIn;
