import "./signIn.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { saveToken } from "../../../reducer/saveToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function SignIn({ showSignUpModal, showSignInModal, showSearchPwModal }) {
  const API_URL = "http://localhost:8080";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ttoken = useSelector((state) => state.saveTokenReducer.token);

  const [signId, setSignId] = useState(null);
  const enterSignId = (e) => {
    setSignId(e.target.value);
    console.log(signId);
  };

  const [signPs, setSignPs] = useState(null);
  const enterSignPs = (e) => {
    setSignPs(e.target.value);
    console.log(signPs);
  };

  const signIn = () => {
    if (signId && signPs) {
      axios({
        method: "post",
        url: `${API_URL}/signIn`,
        data: {
          userId: signId,
          password: signPs,
        },
      })
        .then((res) => {
          console.log(res);
          dispatch(saveToken(res.data.key));
          navigate("/home");
        })
        .catch((err) => {
          console.log(err);
          alert("에러가 발생했습니다.");
        });
    } else {
      alert("아이디와 비밀번호를 입력해주세요");
    }
  };

  useEffect(() => {
    console.log(ttoken);
  }, [ttoken]);

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
            onChange={enterSignId}
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
            type="password"
            onChange={enterSignPs}
          ></input>
        </div>
      </form>

      <div className="LoginBtnDiv">
        <button className="LoginBtn" onClick={signIn}>
          로그인
        </button>
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
      <button className="GoogleLoginBtn">구글로 로그인</button>
      <div className="PlaceHolder"></div>
    </div>
  );
}

export default SignIn;
