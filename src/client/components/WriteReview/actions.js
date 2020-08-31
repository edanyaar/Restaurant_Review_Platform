import { WriteReviewActionsConstants} from './constants.js';



function updateBathroomQualityAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_BATHROOMQUALITY,
    payload: {
      selection
    }
  }
}

function updateStaffKindnessAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_STAFFKINDNESS,
    payload: {
      selection
    }
  }
}

function updateCleanlinessAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_CLEANLINESS,
    payload: {
      selection
    }
  }
}

function updateDriveThroughAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_DRIVETHROUGH,
    payload: {
      selection
    }
  }
}

function updateDeliverySpeedAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_DELIVERYSPEED,
    payload: {
      selection
    }
  }
}

function updateFoodQualityAction(selection) {
  return {
    type: WriteReviewActionsConstants.UPDATE_FOODQUALITY,
    payload: {
      selection
    }
  }
}

function updateTitleAction(title) {
  return {
    type: WriteReviewActionsConstants.UPDATE_TITLE,
    payload: {
      title
    }
  }
}

function updateReviewAction(review) {
  return {
    type: WriteReviewActionsConstants.UPDATE_REVIEW,
    payload: {
      review
    }
  }
}

function submitReviewAction(form) {
  return {
    type: WriteReviewActionsConstants.SUBMIT_REVIEW,
    uri: '/api/submitreview',
    payload: {
      form
    }
  }
}



function submissionSuccessAction() {
  return {
    type: WriteReviewActionsConstants.SUBMISSION_SUCCESS,
  }
}

function uploadPhotosAction(photo,index) {
  return {
    type: WriteReviewActionsConstants.UPLOAD_PHOTOS,
    payload: {
      photo: photo,
      index: index,
    }
  }
}

function updateAllReviewAction(form) {
  return {
    type: WriteReviewActionsConstants.UPDATE_ALLREVIEW,
    uri:'/api/updatereview',
    payload: {
      form
    }
  }
}

function updateReviewStart(bathroomQuality,staffKindness, cleanliness,driveThroughQuality,deliverySpeed,foodQuality,
                           title,review, photos) {
  return{
    type: WriteReviewActionsConstants.UPDATE_REVIEWSTART,
    payload: {
      bathroomQuality, staffKindness,
      cleanliness, driveThroughQuality, deliverySpeed, foodQuality, title, review, photos
    }
  }
}

function getReviewInfo(username,restaurantName,restaurantLocation,date) {
  return {
    type: WriteReviewActionsConstants.GET_REVIEWINFO,
    uri:'/api/findreview',
    payload: {
      username: username,
      restaurantName: restaurantName,
      restaurantLocation: restaurantLocation,
      date: date,

    }
  }
}

let WriteReviewActions  = {
  updateBathroomQualityAction,
  updateStaffKindnessAction,
  updateCleanlinessAction,
  updateDriveThroughAction,
  updateDeliverySpeedAction,
  updateFoodQualityAction,
  updateTitleAction,
  updateReviewAction,
  uploadPhotosAction,
  submitReviewAction,
  submissionSuccessAction,
  updateAllReviewAction,
  getReviewInfo,
  updateReviewStart,
};

export default WriteReviewActions
