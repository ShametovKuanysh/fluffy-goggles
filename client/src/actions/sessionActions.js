import axios from "axios";

import {
  ADD_SESSION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_SESSIONS,
  GET_SESSION,
  SESSION_LOADING,
  DELETE_SESSION,
} from "./types";

// Add Session
export const addSession = (sessionData, id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/sessions/${id}`, sessionData)
    .then((res) =>
      dispatch({
        type: ADD_SESSION,
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
export const getSessions = (id) => (dispatch) => {
  dispatch(setSessionLoading());
  axios
    .get(`/api/sessions/all/${id}`)
    .then((res) =>
      dispatch({
        type: GET_SESSIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SESSIONS,
        payload: null,
      })
    );
};

// Get Institution
export const getSession = (id) => (dispatch) => {
  dispatch(setSessionLoading());
  axios
    .get(`/api/sessions/${id}`)
    .then((res) =>
      dispatch({
        type: GET_SESSION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_SESSION,
        payload: null,
      })
    );
};

// Delete institution
export const deleteSession = (id) => (dispatch) => {
  axios
    .delete(`/api/sessions/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_SESSION,
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
export const setSessionLoading = () => {
  return {
    type: SESSION_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
