import {RestProfileActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestProfileActions from "./actions";
import ReviewsSortActions from "../ReviewsSort/actions";

function* getRestaurantGenralDetails(action){
  console.log('RestProfileSaga=', action);
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

    yield put(RestProfileActions.loadGeneralDetailsAction(json));
  } catch (e) {}
}

function* getRestaurantReviews(action){
    console.log('RestProfileSaga=', action);
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
        put(ReviewsSortActions.reviewsSortUpdatedAction(false));
        yield put(RestProfileActions.loadReviewsAction(json));
    } catch (e) {}
}

function* RestProfileSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestProfileActionsConstants.GET_GENERALDETAILES, getRestaurantGenralDetails);
  yield takeEvery(RestProfileActionsConstants.GET_REVIEWS, getRestaurantReviews)
}

export default RestProfileSaga;
