import * as types from '../actions/types';
import {AUTH_PENDING, AUTH_ERROR} from '../actions/auth';

const initialState = {
  isSuccess: false,
  error: false,
  isLoading: false,
  token: null,
  userData: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        token: action.payload.data.token,
        userData: action.payload.data.user,
      };
    case types.GUEST_TOKEN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        token: action.payload.data.token,
        userData: action.payload.data.data,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.SEND_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.CHANGE_PASS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};
