import initialState from '../../initialState';
import {SignUpActionsConstants} from './constants.js';

const SignUpReducer = (state = initialState.signup, action) => {
  console.log('SignUpReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case SignUpActionsConstants.UPDATE_FIRSTNAME:
      return state.set('firstname', action.payload.firstname);
    case SignUpActionsConstants.UPDATE_LASTNAME:
      return state.set('lastname', action.payload.lastname);
    case SignUpActionsConstants.UPDATE_USERNAME:
      return state.set('username', action.payload.username);
    case SignUpActionsConstants.UPDATE_PASSWORD:
      return state.set('password', action.payload.password);
    case SignUpActionsConstants.UPDATE_LOCATION:
      return state.set('location', action.payload.location);
    case SignUpActionsConstants.UPDATE_USEREXISTS:
      console.log(action.payload);
      return state.set('userexists', action.payload.message);
    case SignUpActionsConstants.UPDATE_IMAGE:
      return state.set('image', action.payload.image);
    default: //otherwise state is lost!
      return state;
  }
};

export default SignUpReducer;
