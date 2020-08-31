import initialState from '../../initialState';
import {RestProfileActionsConstants} from './constants.js';
import {List} from "immutable";
import {RestResultsActionsConstants} from "../RestResults/constants";

const RestProfileReducer = (state = initialState.restaurantProfile, action) => {
  console.log('RestProfileReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case RestProfileActionsConstants.LOAD_GENERALDETAILES:
    {
      state = state.set('name',action.payload.res.name);
      state = state.set('location',action.payload.res.location);
      state = state.set('rating',action.payload.res.averageScore);
      state = state.set('geometry',action.payload.res.geometry);
      return state.set('photo',action.payload.res.photo);
    }
    case RestProfileActionsConstants.LOAD_REVIEWS:
    {
      if(action.payload.res.skip === 0){
        state = state.set('reviews',List(action.payload.res.reviews))
      }
      else{
        state = state.update('reviews',list => List(list.push(...action.payload.res.reviews)));
      }
      if (action.payload.res.reviews.length === 0){
        state = state.set('remaining',0);
      }
      return state
    }
    case RestProfileActionsConstants.UPDATE_RESTPROF_ALERT:
    {
      return state.set('alertOpen',action.payload.alert);
    }
    case RestProfileActionsConstants.RESET_REVIEWS:
    {
      state = state.set('remaining',1);
      return state.set('reviews',List());
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default RestProfileReducer
