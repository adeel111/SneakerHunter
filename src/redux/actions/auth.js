import BaseUrl from '../../constants/BaseURL';
import axios from 'axios';
import * as types from './types';

// Basic types
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_ERROR = 'AUTH_ERROR';

export const login = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/login`, params);
      if (res) {
        dispatch(loginSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

export const saveGuestToken = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/guest/firebase-token`, params);
      if (res) {
        dispatch(guestTokenSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

export const register = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/register`, params);
      if (res) {
        dispatch(registerSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

export const logout = (token, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(
        `${BaseUrl}/logout`,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) {
        dispatch(logoutSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

export const sendEmail = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/forget-password`, params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        dispatch(sendEmailSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(authError(err));
      onError(err);
    }
  };
};

export const changePass = (params, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(authLoading());
    try {
      const res = await axios.post(`${BaseUrl}/reset-password`, params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        dispatch(changePassSuccess(res));
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

const loginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

const guestTokenSuccess = (data) => {
  return {
    type: types.GUEST_TOKEN_SUCCESS,
    payload: data,
  };
};

const registerSuccess = (data) => {
  return {
    type: types.REGISTER_SUCCESS,
    payload: data,
  };
};

const logoutSuccess = (data) => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: data,
  };
};

const sendEmailSuccess = (data) => {
  return {
    type: types.SEND_EMAIL_SUCCESS,
    payload: data,
  };
};

const changePassSuccess = (data) => {
  return {
    type: types.CHANGE_PASS_SUCCESS,
    payload: data,
  };
};
