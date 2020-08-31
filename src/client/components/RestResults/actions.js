import { RestResultsActionsConstants} from './constants.js';


function loadResults(results) {
  return {
    type: RestResultsActionsConstants.LOAD_REST_RESULTS,
    payload: {
      results
    }
  }
}

function updateAlertAction(alert) {
  return {
    type: RestResultsActionsConstants.UPDATE_ALERT,
    payload: {
      alert
    }
  }
}

function resetRestaurantsAction() {
  return {
    type: RestResultsActionsConstants.RESET_RESTAURANTS,
  }
}

function updateMoreReqAction(req) {
  return {
    type: RestResultsActionsConstants.UPDATE_MOREREQ,
    payload: {
      req
    }
  }
}

function updateNoResultsAction(val) {
  return {
    type: RestResultsActionsConstants.UPDATE_NORESULTS,
    payload: {
      val
    }
  }
}

let RestResultsActions  = {
  loadResults,
  updateAlertAction,
  resetRestaurantsAction,
  updateMoreReqAction,
  updateNoResultsAction
};

export default RestResultsActions
