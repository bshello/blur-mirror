import { useState } from "react";
import "../../MyInfoModal/myInfoModal.css";
import "./setmodal.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SetModal() {
  const [gender, setGender] = useState(["Male"]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    position: "relative",

    // arrow: true,
  };

  return (
    <div className="SettingModal">
      {/* <Slider {...settings}>
        <div className="SetMMPartnerCheckdiv">male</div>
        <div className="SetMMPartnerCheckdiv">female</div>
      </Slider> */}
      <div className="SetModal">
        <span className="SEtLabel">Setting</span>
        <div className="SEtMidModalChangediv">
          <div className="ModalInputBox">
            <span className="SetMidPartnerLable">Partner Gender</span>
            <div className="SetMMPartnerCheckdiv">
              <Slider {...settings}>
                <div className="SetMMPartnerCheckdiv">male</div>
                <div className="SetMMPartnerChekdiv">female</div>
              </Slider>
              <div className="blurdiv"></div>
            </div>
          </div>

          <div className="ModalInputBox2">
            <span className="SetMidPartnerLable">Distance from partner</span>
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv"></div>
              <input
                type="range"
                id="a"
                name="ages"
                min="10"
                max="60"
                step="10"
              ></input>
            </div>
          </div>

          <div className="ModalInputBox3">
            <span className="SetMidPartnerLable">Partner's age group</span>
            <div className="SetMMPartnerCheckdiv">
              <div className="blurdiv"></div>
              <input
                type="range"
                id="a"
                name="ages"
                min="10"
                max="60"
                step="10"
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetModal;
