import {
  ADD_SEAT,
  GET_SEATS,
  GET_SEAT,
  DELETE_SEAT,
  SEAT_LOADING,
} from "../actions/types";

const initialState = {
  seats: [],
  seat: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEAT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SEATS:
      return {
        ...state,
        seats: action.payload,
        loading: false,
      };
    case GET_SEAT:
      return {
        ...state,
        seat: action.payload,
        loading: false,
      };
    case ADD_SEAT:
      return {
        ...state,
        seats: [action.payload, ...state.seats],
      };
    case DELETE_SEAT:
      return {
        ...state,
        seats: state.seats.filter((seat) => seat._id !== action.payload),
      };
    default:
      return state;
  }
}
