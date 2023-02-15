import { createSlice } from "@reduxjs/toolkit";

const ageRange = createSlice({
  name: "ageRange",
  initialState: {
    leftValue: 0,
    rightValue: 100,
  },
  reducers: {
    setLeftValue: (state, action) => {
      state.leftValue = action.payload;
    },
    setRightValue: (state, action) => {
      state.rightValue = action.payload;
    },
  },
});

export default ageRange.reducer;
export const { setLeftValue, setRightValue } = ageRange.actions;
