import { AutocompleteRestaurantsActionsConstants} from './constants.js';

function updateInputValueAction(input) {
  return {
    type: AutocompleteRestaurantsActionsConstants.UPDATE_INPUTVALUE,
    payload: {
      input
    }
  }
}

function updateOptionsAction(opts) {
  return {
    type: AutocompleteRestaurantsActionsConstants.UPDATE_OPTIONS,
    payload: {
      opts
    }
  }
}

function updateLoadedAction(loaded) {
  return {
    type: AutocompleteRestaurantsActionsConstants.UPDATE_LOADED,
    payload: {
      loaded
    }
  }
}

let  AutocompleteRestaurantsActions  = {
  updateInputValueAction,
  updateOptionsAction,
  updateLoadedAction,
};

export default  AutocompleteRestaurantsActions
