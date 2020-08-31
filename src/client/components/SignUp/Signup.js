import React from 'react';
import './SignUp.scss';
import { connect } from 'react-redux';
import SignUpActions from './actions';
import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {DropzoneArea} from 'material-ui-dropzone'
import TopBar from "../TopBar/TopBar";
import AutocompelteUser from "../UserAutoComplete/AutocompelteUser";







class Signup extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      image: [],
      error: ""
    };
  }
  handleRePassword = (event) => {
    if (event.target.value != this.props.password) {
      this.setState({ error: 'Not match' });
    }
    else {
      this.setState({error: ''});
    }
  }

  getCoords(lat, lng){
    console.log(lat, lng);
  }

  handelPhotos = (acceptedFiles) => {
    if(acceptedFiles.length === 0){
      console.log("image upload - empty");
    }
    else{
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          this.props.updateImageAction(reader.result);
        };
        reader.readAsDataURL(file)
      })
    }
  };

  render() {
    return (
        <div className="signup">
          {/*<MuiThemeProvider muiTheme={getMuiTheme()}>*/}
          {/*  <GooglePlaceAutocomplete*/}
          {/*      // Function to return lat and lng*/}
          {/*      results={this.getCoords}*/}
          {/*  />*/}
          {/*</MuiThemeProvider>*/}
          <ThemeProvider theme={theme}>
            <TopBar/>
            <div className="signup-details">
              <form id="form1" onSubmit={event => {
                event.preventDefault();
                this.props.signUpUser({
                  firstname: this.props.firstname,
                  lastname: this.props.lastname,
                  username: this.props.username,
                  password: this.props.password,
                  image: this.props.image,
                  location: this.props.location
                 });
                this.props.history.push('/login');
              }} noValidate autoComplete="off">
                <div><h1>Sign up</h1></div>
                <div className="signup-fields">
                  <TextField id="firstname"
                             label="First name"
                             onChange={(event) =>
                             {this.props.updateFirstNameAction(event.target.value);}}/>
                </div>
                <div className="signup-fields">
                  <TextField id="lastname"
                             label="Last name"
                             onChange={(event) =>
                             {this.props.updateLastNameAction(event.target.value);}}/>
                </div>
                <div className="signup-fields">
                  <TextField id="username"
                             label="Username"
                             onChange={(event) =>
                             {if (event.target.value !==''){this.props.ifUsernameExistsAction(event.target.value);}
                             else{ this.props.updateUserExistsAction("")}}}
                             error ={this.props.userexists == '' ? false : this.props.userexists != 'OK' }
                             helperText= {this.props.userexists}/>
                </div>
                <div className="signup-fields">
                  <TextField id="password"
                             label="Password"
                             type="password"
                             onChange={(event) =>
                             {this.props.updatePasswordAction(event.target.value);}}/>
                </div>
                <div className="signup-repassword">
                  <TextField id="repassword"
                             type="password"
                             label="Retype password"
                             error ={this.state.error.length === 0 ? false : true }
                             helperText= {this.state.error}
                             onChange={this.handleRePassword.bind(this)}
                  />

                </div>
                <div className="signup-fields">
                  <AutocompelteUser/>
                </div>
              </form>
              <div className="signup-image">
                <DropzoneArea
                    filesLimit = {1}
                    maxFileSize = {3000000}
                    acceptedFiles={['image/*']}
                    onChange= {(file)=>{this.handelPhotos(file)}}
                    />
              </div>
              <div className="signup-signup">
                <Button variant = "outlined"  type = 'submit'
                        form ="form1"
                        color="inherit"
                        disabled={ !(this.props.firstname
                            && this.props.lastname
                            && this.props.username
                            && this.props.password
                            && this.props.location
                            && this.props.image
                            &&this.props.userexists === 'OK'
                            && this.state.error.length === 0 )}>
                  Sign up
                </Button>
              </div>
            </div>
          </ThemeProvider>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
      firstname: state['signup'].get('firstname'),
      lastname: state['signup'].get('lastname'),
      username: state['signup'].get('username'),
      password: state['signup'].get('password'),
      location: state['signup'].get('location'),
      image: state['signup'].get('image'),
      userexists: state['signup'].get('userexists'),

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUser: (user) => {
      dispatch(SignUpActions.signUpUser(user));
    },
    updateFirstNameAction: (firstname) => {
      dispatch(SignUpActions.updateFirstNameAction(firstname))
    },
    updateLastNameAction: (lastname) => {
      dispatch(SignUpActions.updateLastNameAction(lastname))
    },
    ifUsernameExistsAction: (username) => {
      dispatch(SignUpActions.ifUsernameExistsAction(username))
    },
    updatePasswordAction: (password) => {
      dispatch(SignUpActions.updatePasswordAction(password))
    },
    updateLocationAction: (location) => {
      dispatch(SignUpActions.updateLocationAction(location))
    },
    updateUserExistsAction: (user) => {
      dispatch(SignUpActions.updateUserExistsAction(user))
    },
    updateImageAction: (image) => {
      dispatch(SignUpActions.updateImageAction(image))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
