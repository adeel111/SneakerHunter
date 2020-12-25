import * as types from '../actions/types';
import {HOME_PENDING, HOME_ERROR} from '../actions/home';

const initialState = {
  isSuccess: false,
  error: false,
  isLoading: false,
  products: null,
  reminders: null,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOME_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case HOME_ERROR:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        error: action.payload,
      };
    case types.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        products: action.payload.data.data,
      };
    case types.SET_REMINDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    case types.GET_REMINDERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        reminders: action.payload.data.data,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};
