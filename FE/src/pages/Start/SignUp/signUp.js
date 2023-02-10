import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import axios from "axios";

function SignUp({ showSignUpModal, showSignInModal }) {
  const API_URL = "http://192.168.31.192:8000/blur-auth/user";
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [isId, setIsId] = useState(false);
  const [idMessage, setIdMessage] = useState("");

  const enterId = (e) => {
    const currentId = e.target.value;
    setId(currentId);
    const idRegex = /\s/g;

    if (!idRegex.test(e.target.value) && currentId.length > 2 && currentId.length < 15) {
      setIdMessage("올바른 이름 형식입니다 :)");
      setIsId(true);
    } else {
      setIdMessage("공백없이 3글자 이상 15글자 미만으로 입력해주세요.");
      setIsId(false);
    }
    console.log(currentId);
  };

  const [ps1, setPs1] = useState("");
  const enterPs1 = (e) => {
    setPs1(e.target.value);
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
    console.log(ps1);
  };

  const [ps2, setPs2] = useState("");
  const enterPs2 = (e) => {
    setPs2(e.target.value);
    console.log(ps2);
  };

  const [isPassword, setIsPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");

  const [email, setEmail] = useState("");
  const enterEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
    console.log(email);
  };

  const [emailCode, setEmailCode] = useState(null);
  const enterEmailCode = (e) => {
    setEmailCode(e.target.value);
    console.log(emailCode);
  };

  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  const [idCheck, setIdCheck] = useState(false);

  const callIdCheck = () => {
    if (isId) {
      axios({
        method: "post",
        url: `${API_URL}/checkId`,
        data: {
          userId: id,
        },
      })
        .then((res) => {
          console.log(res);

          if (!res.data) {
            alert("아이디가 중복되었습니다");
          } else {
            alert("사용가능한 아이디입니다.");
            setIdCheck(res.data);
          }
        })
        .catch((err) => {
          alert("중복확인 실패했습니다");
        });
    } else {
      alert("id형식을 맞춰주세요");
    }
  };

  const [psCheck, setPsCheck] = useState(false);
  const [psWarn, setPsWarn] = useState(false);
  const [decode, setDecode] = useState(false);
  const decodePs = () => {
    setDecode((pre) => !pre);
  };
  const callPsCheck = (ps1, ps2) => {
    if (ps1 === ps2) {
      setPsCheck(true);
      setPsWarn(false);
    } else {
      setPsCheck(false);
      setPsWarn(true);
    }
  };

  useEffect(() => {
    callPsCheck(ps1, ps2);
  }, [ps1, ps2]);

  const psInput = useRef(null);

  useEffect(() => {
    if (decode === true) {
      psInput.current.type = "text";
    } else {
      psInput.current.type = "password";
    }
  }, [decode]);

  const [emailCheck, setEmailCheck] = useState(false);

  //이메일로 인증코드 보내는 함수
  const sendToEmail = () => {
    if (isEmail) {
      axios({
        method: "post",
        url: `${API_URL}/sendAuthEmail`,
        data: {
          email: email,
        },
      })
        .then((res) => {
          console.log(res);
          setEmailCheck(true);
          alert("인증번호를 보냈습니다!");
        })
        .catch((err) => {
          console.log(err);
          alert("인증번호를 보내지 못했습니다.");
        });
    } else {
      alert("이메일 형식을 지켜주세요");
    }
  };

  const [emailCodeCheck, setEmailCodeCheck] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    if (id && ps1 && email && emailCode && idCheck && psCheck && emailCheck && emailCodeCheck) {
      axios({
        method: "post",
        url: `${API_URL}/register`,
        data: {
          userId: id,
          password: ps1,
          email: email,
        },
      })
        .then((res) => {
          console.log(res);
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("아이디중복 또는 비밀번호불일치 또는 이메일확인코드오류 입니다.");
    }
  };

  useEffect(() => {
    if (idCheck === true) {
      alert("아이디가 바뀌었습니다. 다시 중복확인 해주세요");
      setIdCheck(false);
    }
  }, [id]);

  // useEffect(() => {
  //   if (emailCheck === true) {
  //     alert("이메일이 바뀌었습니다. 다시 인증코드 보내세요");
  //     setEmailCheck(false);
  //   }
  // }, [email]);

  // useEffect(() => {
  //   if (emailCodeCheck === true) {
  //     alert("이메일인증코드가 바뀌었습니다. 다시 인증코드 보내세요");
  //   }
  //   setEmailCodeCheck(false);
  // }, [emailCode]);

  const signUpButton = useRef(null);

  useEffect(() => {
    if (id && ps1 && email && emailCode && idCheck && psCheck && emailCheck && emailCodeCheck) {
      signUpButton.current.disabled = false;
      signUpButton.current.style.background = "#50a1a3";
    } else {
      signUpButton.current.disabled = true;
      signUpButton.current.style.background = "grey";
    }
  }, [id, ps1, email, emailCode, idCheck, psCheck, emailCheck, emailCodeCheck]);

  return (
    <div className="SUModal">
      <div className="SUModalHeader">
        <h3 className="SUModalHeaderText">Sign Up</h3>
        <button
          className="SUModalClose"
          onClick={() => {
            showSignUpModal();
            showSignInModal();
          }}
        >
          x
        </button>
      </div>
      <form>
        <div className="SUModalInputIdDiv">
          <label className="SUModalInputIdLabel" htmlFor="user_id">
            <span className="SUModalInputIdLabelText">ID</span>
          </label>

          <input className="SUModalInputId" id="user_id" placeholder="ID는 공백없이 3자이상 15자미만" onChange={enterId}></input>

          <button
            className="SUModalInputBTN "
            onClick={(e) => {
              e.preventDefault();
              callIdCheck();
            }}
          >
            아이디 중복체크
          </button>
        </div>
        {id.length > 0 && (
          <span className="formCheckMessage" style={isId ? { color: "green" } : { color: "red" }}>
            {idMessage}
          </span>
        )}
        <div className="SUModalInputPwDiv">
          <label className="SUModalInputPwLabel" htmlFor="user_pw">
            <span className="SUModalInputPwLabelText">PW</span>
          </label>

          <input className="SUModalInputPw" id="user_pw" ref={psInput} placeholder="(숫자+영문자+특수문자 조합으로 8자리 이상)" type="password" onChange={enterPs1}></input>

          <button
            className={!decode ? "ShowPassword" : "HidePassword"}
            onClick={(e) => {
              e.preventDefault();
              decodePs();
            }}
          ></button>
        </div>
        {ps1.length > 0 && (
          <span className="formCheckMessage" style={isPassword ? { color: "green" } : { color: "red" }}>
            {passwordMessage}
          </span>
        )}
        <div className="SUModalInputPwChkDiv">
          <label className="SUModalInputPwChkLabel" htmlFor="user_pw_re">
            <span className="SUModalInputPwChkLabelText">PW Check</span>
          </label>

          <input className="SUModalInputPwChk" id="user_pw_re" placeholder="PW를 다시 입력해 주세요" type="password" onChange={enterPs2}></input>
        </div>
        {psWarn ? <span style={{ color: "red" }}>비밀번호가 다릅니다!</span> : null}
        <div className="SUModalInputEmailDiv">
          <label className="SUModalInputEmailLabel" htmlFor="user_email">
            <span className="SUModalInputEmailLabelText">E-mail</span>
          </label>

          <input className="SUModalInputEmail" id="user_email" placeholder="E-mail을 입력해 주세요" onChange={enterEmail}></input>

          <button
            className="SUModalSendEmail"
            onClick={(e) => {
              e.preventDefault();
              sendToEmail();
            }}
          >
            이메일로 인증번호 보내기
          </button>
        </div>
        {email.length > 0 && (
          <span className="formCheckMessage" style={isEmail ? { color: "green" } : { color: "red" }}>
            {emailMessage}
          </span>
        )}
        {emailCheck ? (
          <div className="SUModalInputEmailConfirmDiv">
            <label className="SUModalInputEmailConfirmLabel" htmlFor="user_email_confirm">
              <span className="SUModalInputEmailConfirmLabelText">E-mail 인증번호</span>
            </label>
            <input className="SUModalInputEmailConfirm" id="user_email_confirm" placeholder="인증번호를 입력해 주세요" onChange={enterEmailCode}></input>
            <button className="SUModalEmailBTN" onClick={(e) => e.preventDefault()}>
              인증번호 확인
            </button>
          </div>
        ) : null}
        <button className="SUSignUpBtn" ref={signUpButton} onClick={onSubmit}>
          {/* <span className="SUBtnText">회원가입</span> */}
          회원가입
        </button>
      </form>

      <button
        className="SUCancleBtn"
        onClick={() => {
          showSignUpModal();
          showSignInModal();
        }}
      >
        취소
      </button>
      <div className="PlaceHolder"></div>
    </div>
  );
}

export default SignUp;
