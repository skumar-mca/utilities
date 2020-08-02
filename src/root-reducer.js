import commonReducer from "helpers/common.reducer";
import dictionaryReducer from "modules/dictionary/reducers/dictionary.reducer";
import homeReducer from "modules/home/reducers/home.reducer";
import timezoneReducer from "modules/timezone-monitor/reducers/timezone.reducer";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import { i18nReducer } from "redux-react-i18n";


const reducers = {
  i18nReducer,
  form,
  commonReducer,
  homeReducer,
  dictionaryReducer,
  timezoneReducer
};

export default combineReducers(reducers);
