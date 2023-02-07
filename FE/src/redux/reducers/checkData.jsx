// 체크한데이터 가져오기

import { createSlice } from "@reduxjs/toolkit";

const checkDataSlice = createSlice({
  name: "checkedData",
  initialState: {
    checkData: [],
  },
  reducers: {
    addCheckboxData: (state, action) => {
      state.checkboxData.push(action.payload);
    },
  },
});

export default checkDataSlice.reducer;

export const { addCheckboxData } = checkDataSlice.actions;
