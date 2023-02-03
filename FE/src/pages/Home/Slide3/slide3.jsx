import img3 from "../../../assets/images/tongue.png";

function Slide3() {
  return (
    <div className="HomeRightDiv">
      <div className="HomeRightImgDiv">
        <img className="HomeRightImg" src={img3} alt="no"></img>
      </div>
      <div className="HomeRightToolTipDiv">
        <span className="HomeRightToolTipText">외모는 중요하지 않습니다.</span>
      </div>
    </div>
  );
}

export default Slide3;
