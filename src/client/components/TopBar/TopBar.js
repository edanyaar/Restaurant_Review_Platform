import React from 'react';
import './TopBar.scss';
import { connect } from 'react-redux';
import TopBarActions from './actions';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from '@material-ui/icons/Home';
import Button from "@material-ui/core/Button";
import { withCookies } from 'react-cookie'

import PersonIcon from '@material-ui/icons/Person';

import { Link as RouterLink } from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



class TopBar extends React.Component {

    componentDidMount() {
        if(this.props.username !== undefined){
            this.props.RequestUserPhotoAction(this.props.username);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.username !== prevProps.username){
            this.props.RequestUserPhotoAction(this.props.username);
        }
    }

  render() {
      return (
      <ThemeProvider theme={theme}>
          <div className="topBar-appBar">
              <AppBar position="static">
                  <Toolbar>
                      <div className="topBar-home">
                          <IconButton edge="start"  color="inherit" aria-label="menu" component={RouterLink} to="/">
                              <HomeIcon />
                          </IconButton>
                      </div>
                      <div className="topBar-login">
                          {this.props.username === undefined ?
                              (<Button color="inherit" startIcon={<PersonIcon />} component={RouterLink} to="/login">
                                      Login
                                  </Button>
                              ) :
                              (<div>
                                  <Button aria-controls="topbar-user-menu" aria-haspopup="true"
                                          onClick={event => {this.props.updateAnchorElAction(event.currentTarget);}}
                                          startIcon={<Avatar alt={"userphoto"} src={this.props.userPhoto} />}>
                                      {this.props.username}
                                  </Button>
                                  <Menu
                                      id="topbar-user-menu"
                                      anchorEl={this.props.anchorEl}
                                      keepMounted
                                      open={Boolean(this.props.anchorEl)}
                                      onClose={() => this.props.updateAnchorElAction(null)}
                                  >
                                      <MenuItem onClick={() => this.props.updateAnchorElAction(null)} component={RouterLink}
                                                to={"/userprofile/" + this.props.username}>
                                          Profile
                                      </MenuItem>
                                      <MenuItem onClick={() => {
                                          this.props.cookies.remove("username");
                                          this.props.updateAnchorElAction(null);
                                      }}
                                                component={RouterLink} to="/">
                                          Logout
                                      </MenuItem>
                                  </Menu>
                              </div>
                              )
                          }
                      </div>
                  </Toolbar>
              </AppBar>
          </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state,props) => {
  return {
      cookies: props.cookies,
      username: props.cookies.get('username'),
      userPhoto: state['topBar'].get('userPhoto'),
      anchorEl: state['topBar'].get('anchorEl'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      RequestUserPhotoAction: (username) => {
          dispatch(TopBarActions.RequestUserPhotoAction(username));
      },
      updateAnchorElAction: (el) => {
          dispatch(TopBarActions.updateAnchorElAction(el));
      },
  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(TopBar));

