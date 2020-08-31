import initialState from '../../initialState';
import {UserProfileActionsConstants} from './constants.js';
import {List} from "immutable";


const UserProfileReducer = (state = initialState.userprofile, action) => {
  console.log('UserProfileReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
      case UserProfileActionsConstants.UPDATE_SUCCESS:
          return  state = state.set('message', action.payload.message);
      case UserProfileActionsConstants.UPDATE_FAILED:
          return  state = state.set('message', action.payload.message);
      case UserProfileActionsConstants.UPDATE_FIRSTNAME:
          return  state = state.set('firstname', action.payload.firstname);
      case UserProfileActionsConstants.UPDATE_LASTNAME:
          return state = state.set('lastname', action.payload.lastname);
      case UserProfileActionsConstants.UPDATE_PASSWORD:
          return state = state.set('password', action.payload.password);
      case UserProfileActionsConstants.UPDATE_LOCATION:
          return state = state.set("location", action.payload.location);
      case UserProfileActionsConstants.UPDATE_IMAGE:
          return state = state.set('image', action.payload.image);
      case UserProfileActionsConstants.UPDATE_USERNAME:
          return state = state.set('username', action.payload.username);
      case UserProfileActionsConstants.INIT_MESSAGE:
          return state= state.set('message', action.payload.message);
      case UserProfileActionsConstants.UPDATE_USEREXISTS:
          return  state = state.set('userexists', action.payload.message);
      case UserProfileActionsConstants.RESET_USER_REVIEWS:
      {
          state = state.set('remaining',1);
          return state.set('reviews',List());
      }
      case UserProfileActionsConstants.LOAD_USER_REVIEWS:
      {
          state = state.update('reviews',list => List(list.push(...action.payload.res.reviews)));
          if (action.payload.res.reviews.length === 0){
              state = state.set('remaining',0);
          }
          return state
      }
      case UserProfileActionsConstants.UPDATE_USERINFO:
      {
          state = state.set("id", action.payload.id);
          state = state.set("username",action.payload.username);
          state = state.set("firstname",action.payload.firstname);
          state = state.set("lastname",action.payload.lastname);
          state = state.set("password",action.payload.password);
          state = state.set("image",action.payload.image);
          return state.set("location",action.payload.location);
      }
    default: //otherwise state is lost!
      return state;
  }
};

export default UserProfileReducer;
