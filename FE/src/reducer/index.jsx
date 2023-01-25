// store에 들어갈 state와 state를 바꿀 함수를 정의하는 곳

/** root reducer */
// import counter from "./counter";
import MToggle from "./MToggle";
import { combineReducers } from "redux";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.

const rootReducer = combineReducers({
  // counter,
  MToggle,
});

export default rootReducer;
