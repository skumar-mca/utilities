import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state) => {
  return {
    loading: state.commonReducer.loading
  };
};

export default connect(mapStateToProps, null)(App);
