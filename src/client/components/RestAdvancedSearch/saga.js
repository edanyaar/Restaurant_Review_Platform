import {RestAdvancedSearchActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import RestResultsActions from "../RestResults/actions";

function* loadRestaurants(action){
  console.log('RestSearchSaga=', action);
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
      console.log(json);
    yield put(RestResultsActions.loadResults(json));
  } catch (e) {
      console.log("error loading restaurant results");
  }
}

function* RestSearchSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(RestAdvancedSearchActionsConstants.SEARCH_REST, loadRestaurants);
}

export default RestSearchSaga;
