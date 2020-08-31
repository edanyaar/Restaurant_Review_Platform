import { TopBarActionsConstants} from './constants.js';


function updateUserPhotoAction(photo) {
  return {
    type: TopBarActionsConstants.UPDATE_USERPHOTO,
    payload: {
      photo
    }
  }
}

function RequestUserPhotoAction(username) {
  return {
    type: TopBarActionsConstants.REQUEST_USERPHOTO,
    uri: '/api/user/find/photo',
    payload: {
      username
    }
  }
}

function updateAnchorElAction(el) {
  return {
    type: TopBarActionsConstants.UPDATE_ANCHOREL,
    payload: {
      el
    }
  }
}

let TopBarActions  = {
  updateUserPhotoAction,
  RequestUserPhotoAction,
  updateAnchorElAction,
};

export default TopBarActions
