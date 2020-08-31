import { UserProfileActionsConstants} from './constants.js';
import {SignUpActionsConstants} from "../SignUp/constants";


function deleteReview(details) {
  return{
    type: UserProfileActionsConstants.DELETE_REVIEW,
    uri: '/api/review/delete',
    payload:{
      details

    }
  }

}

function updateUserInfo(id,firstname,lastname,username,password,image,location){
  return {
    type: UserProfileActionsConstants.UPDATE_USERINFO,
    payload: {
      id,
      firstname,
      lastname,
      username,
      password,
      image,
      location
    }
  }
}
function getUserInfo(user){
  return {
    type: UserProfileActionsConstants.GET_USERINFO,
    uri: '/api/user/info',
    payload: {
      user
    }
  }
}
function UpdateUserAction(details) {
  return {
    type: UserProfileActionsConstants.UPDATE_USER,
    uri: '/api/user/update',
    payload: {
      details
    }
  }
}

function updateUsernameAction(username) {
  return {
    type: UserProfileActionsConstants.UPDATE_USERNAME,
    payload: {
      username
    }
  }
}
function updateFirstNameAction(firstname) {
  return {
    type: UserProfileActionsConstants.UPDATE_FIRSTNAME,
    payload: {
      firstname
    }
  }
}
function updateLastNameAction(lastname) {
  return {
    type: UserProfileActionsConstants.UPDATE_LASTNAME,
    payload: {
      lastname
    }
  }
}
function updatePasswordAction(password){
  return {
    type: UserProfileActionsConstants.UPDATE_PASSWORD,
    payload: {
      password
    }
  }
}


function updateLocationAction(location){
  return {
    type: UserProfileActionsConstants.UPDATE_LOCATION,
    payload: {
      location
    }
  }
}

function updateImageAction(image){
  return {
    type: UserProfileActionsConstants.UPDATE_IMAGE,
    payload: {
      image
    }
  }
}
function ifUsernameExistsAction(username){
  return {
    type: SignUpActionsConstants.FIND_USERNAME,
    uri:  '/api/user/find',
    payload: {
      username
    }
  }
}
function updateUserExistsAction(message){
  return {
    type: SignUpActionsConstants.UPDATE_USEREXISTS,
    payload: {
      message
    }
  }
}

function updatedProfileSuccess(message){
  return {
    type: UserProfileActionsConstants.UPDATE_SUCCESS,
    payload: {
      message
    }
  }
}
function initMessageAction(message){
  return {
    type: UserProfileActionsConstants.INIT_MESSAGE,
    payload: {
      message
    }
  }
}
function updatedProfileFailed(message){
  return {
    type: UserProfileActionsConstants.UPDATE_FAILED,
    payload: {
      message
    }
  }
}
function getReviews(params){
  return{
    type: UserProfileActionsConstants.GET_USER_REVIEWS,
    uri: '/api/user/getReviews',
    payload: {
      params
    }
  }
}
function loadReviewsAction(res){
  return{
    type: UserProfileActionsConstants.LOAD_USER_REVIEWS,
    payload: {
      res
    }
  }
}
function resetReviewsAction() {
  return {
    type: UserProfileActionsConstants.RESET_USER_REVIEWS,
  }
}

let UserProfileActions  = {
  updateUserInfo,
  getUserInfo,
  UpdateUserAction,
  updateUsernameAction,
  updateFirstNameAction,
  updateLastNameAction,
  updatePasswordAction,
  updateLocationAction,
  updateImageAction,
  updatedProfileSuccess,
  updatedProfileFailed,
  initMessageAction,
  deleteReview,
  ifUsernameExistsAction,
  updateUserExistsAction,
  getReviews,
  loadReviewsAction,
  resetReviewsAction,

};

export default UserProfileActions;
