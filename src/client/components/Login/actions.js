import { LoginActionsConstants} from './constants.js';


function loginAction(details) {
  return {
    type: LoginActionsConstants.LOGIN,
    uri: '/api/user/login',
    payload: {
      details
    }
  }
}

function updateUsernameAction(username) {
  return {
    type: LoginActionsConstants.UPDATE_USERNAME,
    payload: {
      username
    }
  }
}

function updatePasswordAction(password) {
  return {
    type: LoginActionsConstants.UPDATE_PASSWORD,
    payload: {
      password
    }
  }
}

function loginSuccess(message) {
  return {
    type: LoginActionsConstants.LOGIN_SUCCESS_ACTION,
    payload: {
      message
    }
  }
}

function loginFailed(message) {
  return {
    type: LoginActionsConstants.LOGIN_FAILED_ACTION,
    payload: {
      message
    }
  }
}
function initErrorAction(error) {
  return {
    type: LoginActionsConstants.INIT_ERROR_ACTION,
    payload: {
      error
    }
  }
}

let LoginActions  = {
  loginAction,
  updateUsernameAction,
  updatePasswordAction,
  loginSuccess,
  loginFailed,
  initErrorAction,
};

export default LoginActions
