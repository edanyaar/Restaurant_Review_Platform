import { RestProfileActionsConstants} from './constants.js';
import {RestResultsActionsConstants} from "../RestResults/constants";


function getGeneralDetailsAction(id) {
  return {
    type: RestProfileActionsConstants.GET_GENERALDETAILES,
    uri: "/api/load/restprofilegeneral",
    payload: {
      id
    }
  }
}

function getReviewsAction(params) {
  return {
    type: RestProfileActionsConstants.GET_REVIEWS,
    uri: "/api/load/restprofilereviews",
    payload: {
      params
    }
  }
}

function loadGeneralDetailsAction(res) {
  return {
    type: RestProfileActionsConstants.LOAD_GENERALDETAILES,
    payload: {
      res
    }
  }
}

function loadReviewsAction(res) {
  return {
    type: RestProfileActionsConstants.LOAD_REVIEWS,
    payload: {
      res
    }
  }
}

function resetReviewsAction() {
  return {
    type: RestProfileActionsConstants.RESET_REVIEWS,
  }
}

function updateAlertAction(){
  return {
    type: RestProfileActionsConstants.UPDATE_RESTPROF_ALERT,
    payload: {
      alert
    }
  }
}

let RestProfileActions  = {
  getGeneralDetailsAction,
  loadGeneralDetailsAction,
  getReviewsAction,
  loadReviewsAction,
  resetReviewsAction,
  updateAlertAction
};

export default RestProfileActions
