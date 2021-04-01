import axios from "axios";

import {
  ADD_ROOM,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_ROOMS,
  GET_ROOM,
  ROOM_LOADING,
  DELETE_ROOM,
} from "./types";

// Add Room
export const addRoom = (roomData, id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/rooms/${id}`, roomData)
    .then((res) =>
      dispatch({
        type: ADD_ROOM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Institutions
export const getRooms = (id) => (dispatch) => {
  dispatch(setRoomLoading());
  axios
    .get(`/api/rooms/all/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ROOMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ROOMS,
        payload: null,
      })
    );
};

// Get Institution
export const getRoom = (id) => (dispatch) => {
  dispatch(setRoomLoading());
  axios
    .get(`/api/rooms/${id}`)
    .then((res) =>
      dispatch({
        type: GET_ROOM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ROOM,
        payload: null,
      })
    );
};

// Delete institution
export const deleteRoom = (id) => (dispatch) => {
  axios
    .delete(`/api/rooms/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_ROOM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set loading state
export const setRoomLoading = () => {
  return {
    type: ROOM_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
