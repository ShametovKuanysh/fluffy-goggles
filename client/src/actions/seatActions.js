import axios from "axios";

import {
  ADD_SEAT,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SEATS,
  GET_SEAT,
  SEAT_LOADING,
  DELETE_SEAT,
} from "./types";

// Add Seat
export const addSeat = (seatData, id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/seats/${id}`, seatData)
    .then((res) =>
      dispatch({
        type: ADD_SEAT,
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
export const getSeats = (id) => (dispatch) => {
  dispatch(setSeatLoading());
  axios
    .get(`/api/seats/all/${id}`)
    .then((res) =>
      dispatch({
        type: GET_SEATS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SEATS,
        payload: null,
      })
    );
};

// Get Institution
export const getSeat = (id) => (dispatch) => {
  dispatch(setSeatLoading());
  axios
    .get(`/api/seats/${id}`)
    .then((res) =>
      dispatch({
        type: GET_SEAT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SEAT,
        payload: null,
      })
    );
};

// Delete institution
export const deleteSeat = (id) => (dispatch) => {
  axios
    .delete(`/api/seats/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_SEAT,
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
export const setSeatLoading = () => {
  return {
    type: SEAT_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
