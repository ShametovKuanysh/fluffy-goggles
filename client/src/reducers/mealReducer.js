import {
  ADD_MEAL,
  GET_MEALS,
  GET_MEAL,
  DELETE_MEAL,
  MEAL_LOADING,
} from "../actions/types";

const initialState = {
  meals: [],
  meal: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case MEAL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MEALS:
      return {
        ...state,
        meals: action.payload,
        loading: false,
      };
    case GET_MEAL:
      return {
        ...state,
        meal: action.payload,
        loading: false,
      };
    case ADD_MEAL:
      return {
        ...state,
        meals: [action.payload, ...state.meals],
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter((meal) => meal._id !== action.payload),
      };
    default:
      return state;
  }
}
