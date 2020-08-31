import { UserResultsActionsConstants} from './constants.js';


function loadResults(results) {
  return {
    type: UserResultsActionsConstants.LOAD_USER_RESULTS,
    payload: {
      results
    }
  }
}

function updateAlertAction(alert) {
  return {
    type: UserResultsActionsConstants.UPDATE_ALERT,
    payload: {
      alert
    }
  }
}

function resetUserResultsAction() {
  return {
    type: UserResultsActionsConstants.RESET_USERRESULTS,
  }
}



function searchAction(params) {
  return {
    type: UserResultsActionsConstants.SEARCH_USERS,
    uri: "/api/user/search",
    payload: {
      params
    }
  }
}

let UserResultsActions  = {
  loadResults,
  updateAlertAction,
  searchAction,
  resetUserResultsAction,
};

export default UserResultsActions
