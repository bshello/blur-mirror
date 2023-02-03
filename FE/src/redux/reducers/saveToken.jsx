import { createSlice } from "@reduxjs/toolkit";

const saveTokenReducer = createSlice({
  name: "saveTokenReducer",
  initialState: { token: "aa" },
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default saveTokenReducer.reducer;
export const { saveToken } = saveTokenReducer.actions;
