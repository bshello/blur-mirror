import { createSlice } from "@reduxjs/toolkit";

const saveTokenReducer = createSlice({
  name: "saveTokenReducer",
  initialState: {
    token: "임시토큰",
    savedId: "",
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

    ISMYPROFILE: (state, action) => {
      state.profiled = action.payload;
    },
  },
});

export default saveTokenReducer.reducer;
export const { saveToken, saveId, loginId, ISMYPROFILE } = saveTokenReducer.actions;
