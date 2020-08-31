import initialState from '../../initialState';
import {AutocompleteUserActionsConstants} from './constants.js';
import { List } from 'immutable'

const AutocompleteUserReducer = (state = initialState.autocompleteUser, action) => {
  console.log('AutocompleteUserReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case AutocompleteUserActionsConstants.UPDATE_USER_INPUTVALUE:
    {
      return state.set('inputValue',action.payload.input);
    }
    case AutocompleteUserActionsConstants.UPDATE_USER_OPTIONS:
    {
      return state.set('options',List(action.payload.opts));
    }
    case AutocompleteUserActionsConstants.UPDATE_USER_LOADED: {
      return state.set('loaded', action.payload.loaded);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default AutocompleteUserReducer
