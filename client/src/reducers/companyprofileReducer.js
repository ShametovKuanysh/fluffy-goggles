import {
  GET_COMPANY_PROFILE,
  GET_COMPANY_PROFILES,
  COMPANY_PROFILE_LOADING,
  CLEAR_CURRENT_COMPANY_PROFILE,
} from "../actions/types";

const initialState = {
  companyprofile: null,
  companyprofiles: null,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMPANY_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_COMPANY_PROFILE:
      return {
        ...state,
        companyprofile: action.payload,
        loading: false,
      };
    case GET_COMPANY_PROFILES:
      return {
        ...state,
        companyprofiles: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_COMPANY_PROFILE:
      return {
        ...state,
        companyprofile: null,
      };
    default:
      return state;
  }
}
