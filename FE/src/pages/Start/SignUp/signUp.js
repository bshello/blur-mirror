import "./signUp.css";

function SignUp() {
  return (
    <div className="SUModal">
      <div>
        <h3>Sign Up</h3>
      </div>
      <div>
        <form>
          <label htmlFor="user_id"></label>
          <input id="user_id" placeholder="ID를 입력해 주세요"></input>
          <label htmlFor="user_pw"></label>
          <input id="user_pw" placeholder="PW를 입력해 주세요"></input>
          <label htmlFor="user_pw_re"></label>
          <input id="user_pw_re" placeholder="PW를 다시 입력해 주세요"></input>
          <label htmlFor="user_email"></label>
          <input id="user_email" placeholder="E-mail을 입력해 주세요"></input>
        </form>
      </div>
      <div>
        <button>회원가입</button>
        <button>취소</button>
      </div>
    </div>
  );
}

export default SignUp;
