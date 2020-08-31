import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import LoginReducer from "./components/Login/reducer";
import WriteReviewReducer from "./components/WriteReview/reducer";
import RestAdvancedSearchReducer from "./components/RestAdvancedSearch/reducer";
import RestResultsReducer from "./components/RestResults/reducer";
import SignUpReducer from "./components/SignUp/reducer";
import TopBarReducer from "./components/TopBar/reducer";
import AutocompleteRestaurantsReducer from "./components/AutocompleteRestaurants/reducer";
import UserProfileReducer from "./components/UserProfile/reducer";

import RestProfileReducer from "./components/RestarurantProfile/reducer";
import UserResultsReducer from "./components/UserResults/reducer";
import ReviewsSortReducer from "./components/ReviewsSort/reducer";
import AutocompleteUserReducer from "./components/UserAutoComplete/reducer";


export default combineReducers({
  app: AppReducer,
  login: LoginReducer,
  writeReview: WriteReviewReducer,
  restAdvancedSearch: RestAdvancedSearchReducer,
  restResults: RestResultsReducer,
  userResults: UserResultsReducer,
  signup: SignUpReducer,
  topBar: TopBarReducer,
  autocompleteRestaurants: AutocompleteRestaurantsReducer,
  userprofile: UserProfileReducer,
  restaurantProfile: RestProfileReducer,
  reviewsSort: ReviewsSortReducer,
  autocompleteUser: AutocompleteUserReducer,
});
