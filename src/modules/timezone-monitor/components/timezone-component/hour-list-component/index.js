import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { displayTimeZone } from 'helpers';
import * as lodash from 'lodash';
import moment from 'moment';
import React from 'react';
import RenderSelect from 'shared-components/Select/index';

class HourListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hour: null,
      minute: null,
      am: null,
      timezone: null,
      hourOptions: [],
      minOptions: [],
      amPMOptions: [],
      timezoneOptions: [],
      selectedTime: null,
      isValidSelection: false,
      addedTimeZones: [],
      errorMsg: ''
    };
  }

  componentDidMount() {
    this.populateMasterData();
  }

  componentDidUpdate(nextProps) {
    const prevId = this.props.selectedTimeZonesChanged;
    const nextId = nextProps.selectedTimeZonesChanged;
    if (prevId !== nextId) {
      this.populateMasterData();
    }
  }

  populateMasterData = () => {
    let hourOptions = [];
    for (let i = 0; i < 12; i++) {
      hourOptions.push({ id: i, label: i });
    }

    let minOptions = [];
    for (let i = 0; i < 60; i += 5) {
      minOptions.push({ id: i, label: i });
    }

    let amPMOptions = [];
    amPMOptions.push({ id: 'am', label: 'AM' });
    amPMOptions.push({ id: 'pm', label: 'PM' });

    let addedTimeZones = lodash.get(this.props, 'SelectedTimeZones', []);
    const timezoneOptions = (addedTimeZones || []).map((itm) => {
      return { id: itm, label: displayTimeZone(itm) };
    });

    this.setState({
      hourOptions,
      minOptions,
      amPMOptions,
      timezoneOptions,
      addedTimeZones
    });
  };

  checkValidSelection = () => {
    const { timezone, selectedTime } = this.state;
    if (!timezone || !selectedTime) {
      this.setState({ isValidSelection: false });
      return;
    }

    this.setState({ isValidSelection: true });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const { hour, minute, am } = this.state;
      if ((hour || hour === 0) && (minute || minute === 0) && am) {
        this.setState({ errorMsg: false });
      }

      if (name === 'timezone') {
        this.checkValidSelection();
      }
    });
  };

  handleSelectTime = (evt) => {
    this.setState({ errorMsg: false });
    const { hour, minute, am } = this.state;

    if (!(hour || hour === 0) || !(minute || minute === 0) || !am) {
      this.setState({ errorMsg: true });
      return;
    }

    const TODAY = new Date();
    const selectedDateTime = `${TODAY.getFullYear()}-${
      TODAY.getMonth() + 1
    }-${TODAY.getDate()} ${hour}:${minute}:00 ${am.toUpperCase()}`;

    this.setState(
      {
        open: false,
        selectedTime: selectedDateTime,
        selectedDateTime: moment(selectedDateTime)
      },
      () => {
        this.checkValidSelection();
      }
    );
  };

  handleCancel = () => {
    this.setState({ open: false });
  };

  handleOpenTimePopup = () => {
    this.setState({ open: true });
  };

  displaySelectedTimeInGivenTimeZone = (currentTimeZone) => {
    const { selectedTime, timezone, hour, minute, am } = this.state;
    if (!selectedTime) {
      return '';
    }

    let hour24 = am === 'pm' ? hour + 12 : hour;
    const TODAY = moment.tz(new Date(), timezone).hour(hour24).minute(minute);
    const targetZonedTime = TODAY.clone().tz(currentTimeZone);
    return targetZonedTime.format('hh:mm A');
  };

  render() {
    const {
      hourOptions,
      minOptions,
      amPMOptions,
      hour,
      minute,
      am,
      open,
      selectedDateTime,
      timezone,
      timezoneOptions,
      errorMsg,
      addedTimeZones,
      isValidSelection
    } = this.state;
    return (
      <>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={this.handleCancel}
        >
          <DialogTitle>Select Time</DialogTitle>
          <DialogContent>
            <form className='time-form'>
              <div className='time-form-select'>
                <RenderSelect
                  label='Hour*'
                  name='hour'
                  value={hour}
                  data={hourOptions}
                  onChange={this.handleChange}
                />
              </div>

              <div className='time-form-select'>
                <RenderSelect
                  label='Minute*'
                  name='minute'
                  value={minute}
                  data={minOptions}
                  onChange={this.handleChange}
                />
              </div>

              <div className='time-form-select'>
                <RenderSelect
                  label='AM/PM*'
                  name='am'
                  value={am}
                  data={amPMOptions}
                  onChange={this.handleChange}
                />
              </div>
            </form>
            {errorMsg && (
              <span className='text-error'>*Missing required Fields</span>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleSelectTime} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <div className='hour-list-accordian'>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='panel1a-content'
              id='panel1a-header'
            >
              <Typography className=''>
                What would be the time there?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Paper elevation={0}>
                <Grid container spacing={3} className='time-container'>
                  <Grid item xs={6} md={3}>
                    <div className='time-zone-select'>
                      <RenderSelect
                        label='Time Zone'
                        name='timezone'
                        value={timezone}
                        data={timezoneOptions}
                        onChange={this.handleChange}
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <div className='spn-selected-time'>
                      <Chip
                        label={
                          selectedDateTime
                            ? selectedDateTime.format('hh:mm:ss A')
                            : 'No time selected'
                        }
                        disabled
                        variant='outlined'
                      />
                    </div>
                  </Grid>

                  <Grid item xs={6} md={3}>
                    <div className='spn-selected-time'>
                      <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        onClick={this.handleOpenTimePopup}
                        startIcon={<AvTimerIcon />}
                      >
                        Change Time
                      </Button>
                    </div>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <div className='selected-time-msg'>
                      Display current time at other places, when time at{' '}
                      <b>
                        {timezone
                          ? displayTimeZone(timezone)
                          : 'Selected Timezone'}
                      </b>{' '}
                      is{' '}
                      <b>
                        {selectedDateTime
                          ? selectedDateTime.format('hh:mm:ss A')
                          : 'Selected time'}
                      </b>{' '}
                    </div>

                    {isValidSelection && (
                      <div>
                        <Grid container spacing={3}>
                          {lodash.map(addedTimeZones, (itm) => {
                            return (
                              <Grid item xs={6} md={3}>
                                <Card className=''>
                                  <CardActionArea>
                                    <CardContent>
                                      <Typography
                                        gutterBottom
                                        variant='h5'
                                        component='h2'
                                      >
                                        {this.displaySelectedTimeInGivenTimeZone(
                                          itm
                                        )}
                                      </Typography>
                                      <Typography
                                        variant='body2'
                                        color='textSecondary'
                                        component='p'
                                      >
                                        {displayTimeZone(itm)}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </div>
      </>
    );
  }
}

export default HourListComponent;
