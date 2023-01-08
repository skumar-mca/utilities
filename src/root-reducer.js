import commonReducer from 'helpers/common.reducer';
import homeReducer from 'modules/home/reducers/home.reducer';
import timezoneReducer from 'modules/timezone-monitor/reducers/timezone.reducer';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

const reducers = {
  form,
  commonReducer,
  homeReducer,
  timezoneReducer
};

export default combineReducers(reducers);
