import { useState } from "react";
import "./signUp.css";
import axios from "axios";

function SignUp({ showSignUpModal, showSignInModal }) {
  const API_URL = "http://localhost:8080";

  const [id, setId] = useState(null);
  const enterId = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const [ps1, setPs1] = useState(null);
  const enterPs1 = (e) => {
    setPs1(e.target.value);
    console.log(ps1);
  };

  const [ps2, setPs2] = useState(null);
  const enterPs2 = (e) => {
    setPs2(e.target.value);
    console.log(ps2);
  };

  const [email, setEmail] = useState(null);
  const enterEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const [idCheck, setIdCheck] = useState(false);
  const callIdCheck = () => {
    axios({
      method: "post",
      url: `${API_URL}/checkId`,
      data: {
        "userId": id,
      },
    })
      .then((res) => {
        console.log("res.data", res.data);
        setIdCheck(res.data);
        console.log(idCheck);
      })
      .catch((err) => {
        console.log(id);
        console.log(err);
      });
  };

  const [psCheck, setPsCheck] = useState(false);

  const [emailCheck, setEmailCheck] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("막았다");
  };

  return (
    <div className="SUModal">
      <div className="SUModalHeader">
        <h3 className="SUModalHeaderText">Sign Up</h3>
      </div>
      <form>
        <div className="SUModalInputIdDiv">
          <label className="SUModalInputIdLabel" htmlFor="user_id">
            ID
          </label>
          <input
            className="SUModalInputId"
            id="user_id"
            placeholder="ID를 입력해 주세요"
            onChange={enterId}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault(); callIdCheck();
            }}
          >
            아이디 중복체크
          </button>
        </div>
        <div className="SUModalInputPwDiv">
          <label className="SUModalInputPwLabel" htmlFor="user_pw">
            PW
          </label>
          <input
            className="SUModalInputPw"
            id="user_pw"
            placeholder="PW를 입력해 주세요"
            onChange={enterPs1}
          ></input>
        </div>
        <div className="SUModalInputPwChkDiv">
          <label className="SUModalInputPwChkLabel" htmlFor="user_pw_re">
            PW Check
          </label>
          <input
            className="SUModalInputPwChk"
            id="user_pw_re"
            placeholder="PW를 다시 입력해 주세요"
            onChange={enterPs2}
          ></input>
        </div>
        <div className="SUModalInputEmailDiv">
          <label className="SUModalInputEmailLabel" htmlFor="user_email">
            E-mail
          </label>
          <input
            className="SUModalInputEmail"
            id="user_email"
            placeholder="E-mail을 입력해 주세요"
            onChange={enterEmail}
          ></input>
          <button onClick={(e) => e.preventDefault()}>
            이메일로 인증번호 보내기
          </button>
        </div>
        <div className="SUModalInputEmailConfirmDiv">
          <label
            className="SUModalInputEmailConfirmLabel"
            htmlFor="user_email_confirm"
          >
            E-mail 인증번호
          </label>
          <input
            className="SUModalInputEmailConfirm"
            id="user_email_confirm"
            placeholder="인증번호를 입력해 주세요"
          ></input>
          <button onClick={(e) => e.preventDefault()}>인증번호 확인</button>
        </div>

        <button className="SUSignUpBtn" onClick={onSubmit}>
          <span className="SUBtnText">회원가입</span>
        </button>
      </form>

      <button
        className="SUCancleBtn"
        onClick={() => {
          showSignUpModal();
          showSignInModal();
        }}
      >
        <span className="SUCancleBtnText">취소</span>
      </button>
    </div>
  );
}

export default SignUp;
