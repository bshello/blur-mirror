import Header from "../../components/Header";
import "./index.css";
import BlurInfo from "./BlurInfo/blurInfo";
import { useEffect, useState } from "react";
import ModalWrap from "../Start/ModalWrap/modalWrap";
import Alert from "../Start/Alert/alert";
import Slide1 from "./Slide1/slide1";
import Slide2 from "./Slide2/slide2";
import Slide3 from "./Slide3/slide3";

function Home() {
  const [blurInfoModal, setBlurInfoModal] = useState(false);
  const showBlurInfoModal = () => {
    setBlurInfoModal((pre) => !pre);
  };

  const [alertModal, setalertModal] = useState(false);
  const showAlertModal = () => {
    setalertModal((pre) => !pre);
  };

  const [slideNumber, setSlideNumber] = useState(0);
  useEffect(() => {
    setTimeout(() => setSlideNumber((pre) => (pre + 1) % 3), 4000);
  }, [slideNumber]);

  return (
    <div className="Home">
      {blurInfoModal || alertModal ? (
        <ModalWrap
          blurInfoModal={blurInfoModal}
          showBlurInfoModal={showBlurInfoModal}
        />
      ) : null}
      {blurInfoModal && !alertModal ? <BlurInfo /> : null}
      {alertModal && !blurInfoModal ? (
        <Alert
          showAlertModal={showAlertModal}
          content={"프로필 설정을 하지 않으셨습니다. 작성 페이지로 이동합니다."}
        />
      ) : null}

      <Header />
      <div className="HomeSubFrame">
        <div className="HomeLeftDiv">
          <div className="HomeCamDiv">
            <div className="HomeCamImg"></div>
          </div>
          <button className="InfoBlurBtn" onClick={showBlurInfoModal}></button>
          <button className="CamToggle"></button>
          <button className="CommBoxFrame2" onClick={showAlertModal}>
            <span className="CommBoxFrameStart">Blur Start</span>
          </button>
        </div>
        {slideNumber === 0 ? <Slide1 /> : null}
        {slideNumber === 1 ? <Slide2 /> : null}
        {slideNumber === 2 ? <Slide3 /> : null}

        {/* <div className="HomeRightDiv">
          <div className="HomeRightImgDiv">
            <div className="HomeRightImg"></div>
          </div>
          <div className="HomeRightToolTipDiv">
            <span className="HomeRightToolTipText">
              자신감있는 대화로 당신의 매력을 어필하세요.
            </span>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
