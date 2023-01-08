import * as type from 'action-types';
const initialState = {
  SelectedTimeZones: [],
  selectedTimeZonesChanged: 0
};

const timezoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SELECTED_TIMEZONES_CHANGED:
      return {
        ...state,
        SelectedTimeZones: action.payload,
        selectedTimeZonesChanged: state.selectedTimeZonesChanged + 1
      };

    default:
      return state;
  }
};
export default timezoneReducer;
