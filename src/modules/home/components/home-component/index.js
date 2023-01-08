import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ClockImage from 'assets/images/clocks.jpg';
import React from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      searchResult: null,
      errorMsg: '',
      noRecordFound: false
    };
  }

  render() {
    const classes = {};
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <div className='home-cards'>
              <Link to={'/time-zone-monitor'} title='Time zone monitor'>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className='home-card-img'
                      image={ClockImage}
                      title='Multi zone clocks'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        Multi zone clocks
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        Display clocks of multiple geographical locations. Save
                        your favorite locations. Calculate time at different
                        timezone, etc.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size='small' color='primary'>
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </Link>
            </div>
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <div className='home-cards'>
              <a
                href='https://www.ui-geeks.in'
                target='_blank'
                rel='noopener noreferrer'
                title='UI Geeks'
              >
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='h2'>
                        UI Geeks
                      </Typography>
                      <Typography
                        variant='body2'
                        color='textSecondary'
                        component='p'
                      >
                        UI-Geeks is an online learning platform. Learn Core and
                        Advanced Concepts, Blogs, Summary of JavaScript, React,
                        Angular, SCSS, CSS.
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size='small' color='primary'>
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </a>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default HomeComponent;
