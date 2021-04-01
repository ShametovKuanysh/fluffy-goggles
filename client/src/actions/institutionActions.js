import axios from "axios";

import {
  ADD_INSTITUTION,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_INSTITUTIONS,
  GET_INSTITUTION,
  INSTITUTION_LOADING,
  DELETE_INSTITUTION,
} from "./types";

// Add Institution
export const addInstitution = (institutionData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post("/api/institutions", institutionData)
    .then((res) =>
      dispatch({
        type: ADD_INSTITUTION,
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
export const getInstitutions = () => (dispatch) => {
  dispatch(setInstitutionLoading());
  axios
    .get("/api/institutions")
    .then((res) =>
      dispatch({
        type: GET_INSTITUTIONS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INSTITUTIONS,
        payload: null,
      })
    );
};

// Get Institution
export const getInstitution = (id) => (dispatch) => {
  dispatch(setInstitutionLoading());
  axios
    .get(`/api/institutions/${id}`)
    .then((res) =>
      dispatch({
        type: GET_INSTITUTION,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_INSTITUTION,
        payload: null,
      })
    );
};

// Delete institution
export const deleteInstitution = (id) => (dispatch) => {
  axios
    .delete(`/api/institutions/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_INSTITUTION,
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

// Add Like
export const addLike = (id) => (dispatch) => {
  axios
    .post(`/api/institutions/like/${id}`)
    .then((res) => dispatch(getInstitutions()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Remove Like
export const removeLike = (id) => (dispatch) => {
  axios
    .post(`/api/institutions/unlike/${id}`)
    .then((res) => dispatch(getInstitutions()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Add Comment
export const addComment = (institutionId, commentData) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/institutions/comment/${institutionId}`, commentData)
    .then((res) =>
      dispatch({
        type: GET_INSTITUTION,
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

// Delete Comment
export const deleteComment = (institutionId, commentId) => (dispatch) => {
  axios
    .delete(`/api/institutions/comment/${institutionId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_INSTITUTION,
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

// Set loading state
export const setInstitutionLoading = () => {
  return {
    type: INSTITUTION_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
