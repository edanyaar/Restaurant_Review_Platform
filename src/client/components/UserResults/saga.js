import {UserResultsActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserResultsActions from "./actions";

function* loadUsers(action){
  console.log('UserResultsSaga=', action);
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
    yield put(UserResultsActions.loadResults(json));
  } catch (e) {
    //yield put(RestResultsActionsConstants.loadImagesFailureAction(e.message));
  }
}

function* UserResultsSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(UserResultsActionsConstants.SEARCH_USERS, loadUsers);
}

export default UserResultsSaga;
