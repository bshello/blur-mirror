const SAVE_TOKEN = "SAVE_TOKEN";

export const saveToken = (token) => ({ type: SAVE_TOKEN, token });

const initialState = {
  token: null,
};

function saveTokenReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
}

export default saveTokenReducer;
