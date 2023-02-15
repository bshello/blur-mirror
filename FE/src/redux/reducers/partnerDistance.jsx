import { createSlice } from "@reduxjs/toolkit";

const partnerDistance = createSlice({
  name: "ageRange",
  initialState: {
    distance: 100,
  },
  reducers: {
    setDistance: (state, action) => {
      state.distance = action.payload;
    },
  },
});

export default partnerDistance.reducer;
export const { setDistance } = partnerDistance.actions;
