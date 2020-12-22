import BaseUrl from '../base_url';
import axios from 'axios';
import * as types from './types';

// Basic types
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_ERROR = 'AUTH_ERROR';

// User can be Parent, Provider
export const userLogin = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/login`, params);
      if (res) {
        dispatch(userLoginSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

// Helper Actions

const authLoading = () => ({
  type: AUTH_PENDING,
});

const authError = (data) => ({
  type: AUTH_ERROR,
  payload: data,
});

const userLoginSuccess = (data) => {
  return {
    type: types.USER_LOGIN_SUCCESS,
    payload: data,
  };
};
