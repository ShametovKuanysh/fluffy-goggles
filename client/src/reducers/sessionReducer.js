import {
  ADD_SESSION,
  GET_SESSIONS,
  GET_SESSION,
  DELETE_SESSION,
  SESSION_LOADING,
} from "../actions/types";

const initialState = {
  sessions: [],
  session: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SESSION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_SESSIONS:
      return {
        ...state,
        sessions: action.payload,
        loading: false,
      };
    case GET_SESSION:
      return {
        ...state,
        session: action.payload,
        loading: false,
      };
    case ADD_SESSION:
      return {
        ...state,
        sessions: [action.payload, ...state.sessions],
      };
    case DELETE_SESSION:
      return {
        ...state,
        sessions: state.sessions.filter(
          (session) => session._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
