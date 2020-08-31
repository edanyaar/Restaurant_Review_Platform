import { call, put, takeEvery } from 'redux-saga/effects'
import TopBarActions from "./actions";
import {TopBarActionsConstants} from "./constants";

function* RequestUserImage(action){
  console.log('TopBarSaga=', action);
  console.log('TopBarSaga=', action.payload)
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
      if (json !== "Failed") {
          yield put(TopBarActions.updateUserPhotoAction(json));
      }
  }catch (e) {
    console.log(e.message)
  }
}


function* TopBarSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(TopBarActionsConstants.REQUEST_USERPHOTO, RequestUserImage);
}

export default TopBarSaga;
