import "./index.css";
import { useSelector } from "react-redux"; // useSeletor: useState와 같은 값 변경 메서드

import Header from "../../components/Header";
import MeetingNotIn from "./MeetingNotIn";
import MeetingIn from "./MeetingIn";

function Meeting() {
  const mToggle = useSelector((state) => state.MToggle.togg); // Redux에 저장되어있는 MToggle

  return (
    <div className="Meeting">
      <Header />
      <div className="togglePage">{mToggle ? <MeetingIn /> : <MeetingNotIn />}</div>
    </div>
  );
}

export default Meeting;
