import {
  ADD_INSTITUTION,
  GET_INSTITUTIONS,
  GET_INSTITUTION,
  DELETE_INSTITUTION,
  INSTITUTION_LOADING,
} from "../actions/types";

const initialState = {
  institutions: [],
  institution: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INSTITUTION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_INSTITUTIONS:
      return {
        ...state,
        institutions: action.payload,
        loading: false,
      };
    case GET_INSTITUTION:
      return {
        ...state,
        institution: action.payload,
        loading: false,
      };
    case ADD_INSTITUTION:
      return {
        ...state,
        institutions: [action.payload, ...state.institutions],
      };
    case DELETE_INSTITUTION:
      return {
        ...state,
        institutions: state.institutions.filter(
          (institution) => institution._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
