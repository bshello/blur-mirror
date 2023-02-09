import { createSlice } from "@reduxjs/toolkit";

const saveTokenReducer = createSlice({
  name: "saveTokenReducer",
  initialState: { token: "aa", id: "초기아이디" },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },

    saveId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default saveTokenReducer.reducer;
export const { saveToken, saveId } = saveTokenReducer.actions;
