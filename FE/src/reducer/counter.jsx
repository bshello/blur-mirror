// // reducer가 많아지면 action상수가 중복될 수 있으니
// // 액션이름 앞에 파일 이름을 넣습니다.
// export const INCRAESE = "incraese";
// export const increaseCnt = (count) => ({ type: INCRAESE, count });
// export const DECREASE = "decrease";
// export const decreaseCnt = (count) => ({ type: DECREASE, count });

// const initState = {
//   count: 0,
// };

// // 리듀서 함수
// const counter = (state = initState, action) => {
//   switch (action.type) {
//     case INCRAESE:
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     case DECREASE:
//       return {
//         ...state,
//         count: state.count - 1,
//       };
//     default:
//       return state;
//   }
// };

// export default counter;
