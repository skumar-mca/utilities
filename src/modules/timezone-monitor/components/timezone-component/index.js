import CacheManager from 'helpers/cache-manager';
import { DEFAULT_TIMEZONE_LIST, SELECTED_TIMEZONE } from 'helpers/constants';
import React from "react";
import HourListComponent from './hour-list-component/index';
import WatchListComponent from './selected-watches-component/index';
class TimezoneMonitorComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResult: null,
            errorMsg: '',
            selectedWatches: [],
            noRecordFound: false,
            openTimezonePopup: false
        }
    }

    componentDidMount() {
        let addedTimeZones = CacheManager.getItem(SELECTED_TIMEZONE, []);
        if (addedTimeZones.length === 0) {
            addedTimeZones = DEFAULT_TIMEZONE_LIST;
        }

        this.props.setSelectedTimeZones(addedTimeZones);
    }

    render() {
        const { errorMsg, } = this.state;
        return (
            <>
                <WatchListComponent {...this.props} />
                <HourListComponent {...this.props} />
            </>
        );
    }
}

export default TimezoneMonitorComponent;
