// MToggle.jsx : MeetingPage에서 매칭 전/후를 나타내기 위한 toggle
import { createSlice } from "@reduxjs/toolkit";

const MToggle = createSlice({
  name: "MToggle",
  initialState: { togg: false },
  reducers: {
    MTOGGLE: (state, action) => {
      state.togg = !state.togg;
    },
  },
});

// 리듀서메서드명.reducer에 해당 리듀서가 담겨있음
export default MToggle.reducer;
export const { MTOGGLE } = MToggle.actions;
