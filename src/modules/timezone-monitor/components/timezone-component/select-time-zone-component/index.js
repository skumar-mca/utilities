import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import * as lodash from 'lodash';
import * as momentTz from 'moment-timezone';
import React from 'react';

class SelectTimeZoneComponent extends React.Component {
  intervalTimer = null;
  constructor(props) {
    super(props);
    this.state = {
      filteredTimeZones: [],
      timezoneNames: momentTz.tz.names(),
      addedTimeZones: []
    };
  }

  componentDidMount() {
    this.fillPreSelectTimeZones();
  }

  fillPreSelectTimeZones = () => {
    const addedTimeZones = lodash.get(this.props, 'SelectedTimeZones', []);
    this.setState({ addedTimeZones: addedTimeZones });
  };

  handleAddWatches = () => {
    const { addedTimeZones } = this.state;
    this.props.setSelectedTimeZones(addedTimeZones);
    this.props.handleAddWatches(1);
  };

  handleAddWatchesCancel = () => {
    this.props.handleAddWatches(0);
  };

  handleSearchTimeZone = (evt) => {
    let { value } = evt.target;
    value = (value || '').toLowerCase();

    if (!value) {
      this.setState({ filteredTimeZones: [] });
      return;
    }

    this.doSearch(value);
  };

  doSearch = lodash.debounce((value) => {
    const { timezoneNames } = this.state;
    const filteredZones = lodash.filter(
      timezoneNames,
      (itm) => (itm || '').toLowerCase().indexOf(value) > -1
    );
    this.setState({ filteredTimeZones: filteredZones });
  }, 500);

  handleToggle = (value) => {
    const { addedTimeZones } = this.state;
    const currentIndex = addedTimeZones.indexOf(value);
    const newaddedTimeZones = [...addedTimeZones];

    if (currentIndex === -1) {
      newaddedTimeZones.push(value);
    } else {
      newaddedTimeZones.splice(currentIndex, 1);
    }

    this.setState({ addedTimeZones: newaddedTimeZones });
  };

  render() {
    const { addedTimeZones, filteredTimeZones } = this.state;
    return (
      <>
        <Dialog
          fullScreen
          disableBackdropClick
          disableEscapeKeyDown
          open={true}
          onClose={this.handleAddWatchesCancel}
        >
          <DialogTitle>Choose your timezone(s)</DialogTitle>

          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  id='outlined-helperText'
                  label='Search timezone'
                  defaultValue=''
                  onKeyUp={this.handleSearchTimeZone}
                  helperText="Start typing name of time zone and we'll display matched results"
                  variant='outlined'
                />

                <List>
                  {(filteredTimeZones || []).map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem
                        key={value}
                        role={undefined}
                        dense
                        button
                        onClick={() => {
                          this.handleToggle(value);
                        }}
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge='start'
                            checked={addedTimeZones.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <h3>Added Timezones</h3>

                <List>
                  {(addedTimeZones || []).map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem key={value} role={undefined} dense button>
                        <ListItemText id={labelId} primary={value} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge='end'
                            aria-label='delete'
                            onClick={() => {
                              this.handleToggle(value);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleAddWatchesCancel} color='primary'>
              Cancel
            </Button>
            <Button onClick={this.handleAddWatches} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default SelectTimeZoneComponent;
