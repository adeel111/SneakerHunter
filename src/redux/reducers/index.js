import {combineReducers} from 'redux';

// import all reducers
import {authReducer} from './auth';
import {homeReducer} from './home';

export default combineReducers({
  auth: authReducer,
  home: homeReducer,
});
