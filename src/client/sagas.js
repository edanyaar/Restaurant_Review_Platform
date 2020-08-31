import { all } from 'redux-saga/effects'
import WriteReviewSaga from './components/WriteReview/saga'
import SignUpSaga from "./components/SignUp/saga";
import LoginSaga from "./components/Login/saga";
import RestSearchSaga from "./components/RestAdvancedSearch/saga";
import TopBarSaga from "./components/TopBar/saga";
import RestProfileSaga from "./components/RestarurantProfile/saga";
import UserResultsSaga from "./components/UserResults/saga";
import UserProfileSaga from "./components/UserProfile/saga";


export default function* Sagas() {
  yield all([
    WriteReviewSaga(),
    SignUpSaga(),
    LoginSaga(),
    RestSearchSaga(),
    TopBarSaga(),
    RestProfileSaga(),
    UserProfileSaga(),
    UserResultsSaga(),
  ])
}
