import {
  ADD_ROOM,
  GET_ROOMS,
  GET_ROOM,
  DELETE_ROOM,
  ROOM_LOADING,
} from "../actions/types";

const initialState = {
  rooms: [],
  room: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ROOM_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    case GET_ROOM:
      return {
        ...state,
        room: action.payload,
        loading: false,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [action.payload, ...state.rooms],
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload),
      };
    default:
      return state;
  }
}
