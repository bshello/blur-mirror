import { createSlice } from "@reduxjs/toolkit";

const saveTokenReducer = createSlice({
  name: "saveTokenReducer",
  initialState: { token: "aa", savedId: "초기아이디", id: "" },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },

    saveId: (state, action) => {
      state.savedId = action.payload;
    },

    loginId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default saveTokenReducer.reducer;
export const { saveToken, saveId, loginId } = saveTokenReducer.actions;
