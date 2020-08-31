import initialState from '../../initialState';
import {WriteReviewActionsConstants} from './constants.js';
import { List } from 'immutable'


const WriteReviewReducer = (state = initialState.app, action) => {
  console.log('WriteReviewReducerState=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case WriteReviewActionsConstants.UPDATE_BATHROOMQUALITY:
    {
      return state.set('bathroomQuality',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_STAFFKINDNESS:
    {
      return state.set('staffKindness',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_CLEANLINESS:
    {
      return state.set('cleanliness',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_DRIVETHROUGH:
    {
      return state.set('driveThroughQuality',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_DELIVERYSPEED:
    {
      return state.set('deliverySpeed',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_FOODQUALITY:
    {
      return state.set('foodQuality',action.payload.selection);
    }
    case WriteReviewActionsConstants.UPDATE_TITLE:
    {
      return state.set('title',action.payload.title);
    }
    case WriteReviewActionsConstants.UPDATE_REVIEW:
    {
      return state.set('review',action.payload.review);
    }
    case WriteReviewActionsConstants.UPDATE_REVIEWSTART:
    {
      state = state.set('review', action.payload.review);
      state = state.set('title', action.payload.title);
      state = state.set('bathroomQuality', action.payload.bathroomQuality);
      state = state.set('staffKindness', action.payload.staffKindness);
      state = state.set('cleanliness', action.payload.cleanliness);
      state = state.set('driveThroughQuality', action.payload.driveThroughQuality);
      state = state.set('deliverySpeed', action.payload.deliverySpeed);
      state = state.set('foodQuality', action.payload.foodQuality);
      return state = state.set('photos', action.payload.photos);

    }
    case WriteReviewActionsConstants.UPLOAD_PHOTOS:
    {
      if(action.payload.index === -1){//all photos were deleted
        return state.set('photos', List());
      }
      else if(action.payload.index === 0){//first photo added
        return state.set('photos', List([{photo: action.payload.photo}]));
      }
      else{//new photo was added
        return state.update('photos',e => e.push({photo: action.payload.photo}));
      }
    }
    case WriteReviewActionsConstants.SUBMISSION_SUCCESS:
    {
      return initialState.writeReview;
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default WriteReviewReducer
