import {LoginActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import LoginActions from "./actions";

function* LoginUser(action){
  console.log('LoginSaga=', action);
  console.log('LoginSaga=', action.payload)
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
      if (json === "Failed") {
          yield put(LoginActions.loginFailed("Incorrect user or password"));
      }
      else{
          yield put(LoginActions.loginSuccess("Success"));
      }

  }catch (e) {
    console.log(e.message)
  }
}


function* LoginSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(LoginActionsConstants.LOGIN, LoginUser);
}

export default LoginSaga;
