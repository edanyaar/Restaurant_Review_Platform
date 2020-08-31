import { SignUpActionsConstants} from './constants.js';

function registrationSuccess(message){
  return {
    type: SignUpActionsConstants.REGISTRATION_SUCCESS,
    payload: {
      message
    }
  }
}

function registrationFailed(message){
  return {
    type: SignUpActionsConstants.REGISTRATION_FAILED,
    payload: {
      message
    }
  }
}

function signUpUser(user) {
  return {
    type: SignUpActionsConstants.CREATE_USER,
    uri: '/api/user',
    payload: {
      user
    }
  }
}
function updateFirstNameAction(firstname){
  return {
    type: SignUpActionsConstants.UPDATE_FIRSTNAME,
    payload: {
      firstname
    }
  }
}

function updateLastNameAction(lastname){
  return {
    type: SignUpActionsConstants.UPDATE_LASTNAME,
    payload: {
      lastname
    }
  }
}

function ifUsernameExistsAction(username){
  return {
    type: SignUpActionsConstants.FIND_USERNAME,
    uri:  '/api/user/find',
    payload: {
      username
    }
  }
}

function updatePasswordAction(password){
  return {
    type: SignUpActionsConstants.UPDATE_PASSWORD,
    payload: {
      password
    }
  }
}

function updateUsernameAction(username){
  return {
    type: SignUpActionsConstants.UPDATE_USERNAME,
    payload: {
      username
    }
  }
}

function updateUserExistsAction(message){
  return {
    type: SignUpActionsConstants.UPDATE_USEREXISTS,
    payload: {
      message
    }
  }
}
function updateLocationAction(location){
  return {
    type: SignUpActionsConstants.UPDATE_LOCATION,
    payload: {
      location
    }
  }
}

function updateImageAction(image){
  return {
    type: SignUpActionsConstants.UPDATE_IMAGE,
    payload: {
      image
    }
  }
}

let SignUpActions  = {
  signUpUser,
  registrationSuccess,
  registrationFailed,
  updateFirstNameAction,
  updateLastNameAction,
  updatePasswordAction,
  updateUsernameAction,
  ifUsernameExistsAction,
  updateImageAction,
  updateLocationAction,
  updateUserExistsAction,
};

export default SignUpActions;
