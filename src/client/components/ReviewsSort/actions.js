import { ReviewsSortActionsConstants} from './constants.js';
import {RestProfileActionsConstants} from "../RestarurantProfile/constants";


function updateSortDateAction(selection) {
  return {
    type: ReviewsSortActionsConstants.UPDATE_SORTDATE,
    payload: {
      selection
    }
  }
}

function updateSortTopicAction(selection) {
  return {
    type: ReviewsSortActionsConstants.UPDATE_SORTTOPIC,
    payload: {
      selection
    }
  }
}

function updateFilterDateAction(selection) {
  return {
    type: ReviewsSortActionsConstants.UPDATE_FILTERDATE,
    payload: {
      selection
    }
  }
}

function updateFilterTopicAction(selection) {
  return {
    type: ReviewsSortActionsConstants.UPDATE_FILTERTOPIC,
    payload: {
      selection
    }
  }
}

function reviewsSortUpdatedAction(update) {
  return {
    type: ReviewsSortActionsConstants.REVIEWS_SORT_UPDATED,
    payload: {
      update
    }
  }
}

let ReviewsSortActions  = {
  updateSortDateAction,
  updateSortTopicAction,
  updateFilterDateAction,
  updateFilterTopicAction,
  reviewsSortUpdatedAction
};

export default ReviewsSortActions
