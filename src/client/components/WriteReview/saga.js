import {WriteReviewActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import WriteReviewActions from "./actions";
import UserProfileActions from "../UserProfile/actions";

function* submitReview(action){
  console.log('WriteReviewSaga=', action);
  try {
    const res = yield call(fetch, action.uri,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(action.payload)
      });

      yield put(WriteReviewActions.submissionSuccessAction());
  }


  catch (e){
    //yield put(WriteReviewActions.submissionFailAction(e.message));
  }
}
function* getReviewInfo(action){
    console.log('WriteReviewSaga=', action);
    console.log('WriteReviewSaga=', action.payload)
    try {
        const res = yield call(fetch, action.uri,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.payload)
            });

        const json = yield call([res, 'json']); //retrieve body of response
        console.log("WriteReviewSaga response =",json);
        yield put(WriteReviewActions.updateReviewStart(json.bathroomQuality,json.staffKindness, json.cleanliness
            ,json.driveThroughQuality,json.deliverySpeed,json.foodQuality,
            json.title,json.writtenReview, json.photos));

    }catch (e) {
        console.log(e.message)
    }
}



function* WriteReviewSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(WriteReviewActionsConstants.SUBMIT_REVIEW, submitReview);
  yield takeEvery(WriteReviewActionsConstants.UPDATE_ALLREVIEW, submitReview);
  yield takeEvery(WriteReviewActionsConstants.GET_REVIEWINFO,getReviewInfo);
}

export default WriteReviewSaga;

