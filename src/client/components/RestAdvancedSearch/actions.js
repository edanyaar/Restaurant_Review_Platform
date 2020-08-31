import { RestAdvancedSearchActionsConstants} from './constants.js';


function updateSearchByAction(selection) {
  return {
    type: RestAdvancedSearchActionsConstants.UPDATE_SEARCHBY,
    payload: {
      selection
    }
  }
}

function updateRatingAction(selection) {
  return {
    type: RestAdvancedSearchActionsConstants.UPDATE_RATING,
    payload: {
      selection
    }
  }
}

function searchAction(params) {
  return {
    type: RestAdvancedSearchActionsConstants.SEARCH_REST,
    uri: '/api/load/restresults',
    payload: {
      params
    }
  }
}

function updateSliderAction(selection) {
  return {
    type: RestAdvancedSearchActionsConstants.UPDATE_SLIDER,
    payload: {
      selection
    }
  }
}

let RestAdvancedSearchActions  = {
  updateSearchByAction,
  updateRatingAction,
  searchAction,
  updateSliderAction
};

export default RestAdvancedSearchActions
