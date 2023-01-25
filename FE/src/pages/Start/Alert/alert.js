import "./alert.css";

function Alert({ showAlertModal, content }) {
  return (
    <div className="AlertDiv">
      <span className="AlertHeader">Alert</span>
      <span className="AlertDesc">{content}</span>
      <button className="AlertBtnDiv" onClick={showAlertModal}>
        <span className="AlertBtnText">확인</span>
      </button>
    </div>
  );
}

export default Alert;
