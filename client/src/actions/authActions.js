import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_COMPANY } from "./types";

// Register Company
export const registerCompany = (companyData, history) => (dispatch) => {
  axios
    .post("/api/companies/register", companyData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - Get Company Token
export const loginCompany = (companyData) => (dispatch) => {
  axios
    .post("/api/companies/login", companyData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentCompany(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in Company
export const setCurrentCompany = (decoded) => {
  return {
    type: SET_CURRENT_COMPANY,
    payload: decoded,
  };
};

// Log user out
export const logoutCompany = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentCompany({}));
};
