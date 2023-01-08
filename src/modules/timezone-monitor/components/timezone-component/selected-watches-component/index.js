import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import { displayTimeZone } from 'helpers';
import CacheManager from 'helpers/cache-manager';
import { DEFAULT_TIMEZONE_LIST, SELECTED_TIMEZONE } from 'helpers/constants';
import * as lodash from 'lodash';
import * as momentTz from 'moment-timezone';
import React from 'react';
import SelectTimeZoneComponent from '../select-time-zone-component/index';

class WatchListComponent extends React.Component {
  intervalTimer = null;
  constructor(props) {
    super(props);
    this.state = {
      savedSearches: [],
      selectedWatches: [],
      showDeletePopup: false,
      selected: null
    };
  }

  componentDidMount() {
    this.displaySelectedTimes();
    this.initializeInterval();
  }

  displaySelectedTimes = () => {
    const timeZoneList = [];
    let addedTimeZones = CacheManager.getItem(SELECTED_TIMEZONE, []);
    if (addedTimeZones.length === 0) {
      addedTimeZones = DEFAULT_TIMEZONE_LIST;
    }

    lodash.map(addedTimeZones || [], (itm) => {
      timeZoneList.push({
        zone: itm,
        timeStamp: momentTz.tz(new Date(), itm).format('hh:mm:ss A'),
        timeStampDate: momentTz.tz(new Date(), itm).format('MMM, DD')
      });
    });

    this.setState({ selectedWatches: timeZoneList });
  };

  initializeInterval = () => {
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
    }
    this.intervalTimer = window.setInterval(this.displaySelectedTimes, 1000);
  };

  componentWillUnmount() {
    if (this.intervalTimer) {
      window.clearInterval(this.intervalTimer);
    }
  }

  handleOpenSetting = () => {
    this.setState({ openTimezonePopup: true });
  };

  handleAddWatches = (evt) => {
    this.setState({ openTimezonePopup: false });
  };

  render() {
    const { selectedWatches, openTimezonePopup } = this.state;
    return (
      <>
        {openTimezonePopup && (
          <SelectTimeZoneComponent
            {...this.props}
            handleAddWatches={this.handleAddWatches}
          />
        )}

        <Paper elevation={0}>
          <div className='div-header'>
            <Grid container spacing={3}>
              <Grid item xs={8} md={6}>
                <div className='header-title'>Selected Clocks</div>
              </Grid>

              <Grid item xs={4} md={6}>
                <span className='setting-icon'>
                  <IconButton
                    aria-label='delete'
                    onClick={this.handleOpenSetting}
                  >
                    <SettingsIcon />
                  </IconButton>
                </span>
              </Grid>
            </Grid>
          </div>
          <div className='div-selected-watches'>
            <Grid container spacing={3}>
              {lodash.map(selectedWatches, (itm) => {
                return (
                  <Grid item xs={6} md={2}>
                    <Card className=''>
                      <CardActionArea>
                        <CardContent>
                          <Typography gutterBottom variant='h6' component='h2'>
                            {itm.timeStamp}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            {displayTimeZone(itm.zone)}
                            <span className='pull-right'>
                              {' '}
                              <Chip
                                label={itm.timeStampDate}
                                disabled
                                size='small'
                                variant='outlined'
                              />
                            </span>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Paper>
      </>
    );
  }
}

export default WatchListComponent;
