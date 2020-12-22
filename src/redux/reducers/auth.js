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
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        token: action.payload.data.token,
        userData: action.payload.data.user,
      };
    default:
      return state;
  }
};
