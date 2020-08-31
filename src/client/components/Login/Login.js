import React from 'react';
import './Login.scss';
import { connect } from 'react-redux';
import LoginActions from './actions';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import TextField from '@material-ui/core/TextField';
import {Link as RouterLink, Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TopBar from "../TopBar/TopBar";
import { withCookies } from 'react-cookie'




class Login extends React.Component {

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.error !== prevProps.error) {
      if (this.props.error === "Success") {
        this.props.initErrorAction("");
        this.props.cookies.set('username', this.props.username, {path: '/'});
        this.props.history.push('/');
      }
    }
  }

    render() {
    return (
        <div className="login">
          <ThemeProvider theme={theme}>
            <TopBar/>
            <Snackbar
                open={this.props.error !== undefined && this.props.error !== "" }
                autoHideDuration={2000}>
            <SnackbarContent style={{
              backgroundColor:'red',
            }}
              message={this.props.error}
            />
            </Snackbar>
            <div className="login-usernamePassword">
              <form id="form1" onSubmit={event => {
                event.preventDefault();
                this.props.initErrorAction("");
                this.props.loginAction({
                  username: this.props.username,
                  password: this.props.password
                });
              }} noValidate autoComplete="off">
                <div id="login-box">
                  <h1>Sign in</h1>

                <div className="login-fields">

                  <TextField id="username"
                             label="Username"
                             onChange={(event => this.props.updateUsernameAction(event.target.value))}/>
                </div>
                <div className="login-fields">

                  <TextField id="password"
                             type="password"
                             label="Password"
                             onChange={(event => this.props.updatePasswordAction(event.target.value))} />
                </div>
                  <div id="buttonsBundle">
                <div className="login-loginbutton">
                  <Button variant="contained" color="primary"
                          type = 'submit'
                          form ="form1"
                          disabled={ !(this.props.username && this.props.password)}>
                    Login
                  </Button>
                </div>
                <div className="login-buttons" >
                  <Button variant="contained" color="primary" component={RouterLink} to="/sign-up" >
                    Sign up
                  </Button>
                </div>
                </div>
                </div>
              </form>
            </div>
          </ThemeProvider>
        </div>
    );
  }
}

const mapStateToProps = (state,ownProps) => {
  return {
    username: state['login'].get('username'),
    password: state['login'].get('password'),
    error: state['login'].get('error'),
    cookies: ownProps.cookies,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAction: (details) => {
      dispatch(LoginActions.loginAction(details));
    },
    updateUsernameAction: (username) => {
      dispatch(LoginActions.updateUsernameAction(username))
    },
    updatePasswordAction: (password) => {
      dispatch(LoginActions.updatePasswordAction(password))
    },
    initErrorAction: (error) => {
      dispatch(LoginActions.initErrorAction(error))
    },
  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Login));
