import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import DictionaryActions from "../actions/dictionary-actions";
import DictionaryComponent from "../components/dictionary-component/index";
const mapStateToProps = state => {
  return {
    searchWord: state.dictionaryReducer.searchWord,
    newSearchAdded: state.dictionaryReducer.newSearchAdded
  };
};

const mapDispatchToProps = dispatch => ({
  searchWord: (searchWord, cb) => {
    DictionaryActions.searchWord(searchWord, cb, dispatch);
  },
  newSearchWordAdded: () => {
    DictionaryActions.newSearchWordAdded(dispatch);
  },
  getImg: (searchWord, cb) => {
    DictionaryActions.getImg(searchWord, cb)
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DictionaryComponent));
