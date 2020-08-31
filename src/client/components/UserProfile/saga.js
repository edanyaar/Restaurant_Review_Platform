import {UserProfileActionsConstants} from './constants'
import { call, put, takeEvery } from 'redux-saga/effects'
import UserProfileActions from "./actions";


function* ifUserExists(action) {
    console.log('SignUpSaga=', action);
    console.log('SignUpSaga=', action.payload);
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
            yield put(UserProfileActions.updateUsernameAction(action.payload.username));
        }
        yield put(UserProfileActions.updateUserExistsAction(json));
    } catch (e) {
        console.log(e.message);
    }
}
function* UpdateUser(action){
    console.log('UpdateUserSaga=', action);
    console.log('UpdateUserSaga=', action.payload);
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
        if (json.nModified > 0) {
            yield put(UserProfileActions.updatedProfileSuccess("Success"));
        }
        else{
            yield put(UserProfileActions.updatedProfileFailed("Failed"));
        }
    }catch (e) {
        console.log(e.message)
    }
}
function* DeleteReview(action) {
    console.log('UpdateUserSaga=', action);
    console.log('UpdateUserSaga=', action.payload);
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
        if (json !== null) {
            yield put(UserProfileActions.updatedProfileSuccess("Success"));
            yield put(UserProfileActions.resetReviewsAction());
        } else {
            yield put(UserProfileActions.updatedProfileFailed("Failed"));
        }
    } catch (e) {
        yield put(UserProfileActions.updatedProfileFailed("Failed"));
    }

}
function* getInfoUser(action){
    console.log('UserProfileSaga=', action);
    console.log('UserProfile=', action.payload);
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
        yield put(UserProfileActions.updateUserInfo(json._id,json.firstname,json.lastname,json.username,json.password,json.image,json.location));

    }catch (e) {
        console.log(e.message)
    }
}
function* getUserReviews(action) {
    console.log('UserProfile=', action);
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

        yield put(UserProfileActions.loadReviewsAction(json));
    } catch (e) {
    }
}


function* UserProfileSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(UserProfileActionsConstants.GET_USERINFO, getInfoUser);
  yield takeEvery(UserProfileActionsConstants.FIND_USERNAME,ifUserExists);
  yield takeEvery(UserProfileActionsConstants.UPDATE_USER, UpdateUser);
  yield takeEvery(UserProfileActionsConstants.DELETE_REVIEW, DeleteReview);
  yield takeEvery(UserProfileActionsConstants.GET_USER_REVIEWS, getUserReviews);
}

export default UserProfileSaga;
