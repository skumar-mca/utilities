import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 25
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function InfoComponent() {
  const classes = useStyles();
  return (
    <>
      <Typography variant='h4' gutterBottom>
        Tech. Stack
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  src={`https://cdn.iconscout.com/icon/free/png-128/react-3-1175109.png`}
                />
              }
              title='React Js'
              subheader='v.16.13.1'
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                React is a declarative, efficient, and flexible JavaScript
                library for building user interfaces.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  src={`https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/386/square_256/redux.png`}
                />
              }
              title='Redux'
              subheader='v.4.0.5'
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                Redux is a predictable state container for JavaScript apps.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='30'
                  height='32'
                  viewBox='0 0 36 32'
                  fill='none'
                  class='css-1170n61'
                >
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M30.343 21.976a1 1 0 00.502-.864l.018-5.787a1 1 0 01.502-.864l3.137-1.802a1 1 0 011.498.867v10.521a1 1 0 01-.502.867l-11.839 6.8a1 1 0 01-.994.001l-9.291-5.314a1 1 0 01-.504-.868v-5.305c0-.006.007-.01.013-.007.005.003.012 0 .012-.007v-.006c0-.004.002-.008.006-.01l7.652-4.396c.007-.004.004-.015-.004-.015a.008.008 0 01-.008-.008l.015-5.201a1 1 0 00-1.5-.87l-5.687 3.277a1 1 0 01-.998 0L6.666 9.7a1 1 0 00-1.499.866v9.4a1 1 0 01-1.496.869l-3.166-1.81a1 1 0 01-.504-.87l.028-16.43A1 1 0 011.527.86l10.845 6.229a1 1 0 00.996 0L24.21.86a1 1 0 011.498.868v16.434a1 1 0 01-.501.867l-5.678 3.27a1 1 0 00.004 1.735l3.132 1.783a1 1 0 00.993-.002l6.685-3.839zM31 7.234a1 1 0 001.514.857l3-1.8A1 1 0 0036 5.434V1.766A1 1 0 0034.486.91l-3 1.8a1 1 0 00-.486.857v3.668z'
                    fill='#007FFF'
                  ></path>
                </svg>
              }
              title='Material UI'
              subheader='v.4.11.0'
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                React components for faster and easier web development. Build
                your own design system, or start with Material Design.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant='h4' gutterBottom>
        Developer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.root}>
            <CardHeader
              avatar={
                <Avatar
                  src={`https://skumar-mca.github.io/profile/assets/sunil.png`}
                />
              }
              title='Sunil Kumar | UI Architect'
              subheader={
                <>
                  <a
                    href='https://www.linkedin.com/in/sunil-kumar-83146843/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href='https://skumar-mca.github.io/profile/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <AccountBoxIcon />
                  </a>
                </>
              }
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                Angular | React | Redux | Node | MongoDB | JavaScript |
                TypeScript | JSON | JQuery | SCSS | CSS
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
