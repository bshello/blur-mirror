import Header from "../../components/Header";
import "./index.css";

function Meeting() {
  return (
    <div className="Meeting">
      <Header />
      <div className="MCenterDiv">
        <div className="MCenterImgDiv"></div>
        <div className="MCenterTitle"></div>
        <div className="MCenterDesc"></div>
        <div className="MCenterCirclesDiv">
          <div className="MPCenterCircle1"></div>
          <div className="MPCenterCircle2"></div>
          <div className="MPCenterCircle3"></div>
        </div>
      </div>
    </div>
  );
}

export default Meeting;
