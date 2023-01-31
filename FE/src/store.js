// import { configureStore } from "@reduxjs/toolkit";
// import user from "./reducer/userEdit";

import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  //state 이름
  name: "user",

  //stae 값
  initialState: "kim",
});

export default configureStore({
  reducer: {
    user: user.reducer,
  },
});
