import BaseUrl from '../../constants/BaseURL';
import axios from 'axios';
import * as types from './types';

// Basic types
export const HOME_PENDING = 'HOME_PENDING';
export const HOME_ERROR = 'HOME_ERROR';

export const getProducts = (onSuccess1, onError1) => {
  return async (dispatch) => {
    dispatch(homeLoading());
    try {
      const res = await axios.get(
        `${BaseUrl}/products`,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      if (res) {
        dispatch(getProductsSuccess(res));
        onSuccess1(res);
      }
    } catch (err) {
      dispatch(homeError(err));
      onError1(err);
    }
  };
};

export const setReminder = (params, token, onSuccess1, onError1) => {
  return async (dispatch) => {
    dispatch(homeLoading());
    try {
      const res = await axios.post(`${BaseUrl}/reminder/store`, params, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        dispatch(setReminderSuccess(res));
        onSuccess1(res);
      }
    } catch (err) {
      dispatch(homeError(err));
      onError1(err);
    }
  };
};

export const getReminders = (token, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(homeLoading());
    try {
      const res = await axios.get(`${BaseUrl}/notifications`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (res) {
        dispatch(getRemindersSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(homeError(err));
      onError(err);
    }
  };
};

export const getGuestReminders = (onSuccess1, onError1) => {
  return async (dispatch) => {
    dispatch(homeLoading());
    try {
      const res = await axios.get(`${BaseUrl}/guest/notifications`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (res) {
        dispatch(guestRemindersSuccess(res));
        onSuccess1(res);
      }
    } catch (err) {
      dispatch(homeError(err));
      onError1(err);
    }
  };
};

export const updateProfile = (params, token, onSuccess, onError) => {
  return async (dispatch) => {
    dispatch(homeLoading());
    try {
      const res = await axios.post(
        `${BaseUrl}/profile-settings/update`,
        params,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) {
        dispatch(updateProdileSuccess(res));
        onSuccess(res);
      }
    } catch (err) {
      dispatch(homeError(err));
      onError(err);
    }
  };
};

// Helper Actions

const homeLoading = () => ({
  type: HOME_PENDING,
});

const homeError = (data) => ({
  type: HOME_ERROR,
  payload: data,
});

const getProductsSuccess = (data) => {
  return {
    type: types.GET_PRODUCTS_SUCCESS,
    payload: data,
  };
};

const setReminderSuccess = (data) => {
  return {
    type: types.SET_REMINDER_SUCCESS,
    payload: data,
  };
};

const getRemindersSuccess = (data) => {
  return {
    type: types.GET_REMINDERS_SUCCESS,
    payload: data,
  };
};

const guestRemindersSuccess = (data) => {
  return {
    type: types.GUEST_REMINDERS_SUCCESS,
    payload: data,
  };
};

const updateProdileSuccess = (data) => {
  return {
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};
