import CacheManager from 'helpers/cache-manager';
import { SELECTED_TIMEZONE } from 'helpers/constants';
import * as types from '../../../action-types';

const setSelectedTimeZones = (list, dispatch) => {
  CacheManager.setItem(SELECTED_TIMEZONE, list);
  dispatch({ type: types.SELECTED_TIMEZONES_CHANGED, payload: list });
}

export default {
  setSelectedTimeZones
};
