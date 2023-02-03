import { useState } from "react";
import "./searchPw.css";
import axios from "axios";

function SearchPw({ showSignInModal, showSearchPwModal, showAlertModal }) {
  const API_URL = "http://localhost:8080";

  const [id, setId] = useState(null);
  const enterId = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const [email, setEmail] = useState(null);
  const enterEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const callSearchPwCheck = () => {
    axios({
      method: "post",
      url: `${API_URL}/findPw`,
      data: {
        userId: id,
        email: email,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="SPModal">
      <div className="SPModalHeader">
        <span className="SPModalHeaderText">Searching Password</span>
      </div>
      <div className="SPModalInputIdDiv">
        <label className="SPModalInputIdLabel">ID</label>
        <input
          className="SPModalInputId"
          placeholder="  ID를 입력해 주세요"
          onChange={enterId}
        ></input>
      </div>
      <div className="SPModalInputEmailDiv">
        <label className="SPModalInputEmailLabel">E-mail</label>
        <input
          className="SPModalInputEmail"
          placeholder="  E-mail을 입력해 주세요"
          onChange={enterEmail}
        ></input>
      </div>
      <button
        className="SPConfirmBtn"
        onClick={() => {
          showAlertModal();
          showSearchPwModal();
          callSearchPwCheck();
        }}
      >
        <span className="SPConfirmBtnText">임시비밀번호 이메일로 전송하기</span>
      </button>
      <button
        className="SPCancleBtn"
        onClick={() => {
          showSignInModal();
          showSearchPwModal();
        }}
      >
        <span className="SPCancleBtnText">취소</span>
      </button>
    </div>
  );
}

export default SearchPw;
