import initialState from '../../initialState';
import {AutocompleteRestaurantsActionsConstants} from './constants.js';
import { List } from 'immutable'

const AutocompleteRestaurantsReducer = (state = initialState.autocompleteRestaurants, action) => {
  console.log('AutocompleteRestaurantsReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case AutocompleteRestaurantsActionsConstants.UPDATE_INPUTVALUE:
    {
      return state.set('inputValue',action.payload.input);
    }
    case AutocompleteRestaurantsActionsConstants.UPDATE_OPTIONS:
    {
      return state.set('options',List(action.payload.opts));
    }
    case AutocompleteRestaurantsActionsConstants.UPDATE_LOADED: {
      return state.set('loaded', action.payload.loaded);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default AutocompleteRestaurantsReducer
