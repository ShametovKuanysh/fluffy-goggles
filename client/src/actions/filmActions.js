import axios from "axios";

import {
  ADD_FILM,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_FILMS,
  GET_FILM,
  FILM_LOADING,
  DELETE_FILM,
} from "./types";

// Add Film
export const addFilm = (filmData, id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/films/${id}`, filmData)
    .then((res) =>
      dispatch({
        type: ADD_FILM,
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
export const getFilms = (id) => (dispatch) => {
  dispatch(setFilmLoading());
  axios
    .get(`/api/films/all/${id}`)
    .then((res) =>
      dispatch({
        type: GET_FILMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FILMS,
        payload: null,
      })
    );
};

// Get Institution
export const getFilm = (id) => (dispatch) => {
  dispatch(setFilmLoading());
  axios
    .get(`/api/films/${id}`)
    .then((res) =>
      dispatch({
        type: GET_FILM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_FILM,
        payload: null,
      })
    );
};

// Delete institution
export const deleteFilm = (id) => (dispatch) => {
  axios
    .delete(`/api/films/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_FILM,
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
export const setFilmLoading = () => {
  return {
    type: FILM_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
