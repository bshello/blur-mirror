/*
redux의 경우 
1. combineRecuer를 통해 합친 reducer를 store에 전달
2. thunk
3. thunk를 apply할 수 있는 applyMiddleware
4. composeWithDevTools(리덕스 dev tool)를 전부 작성해 주었지만

redux/toolkit은 configureStore 만 있으면 된다.(위의 4가지 모두 자동화)
*/
import { configureStore } from "@reduxjs/toolkit";
import userEdit from "../redux/reducers/userEdit";
import MToggle from "../redux/reducers/MToggle";

const store = configureStore({
  reducer: {
    user: userEdit,
    mt: MToggle,
  },
});

export default store;
