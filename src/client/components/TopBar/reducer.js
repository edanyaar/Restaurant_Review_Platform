import initialState from '../../initialState';
import {TopBarActionsConstants} from './constants.js';

const TopBarReducer = (state = initialState.topBar, action) => {
  console.log('TopBarReducer=', state);
  console.log('RECEIVED ACTION:', action);
  switch (action.type){
    case TopBarActionsConstants.UPDATE_USERPHOTO:
    {
      return state.set('userPhoto',action.payload.photo);
    }
    case TopBarActionsConstants.UPDATE_ANCHOREL:
    {
      return state.set('anchorEl',action.payload.el);
    }
    default: //otherwise state is lost!
      return state;
  }
};

export default TopBarReducer
