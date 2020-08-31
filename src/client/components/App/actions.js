import { AppActionsConstants} from './constants.js';


function updateSearchForAction(searchValue) {
  return {
    type: AppActionsConstants.UPDATE_SEARCHFOR,
    payload: {
      searchValue
    }
  }
}

function updateSearchParamAction(selection) {
  return {
    type: AppActionsConstants.UPDATE_SEARCHPARAM,
    payload: {
      selection
    }
  }
}


function updateSearchReqAction(req) {
  return {
    type: AppActionsConstants.UPDATE_SEARCHREQ,
    payload: {
      req
    }
  }
}

function updateSearchUserNameAction(searchValue) {
  return {
    type: AppActionsConstants.UPDATE_SEARCHUSERNAME,
    payload: {
      searchValue
    }
  }
}

function updateSearchUserLocationAction(searchValue) {
  return {
    type: AppActionsConstants.UPDATE_SEARCHUSERLOCATION,
    payload: {
      searchValue
    }
  }
}

let AppActions  = {
  updateSearchForAction,
  updateSearchParamAction,
  updateSearchReqAction,
  updateSearchUserNameAction,
  updateSearchUserLocationAction
};

export default AppActions
