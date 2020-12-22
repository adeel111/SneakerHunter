import {combineReducers} from 'redux';

// import all reducers
import {authReducer} from './auth';

export default combineReducers({
  auth: authReducer,
});
