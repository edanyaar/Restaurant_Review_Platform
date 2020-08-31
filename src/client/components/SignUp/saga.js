import {SignUpActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import SignUpActions from './actions'

function* signUpUser(action){
  console.log('SignUpSaga=', action);
  console.log('SignUpSaga=', action.payload)
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
    yield put(SignUpActions.registrationSuccess(json));
  } catch (e) {
    yield put(SignUpActions.registrationFailed(e.message));
  }
}

function* ifUserExists(action) {
    console.log('SignUpSaga=', action);
    console.log('SignUpSaga=', action.payload)
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
        if (json === "OK") {
            yield put(SignUpActions.updateUsernameAction(action.payload.username));
        }
        yield put(SignUpActions.updateUserExistsAction(json));
    } catch (e) {
        console.log(e.message);
    }
}

function* SignUpSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(SignUpActionsConstants.CREATE_USER, signUpUser);
  yield takeEvery(SignUpActionsConstants.FIND_USERNAME, ifUserExists);
}

export default SignUpSaga;
