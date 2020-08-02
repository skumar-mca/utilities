import * as type from "action-types";
const initialState = {
  searchWord: {}
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SET_SEARCH_WORD: return { ...state, searchWord: action.payload };

    default:
      return state;
  }
};
export default homeReducer;
