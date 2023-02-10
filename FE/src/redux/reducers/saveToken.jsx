import { createSlice } from "@reduxjs/toolkit";

const saveTokenReducer = createSlice({
  name: "saveTokenReducer",
  initialState: {
    token: "aa",
    savedId: "초기아이디",
    id: "",
    profiled: "false",
  },
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

    profile: (state, action) => {
      state.profiled = action.payload;
    },
  },
});

export default saveTokenReducer.reducer;
export const { saveToken, saveId, loginId, profile } = saveTokenReducer.actions;
