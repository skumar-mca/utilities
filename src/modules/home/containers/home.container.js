import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HomeComponent from '../components/home-component/index';

export default withRouter(connect(null, null)(HomeComponent));
