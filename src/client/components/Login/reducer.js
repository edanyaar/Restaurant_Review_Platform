import initialState from '../../initialState';
import {LoginActionsConstants} from './constants.js';

const LoginReducer = (state = initialState.login, action) => {
  console.log('LoginReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case LoginActionsConstants.UPDATE_USERNAME:
      return state.set('username', action.payload.username);
    case LoginActionsConstants.UPDATE_PASSWORD:
      return state.set('password', action.payload.password);
    case LoginActionsConstants.LOGIN_FAILED_ACTION:
      return state.set('error', action.payload.message);
    case LoginActionsConstants.LOGIN_SUCCESS_ACTION:
        return state.set('error', action.payload.message);
    case  LoginActionsConstants.INIT_ERROR_ACTION:
      return state.set('error', action.payload.error);
    default: //otherwise state is lost!
      return state;
  }
};

export default LoginReducer
