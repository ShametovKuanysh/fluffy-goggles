import isEmpty from "../validation/is-empty";

import { SET_CURRENT_COMPANY } from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_COMPANY:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        company: action.payload,
      };
    default:
      return state;
  }
}
