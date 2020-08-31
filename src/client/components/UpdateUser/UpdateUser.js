import React from 'react';
import './UpdateUser.scss';
import { connect } from 'react-redux';
import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import TextField from '@material-ui/core/TextField';
import {DropzoneArea} from 'material-ui-dropzone'
import Button from "@material-ui/core/Button";
import TopBar from "../TopBar/TopBar";
import UserProfileActions from "../UserProfile/actions";
import Popover from '@material-ui/core/Popover';
import {withCookies} from "react-cookie";
import AutocompelteUser from "../UserAutoComplete/AutocompelteUser";


class UpdateUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      error: "",
      filled: false,
      pop_open: false,
      anchorEl: null,
    }
  };

   handleUpdatePassOpen = event => {
    this.setState({pop_open: true,
    anchorEl: event.currentTarget});
  };
  handleUpdatePassClose = event => {
    this.setState({pop_open: false,
      anchorEl: null});
    this.props.updatePasswordAction("");
  };

  handleRePassword = (event) => {
    if (event.target.value != this.props.password) {
      console.log(event.target.value,this.props.password)
      this.setState({ error: 'Not match' });
    }
    else {
      this.setState({error: '',
      filled: true});
    }
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.message !== prevProps.message) {
        this.props.cookies.set('username',this.props.username);
        this.props.history.push('/userprofile/'+ this.props.username);

    }
  }

    render() {
      const { cookies } = this.props;

    return (
        <div className="updateUser">
          <Popover
              open={this.state.pop_open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
          >
            <div className="updateUser-fieldspassword">
              <div className="updateUser-password">
              <TextField id="password" type="password"
                         label="Password"/>
              </div>
              <div className="updateUser-password">
              <TextField id="repassword"
                         type="password"
                         label="Retype password"
                         error ={this.state.error.length === 0 ? false : true }
                         helperText= {this.state.error}
                         onChange={this.handleRePassword.bind(this)}
              />
              </div>
              <button  variant="contained" color="primary" onClick={this.handleUpdatePassClose.bind(this)}>
                cancel</button>
              <button  disabled={this.state.error.length > 0 || !this.state.filled} variant="contained" color="primary" onClick={(event =>
                  this.handleUpdatePassClose(event))}>
                Update</button>

            </div>
          </Popover>
          <ThemeProvider theme={theme}>
            <TopBar/>

            <div className="updateUser-details">
              <form id="form1" onSubmit={event => {
                event.preventDefault();
                this.props.UpdateUserAction(
                (this.props.password === "" ?
                    {
                      id: this.props.id,
                      firstname: this.props.firstname,
                      lastname: this.props.lastname,
                      username: this.props.username,
                      location: this.props.location,
                      image: this.props.image,
                    } : {
                      id: this.props.id,
                      firstname: this.props.firstname,
                      lastname: this.props.lastname,
                      username: this.props.username,
                      password: this.props.password,
                      location: this.props.location,
                      image: this.props.image}));
              }} noValidate autoComplete="off">
                <div className="updateUser-buttons">
                <Button variant="contained" color="primary" onClick={this.handleUpdatePassOpen.bind(this)}>
                  Update Password
                </Button>

                  <Button variant="contained" color="primary"
                          type = 'submit'
                          form ="form1">
                    Update
                  </Button>
                </div>

                <div className="updateUser-fields">
                  <TextField id="firstname"
                             label="First name"
                             defaultValue={this.props.firstname}
                             onChange={(event => this.props.updateFirstNameAction(event.target.value))} />
                  <div className="updateUser-fields">
                    <TextField id="lastname"
                               label="Last name"
                               defaultValue={this.props.lastname}
                               onChange={(event => this.props.updateLastNameAction(event.target.value))} />
                  </div>
                <div className="updateUser-fields">
                  <TextField id="username"
                             label="Username"
                             defaultValue={this.props.username}
                             onChange={(event =>
                             { (event.target.value !== cookies.get('username') && event.target.value !== "" ?
                                 this.props.ifUsernameExistsAction(event.target.value): this.props.updateUserExistsAction(""))
                             })}
                             error ={this.props.userexists === '' ? false : this.props.userexists !== 'OK' }
                             helperText= {this.props.userexists}/>

                </div>

                  <div className="updateUser-fields">
                    <AutocompelteUser/>
                  </div>
                  <div className="updateUser-image">
                    <DropzoneArea
                        filesLimit = {1}
                        maxFileSize = {3000000}
                        acceptedFiles={['image/*']}
                        onChange= {(file)=>{this.handelPhotos(file)}}
                    />
                  </div>
                </div>
              </form>

            </div>
          </ThemeProvider>
        </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    id: state['userprofile'].get('id'),
    firstname: state['userprofile'].get('firstname'),
    lastname: state['userprofile'].get('lastname'),
    username: state['userprofile'].get('username'),
    password: state['userprofile'].get('password'),
    location: state['userprofile'].get('location'),
    image: state['userprofile'].get('image'),
    message: state['userprofile'].get('message'),
    userexists: state['userprofile'].get('userexists'),
    cookies: ownProps.cookies,



  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateUserAction: (details) => {
      dispatch(UserProfileActions.UpdateUserAction(details));
    },
    updateUsernameAction: (username) => {
      dispatch(UserProfileActions.updateUsernameAction(username))
    },
    updatePasswordAction: (password) => {
      dispatch(UserProfileActions.updatePasswordAction(password))
    },
    updateFirstNameAction: (firstname) => {
      dispatch(UserProfileActions.updateFirstNameAction(firstname))
    },
    updateLastNameAction: (lastname) => {
      dispatch(UserProfileActions.updateLastNameAction(lastname))
    },
    updateLocationAction: (location) => {
      dispatch(UserProfileActions.updateLocationAction(location))
    },
    updateImageAction: (image) => {
      dispatch(UserProfileActions.updateImageAction(image))
    },
    ifUsernameExistsAction: (username) => {
      dispatch(UserProfileActions.ifUsernameExistsAction(username))
    },
    updateUserExistsAction: (message) => {
      dispatch(UserProfileActions.updateUserExistsAction(message))
    },


  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UpdateUser));
