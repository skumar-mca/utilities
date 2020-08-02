import * as types from '../../../action-types';

const newSearchWordAdded = (dispatch) => {
  dispatch({ type: types.NEW_SEARCH_ADDED })
}

export default {
  newSearchWordAdded
};
