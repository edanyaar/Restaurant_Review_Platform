import initialState from '../../initialState';
import {UserResultsActionsConstants} from './constants.js';
import { List } from 'immutable'

const UserResultsReducer = (state = initialState.userResults, action) => {
  console.log('UserResultsReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case UserResultsActionsConstants.LOAD_USER_RESULTS:
    {
      return state.update('users',list => List(list.push(...action.payload.results)));
    }
    case UserResultsActionsConstants.RESET_USERRESULTS:
    {
      return state.set('users',List());
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default UserResultsReducer
