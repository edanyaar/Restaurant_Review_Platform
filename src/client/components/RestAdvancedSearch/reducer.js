import initialState from '../../initialState';
import {RestAdvancedSearchActionsConstants} from './constants.js';

const RestAdvancedSearchReducer = (state = initialState.restAdvancedSearch, action) => {
  console.log('RestAdvancedSearchReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case RestAdvancedSearchActionsConstants.UPDATE_SEARCHBY:
    {
      return state.set('searchBy',action.payload.selection);
    }
    case RestAdvancedSearchActionsConstants.UPDATE_RATING:
    {
      return state.set('rating',action.payload.selection);
    }
    case RestAdvancedSearchActionsConstants.UPDATE_SLIDER:
    {
      return state.set('slider',action.payload.selection);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default RestAdvancedSearchReducer
