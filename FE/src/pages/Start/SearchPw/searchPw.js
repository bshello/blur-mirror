import "./searchPw.css";

function SearchPw({ showSignInModal, showSearchPwModal, showAlertModal }) {
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
        ></input>
      </div>
      <div className="SPModalInputEmailDiv">
        <label className="SPModalInputEmailLabel">E-mail</label>
        <input
          className="SPModalInputEmail"
          placeholder="  E-mail을 입력해 주세요"
        ></input>
      </div>
      <button
        className="SPConfirmBtn"
        onClick={() => {
          showAlertModal();
          showSearchPwModal();
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
