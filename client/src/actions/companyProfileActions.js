import axios from "axios";

import {
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  COMPANY_PROFILE_LOADING,
  CLEAR_CURRENT_COMPANY_PROFILE,
  GET_ERRORS,
  SET_CURRENT_COMPANY,
} from "./types";

// Get current profile
export const getCurrentCompanyProfile = () => (dispatch) => {
  dispatch(setCompanyProfileLoading());
  axios
    .get("/api/companyprofiles")
    .then((res) =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: {},
      })
    );
};

// Get profile by handle
export const getCompanyProfileByHandle = (handle) => (dispatch) => {
  dispatch(setCompanyProfileLoading());
  axios
    .get(`/api/companyprofiles/handle/${handle}`)
    .then((res) =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COMPANY_PROFILE,
        payload: null,
      })
    );
};

// Create Profile
export const createCompanyProfile = (companyprofileData, history) => (
  dispatch
) => {
  axios
    .post("/api/companyprofiles", companyprofileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get all companyprofiles
export const getCompanyProfiles = () => (dispatch) => {
  dispatch(setCompanyProfileLoading());
  axios
    .get("/api/companyprofiles/all")
    .then((res) =>
      dispatch({
        type: GET_COMPANY_PROFILES,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_COMPANY_PROFILES,
        payload: null,
      })
    );
};

//delete account
export const deleteAccount = () => (dispatch) => {
  if (window.confirm("Are you sure?")) {
    axios
      .delete("/api/companyprofiles")
      .then((res) =>
        dispatch({
          type: SET_CURRENT_COMPANY,
          payload: {},
        })
      )
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  }
};

// Profile loading
export const setCompanyProfileLoading = () => {
  return {
    type: COMPANY_PROFILE_LOADING,
  };
};

// Clear profile
export const clearCurrentCompanyProfile = () => {
  return {
    type: CLEAR_CURRENT_COMPANY_PROFILE,
  };
};
