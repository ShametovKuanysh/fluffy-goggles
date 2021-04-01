import axios from "axios";

import {
  ADD_MEAL,
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_MEALS,
  GET_MEAL,
  MEAL_LOADING,
  DELETE_MEAL,
} from "./types";

// Add Meal
export const addMeal = (mealData, id) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/meals/${id}`, mealData)
    .then((res) =>
      dispatch({
        type: ADD_MEAL,
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
export const getMeals = (id) => (dispatch) => {
  dispatch(setMealLoading());
  axios
    .get(`/api/meals/all/${id}`)
    .then((res) =>
      dispatch({
        type: GET_MEALS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MEALS,
        payload: null,
      })
    );
};

// Get Institution
export const getMeal = (id) => (dispatch) => {
  dispatch(setMealLoading());
  axios
    .get(`/api/meals/${id}`)
    .then((res) =>
      dispatch({
        type: GET_MEAL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_MEAL,
        payload: null,
      })
    );
};

// Delete institution
export const deleteMeal = (id) => (dispatch) => {
  axios
    .delete(`/api/meals/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_MEAL,
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
export const setMealLoading = () => {
  return {
    type: MEAL_LOADING,
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
