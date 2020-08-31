import initialState from '../../initialState';
import {RestResultsActionsConstants} from './constants.js';
import { List } from 'immutable'

const RestResultsReducer = (state = initialState.restResults, action) => {
  console.log('RestResultsReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case RestResultsActionsConstants.LOAD_REST_RESULTS:
    {
      if (action.payload.results.length === 0){
        state = state.set('remaining',0);
        state = state.set('noResults',true);
      }
      else{
        state = state.set('noResults',false);
      }
      return state.update('restaurants',list => List(list.push(...action.payload.results)));
    }
    case RestResultsActionsConstants.UPDATE_ALERT:
    {
      return state.set('alertOpen',action.payload.alert);
    }
    case RestResultsActionsConstants.RESET_RESTAURANTS:
    {
      state = state.set('remaining',1);
      state = state.set('noResults',false);
      return state.set('restaurants',List());
    }
    case RestResultsActionsConstants.UPDATE_MOREREQ:
    {
      return state.set('moreReq',true);
    }
    case RestResultsActionsConstants.UPDATE_NORESULTS:
    {
      return state.set('noResults',action.payload.val);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default RestResultsReducer
