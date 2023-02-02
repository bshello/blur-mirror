// store 부분은 configureStore 만 있으면 된다.
import { configureStore } from "@reduxjs/toolkit";
import userEdit from "./reducer/userEdit";

const store = configureStore({
  reducer: {
    user: userEdit.reducer,
  },
});

export default store;
