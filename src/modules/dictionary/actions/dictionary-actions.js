import * as types from '../../../action-types';
import { buildURL, callAPI, Urls } from "../../../helpers/api-urls";
const searchWord = (searchTerm, cb, dispatch) => {
  const url = buildURL(Urls.SearchWord, null, { searchWord: searchTerm });
  callAPI(url, 'get', null, (resp) => {
    if (resp) {
      cb && cb(resp);
      return;
    }

    cb && cb(null);

  });
};

const getImg = (searchTerm, cb) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=6WqMHFLsRcNdxStZAeWTAKDITe7ELdLv&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en`;
  callAPI(url, 'get', null, (resp) => {
    if (resp) {
      cb && cb(resp);
      return;
    }
    cb && cb(null);
  });
};

const newSearchWordAdded = (dispatch) => {
  dispatch({ type: types.NEW_SEARCH_ADDED })
}

export default {
  searchWord,
  newSearchWordAdded,
  getImg
};
