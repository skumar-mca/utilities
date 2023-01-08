import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TimeZoneActions from '../actions/timezone-actions';
import TimezoneMonitorComponent from '../components/timezone-component/index';
const mapStateToProps = (state) => {
  return {
    SelectedTimeZones: state.timezoneReducer.SelectedTimeZones,
    selectedTimeZonesChanged: state.timezoneReducer.selectedTimeZonesChanged
  };
};

const mapDispatchToProps = (dispatch) => ({
  setSelectedTimeZones: (list) => {
    TimeZoneActions.setSelectedTimeZones(list, dispatch);
  }
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimezoneMonitorComponent)
);
