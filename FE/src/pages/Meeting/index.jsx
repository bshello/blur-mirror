import Header from "../../components/Header";
import "./index.css";

function Meeting() {
  return (
    <div className="Meeting">
      <Header />
      <div className="MCenterDiv">
        <div className="MCenterImgDiv"></div>
        <div className="MCenterTitle">Searching Other :)</div>
        <div className="MCenterDesc">Please wait For 5 minutes.</div>
        <div className="MCenterCirclesDiv">
          <div className="MPCenterCircle1"></div>
          <div className="MPCenterCircle2"></div>
          <div className="MPCenterCircle3"></div>
        </div>
      </div>
      <div className="MLeftDiv">
        <div className="MMyCamLabel">My Camera</div>
        <div className="MMyCamDiv"></div>
      </div>
      <div className="MStopBtnDiv">
        <span className="MStopBtnText"> Stop</span>
      </div>
    </div>
  );
}

export default Meeting;
