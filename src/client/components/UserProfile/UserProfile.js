import React from 'react';
import './UserProfile.scss';
import { connect } from 'react-redux';
import UserProfileActions from './actions';
import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Button from "@material-ui/core/Button";
import TopBar from "../TopBar/TopBar";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { withCookies } from 'react-cookie';
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import {toUpper} from "ramda";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Link as RouterLink} from "react-router-dom";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import Box from "@material-ui/core/Box";
import { CardHeader } from "@material-ui/core";
import Review from "../Review/Review";

class UserProfile extends React.Component {
  UpperName = first => {
    return toUpper(first).slice(0, 1) + first.substr(1);
  };

  isCurrentUser = cookies => {
    return this.props.username === cookies.get("username");
  };

  constructor(props) {
    super(props);
      this.props.getUserInfo(this.props.username);
      this.props.getReviews({username: this.props.username, skip: this.props.skip})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.skip === 0 && prevProps.skip !== 0){
      this.props.getReviews({username: this.props.username, skip: this.props.skip})
    }
  }

  componentWillUnmount() {
    this.props.resetReviewsAction();
  }



  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.props.initMessageAction("");
  };

  render() {
    const { cookies } = this.props;
    console.log("skip= ",this.props.skip);
    return (
      <div className="userprofile">
        <ThemeProvider theme={theme}>
          <TopBar />
          <Snackbar
            open={this.props.message === "Success"}
            autoHideDuration={2000}
            onClose={(event, reason) => {
              this.handleClose(event, reason);
            }}
          >
            <SnackbarContent
              style={{
                backgroundColor: "grey"
              }}
              message={"Update succeed"}
            />
          </Snackbar>
          <Snackbar
            open={this.props.message === "Failed"}
            autoHideDuration={2000}
            onClose={(event, reason) => {
              this.handleClose(event, reason);
            }}
          >
            <SnackbarContent
              style={{
                backgroundColor: "red"
              }}
              message={"Can not update the user"}
            />
          </Snackbar>
          <div className="UserProfile-details">
            <form noValidate autoComplete="off">
              <Card className="UserProfile-card" style={{ boxShadow:'1px 2px 4px rgba(0, 0, 0, .5)' }}>
                <CardContent className={"UserProfile-cardContent"}  >
                  <Grid container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Avatar
                      className={"UserProfile-avatar"}
                      alt="Remy Sharp"
                      src={this.props.image}
                    />
                  </Grid>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography
                      className={"MuiTypography--heading"}
                      variant={"h2"}
                      gutterBottom
                    >
                      {toUpper(this.props.username)}
                    </Typography>
                  </Grid>
                  <TableContainer component={Paper}
                                  style={{boxShadow:'1px 2px 4px rgba(0, 0, 0, .5)' }}
                  >
                    <Table
                      className={"UserProfile-table"}
                      aria-label="simple table"
                    >
                      <TableHead>
                        <TableRow >
                          <TableCell align="center" style={{ backgroundColor:'rgb(248,248,248)'}} >
                            <Typography className={"UserProfile-title2"}>
                              {" "}
                              Details about me
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell align="left"
                                     style={{ backgroundColor:'rgb(248,248,248)',
                                       boxShadow:'1px 2px 4px rgba(0, 0, 0, .5)' }}>
                            <CardHeader

                              title={
                                this.UpperName(this.props.firstname) +
                                " " +
                                this.UpperName(this.props.lastname)
                              }
                              subheader="name"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left"  style={{backgroundColor:'rgba(248,248,248)',boxShadow:'1px 2px 4px rgba(0, 0, 0, .5)' }}>
                            <CardHeader

                              title={this.props.location}
                              subheader="location"
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
                <CardActionArea>
                  <CardActions>
                    {this.isCurrentUser(cookies) ? (
                      <Button
                        size="small"
                        color="primary"
                        component={RouterLink}
                        to="/update"
                      >
                        Update Profile
                      </Button>
                    ) : null}
                  </CardActions>
                </CardActionArea>
              </Card>
              <Box
                  className="UserProfile-reviews"
                  display="block"
                  flexDirection="row"
              >
                {this.props.skip > 0 ?
                  this.props.reviews.map((r, idx) => {
                  return <Review key={"review-" + r.id + idx} id={idx} cookies={this.props.cookies} parent="userprofile"/>;
                }) : null}
                {this.props.skip > 0 && this.props.skip % 5 === 0?
                    <Button variant="contained" color="primary" className="userprofile-loadMore"
                            onClick={(e) =>{ e.preventDefault();
                              this.props.getReviews({username: this.props.username, skip: this.props.skip});
                            }}>
                      Load more results
                    </Button>
                    : null
                }
              </Box>
            </form>
          </div>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    id:state['userprofile'].get('id'),
    firstname: state['userprofile'].get('firstname'),
    lastname: state['userprofile'].get('lastname'),
    username: ownProps.match.params.username,
    password: state['userprofile'].get('password'),
    location: state['userprofile'].get('location'),
    image: state['userprofile'].get('image'),
    reviews: state['userprofile'].get('reviews'),
    message: state['userprofile'].get('message'),
    skip: state['userprofile'].get('reviews').size,
    remaining: state['userprofile'].get('remaining'),
    cookies: ownProps.cookies,


  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (user) => {
      dispatch(UserProfileActions.updateUserInfo(user));
    },
    getUserInfo: (user) => {
      dispatch(UserProfileActions.getUserInfo(user));
    },
    initMessageAction: (message) => {
      dispatch(UserProfileActions.initMessageAction(message))
    },
    getReviews: (details) => {
      dispatch(UserProfileActions.getReviews(details))
    },
    resetReviewsAction: () => {
      dispatch(UserProfileActions.resetReviewsAction())
    },

  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
