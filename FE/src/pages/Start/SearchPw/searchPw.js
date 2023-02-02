import { useState } from "react";
import "./searchPw.css";
import axios from "axios";

function SearchPw({ showSignInModal, showSearchPwModal, showAlertModal }) {
  const API_URL = "http://localhost:8080";

  const [spId, setSpId] = useState(null);
  const enterId = (e) => {
    setSpId(e.target.value);
    console.log(spId);
  };

  const callSearchPwCheck = () => {
    axios({
      method: "post",
      url: `${API_URL}/findPw`,
      data: {
        userId: spId,
      },
    })
      .then((res) => {
        console.log(res);
        showAlertModal();
        showSearchPwModal();
      })
      .catch((err) => {
        console.log(err);
        alert("id를 정확히 입력해 주세요");
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

      <button
        className="SPConfirmBtn"
        onClick={() => {
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
