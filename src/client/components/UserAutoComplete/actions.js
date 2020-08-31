import { AutocompleteUserActionsConstants} from './constants.js';

function updateInputValueAction(input) {
  return {
    type: AutocompleteUserActionsConstants.UPDATE_USER_INPUTVALUE,
    payload: {
      input
    }
  }
}

function updateOptionsAction(opts) {
  return {
    type: AutocompleteUserActionsConstants.UPDATE_USER_OPTIONS,
    payload: {
      opts
    }
  }
}

function updateLoadedAction(loaded) {
  return {
    type: AutocompleteUserActionsConstants.UPDATE_USER_LOADED,
    payload: {
      loaded
    }
  }
}

let  AutocompleteUserActions  = {
  updateInputValueAction,
  updateOptionsAction,
  updateLoadedAction,
};

export default  AutocompleteUserActions
