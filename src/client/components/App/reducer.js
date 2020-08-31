import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';

const AppReducer = (state = initialState.app, action) => {
  console.log('AppReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case AppActionsConstants.UPDATE_SEARCHFOR:
    {
      state = state.set("searchName", action.payload.searchValue.name);
      state = state.set('searchLocation', action.payload.searchValue.location);
      state = state.set('searchGeometry', action.payload.searchValue.geometry);
      return state.set('searchPhoto', action.payload.searchValue.photo);
    }
    case AppActionsConstants.UPDATE_SEARCHPARAM:
    {
      return state.set('searchBy',action.payload.selection);
    }
    case AppActionsConstants.UPDATE_SEARCHREQ:
    {
      return state.set('searchReq',action.payload.req);
    }
    case AppActionsConstants.UPDATE_SEARCHUSERNAME:
    {
      return state.set('searchUserName',action.payload.searchValue);
    }
    case AppActionsConstants.UPDATE_SEARCHUSERLOCATION:
    {
      return state.set('searchUserLocation',action.payload.searchValue);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default AppReducer
