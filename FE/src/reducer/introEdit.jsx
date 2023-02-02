// reducer 부분은 createSlice만 있으면 된다.
import { createSlice } from "@reduxjs/toolkit";

const introEdit = createSlice({
  name: "introEdit",
  initialState: { value: "" },
  reducers: {
    introduce: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default introEdit;
export const { introedit } = introEdit.actions;
