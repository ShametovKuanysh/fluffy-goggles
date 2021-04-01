import {
  ADD_FILM,
  GET_FILMS,
  GET_FILM,
  DELETE_FILM,
  FILM_LOADING,
} from "../actions/types";

const initialState = {
  films: [],
  film: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FILM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_FILMS:
      return {
        ...state,
        films: action.payload,
        loading: false,
      };
    case GET_FILM:
      return {
        ...state,
        film: action.payload,
        loading: false,
      };
    case ADD_FILM:
      return {
        ...state,
        films: [action.payload, ...state.films],
      };
    case DELETE_FILM:
      return {
        ...state,
        films: state.films.filter((film) => film._id !== action.payload),
      };
    default:
      return state;
  }
}
