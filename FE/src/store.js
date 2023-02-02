// store 부분은 configureStore 만 있으면 된다.
import { configureStore } from "@reduxjs/toolkit";
import introEdit from "./reducer/introEdit";
import userEdit from "./reducer/userEdit";

const store = configureStore({
  reducer: {
    user: userEdit.reducer,
    intorduce: introEdit.reducer,
  },
});

export default store;
