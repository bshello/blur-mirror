import "./signIn.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { saveToken } from "../../../redux/reducers/saveToken";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function SignIn({ showSignUpModal, showSignInModal, showSearchPwModal }) {
  const API_URL = "http://192.168.31.192:8080/user";
  const SOCIAL_API_URL = "http://192.168.31.192:8080";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ttoken = useSelector((state) => state.strr.token);
  console.log(ttoken);

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
        url: `${API_URL}/login`,
        data: {
          userId: signId,
          password: signPs,
        },
      })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.accessToken.token);
          console.log(res.data.refreshToken.token);
          dispatch(saveToken(res.data.accessToken.token));
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

  const socialSignIn = (socialType) => {
    return `${SOCIAL_API_URL}/oauth2/authorization/${socialType}?redirect_uri=http://localhost:3000/social/redirect`;
  };

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

      <button
        className="KakaoLoginBtn"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = socialSignIn("kakao");
        }}
      >
        카카오로 로그인
      </button>
      <button
        className="NaverLoginBtn"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = socialSignIn("naver");
        }}
      >
        네이버로 로그인
      </button>
      <button
        className="GoogleLoginBtn"
        onClick={(e) => {
          e.preventDefault();
          window.location.href = socialSignIn("google");
        }}
      >
        구글로 로그인
      </button>
      <div className="PlaceHolder"></div>
    </div>
  );
}

export default SignIn;
