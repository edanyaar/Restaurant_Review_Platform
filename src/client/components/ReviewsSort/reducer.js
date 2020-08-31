import initialState from '../../initialState';
import {ReviewsSortActionsConstants} from './constants.js';

const ReviewsSortReducer = (state = initialState.reviewsSort, action) => {
  console.log('ReviewsSortReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case ReviewsSortActionsConstants.UPDATE_SORTDATE:
    {
      state = state.set('sortDate',action.payload.selection);
      return state.set('reviewSortUpdated',true);
    }
    case ReviewsSortActionsConstants.UPDATE_SORTTOPIC:
    {
      state = state.set('sortTopic',action.payload.selection);
      return state.set('reviewSortUpdated',true);
    }
    case ReviewsSortActionsConstants.UPDATE_FILTERDATE:
    {
      state = state.set('filterDate',action.payload.selection);
      return state.set('reviewSortUpdated',true);
    }
    case ReviewsSortActionsConstants.UPDATE_FILTERTOPIC:
    {
      state = state.set('filterTopic',action.payload.selection);
      return state.set('reviewSortUpdated',true);
    }
    case ReviewsSortActionsConstants.REVIEWS_SORT_UPDATED:
    {
      return state.set('reviewSortUpdated',action.payload.update);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default ReviewsSortReducer
