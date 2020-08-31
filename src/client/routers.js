import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import App from "./components/App/App";
import WriteReview from "./components/WriteReview/WriteReview";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/Signup";
import Notfound from "./components/NotFound/NotFound";
import RestaurantProfile from "./components/RestarurantProfile/RestaurantProfile";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateUser from "./components/UpdateUser/UpdateUser";


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path='/writeReview/:page/:restName/:restLocation/:date' component={WriteReview} exact={true}/>
                <Route path="/sign-up" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/restaurant/:restId" component={RestaurantProfile} exact={true}/>
                <Route path="/userprofile/:username" component={UserProfile} exact={true}/>
                <Route path="/update" component={UpdateUser}/>
                <Route path="/" component={App} exact={true}/>
                <Route component={Notfound} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
