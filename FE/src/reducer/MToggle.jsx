// 모듈

const MTOGGLE = "mToggle";
export const toggleCntFunc = (togg) => ({ type: MTOGGLE, togg });

const initState = {
  togg: false,
};
const MToggle = (state = initState, action) => {
  switch (action.type) {
    case MTOGGLE:
      return {
        // 불변성 유지
        ...state,
        togg: !state.togg,
      };
    default:
      return state;
  }
};

export default MToggle;
