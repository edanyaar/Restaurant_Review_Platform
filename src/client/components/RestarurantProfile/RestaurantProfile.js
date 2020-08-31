import React from 'react';
import './RestaurantProfile.scss';
import { connect } from 'react-redux';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Paper from "@material-ui/core/Paper";
import RestProfileActions from "./actions";
import TopBar from "../TopBar/TopBar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import Review from "../Review/Review";
import ReviewsSort from "../ReviewsSort/ReviewsSort";
import RestResultsActions from "../RestResults/actions";
import date from 'date.js';
import ReviewsSortActions from "../ReviewsSort/actions";
import { compose, withProps } from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";
import {withCookies} from "react-cookie";

const MyMapComponent = compose(
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=yourkeyhere&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `200px` , width: '300px'}} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lng }}>
        <Marker position={{ lat: props.lat, lng: props.lng }} />
    </GoogleMap>
));

class RestaurantProfile extends React.Component {



    handelReviewsHelper = () => {
        this.props.getReviewsAction({
            id: this.props.id,
            skip: this.props.skip,
            sortDate: this.props.sortDate,
            sortTopic: this.props.sortTopic,
            filterDate: this.props.filterDate === "lastYear" ? date('1 year ago') :
                        this.props.filterDate === "lastMonth" ? date('1 month ago') :
                        this.props.filterDate === "lastWeek"  ? date('1 week ago') : "error",
            filterTopic: parseInt(this.props.filterTopic)});
    };

    handelReviews = (event) => {
        event.preventDefault();
        this.handelReviewsHelper();
    };


    constructor(props) {
        super(props);
        this.props.resetRestaurantsAction();
        this.props.getGeneralDetailsAction(this.props.id);
        this.handelReviewsHelper();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.reviewSortUpdated === false && this.props.reviewSortUpdated === true){
            this.props.reviewsSortUpdatedAction(false);
            this.props.getReviewsAction({
                id: this.props.id,
                skip: 0,
                sortDate: this.props.sortDate,
                sortTopic: this.props.sortTopic,
                filterDate: this.props.filterDate === "lastYear" ? date('1 year ago') :
                    this.props.filterDate === "lastMonth" ? date('1 month ago') :
                        this.props.filterDate === "lastWeek"  ? date('1 week ago') : "error",
                filterTopic: parseInt(this.props.filterTopic)});
        }
    }

    componentWillUnmount() {
        this.props.resetReviewsAction();
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <TopBar/>
                <Paper className="rest-header-paper">
                    <Box  className="rest-header-box" display="flex" flexDirection="row">
                        <img className="rest-photo"  src={this.props.photo} alt="r"/>
                        <Box className="rest-generalDetails">
                            <Box display="flex" flexDirection="row">
                                <Typography variant="h4" gutterBottom className="rest-name">
                                    {this.props.name}
                                </Typography>
                                <Rating className="rest-rating" name="rating" readOnly  value={parseInt(this.props.rating)} size="medium" />
                            </Box>
                            <Box  display="flex" flexDirection="row">
                                <LocationOnIcon color="primary"/>
                                <Typography variant="h5" gutterBottom className="rest-location">
                                    {this.props.location}
                                </Typography>
                            </Box>
                            <Button variant="contained" color="primary" component={RouterLink}
                                    to={"/writeReview/restaurantProfile/" + this.props.name + "/" + this.props.location + "/0"}>
                                Write a review
                            </Button>
                        </Box>
                        <div className="RestProfile-gmap">
                            <div id="RestProfile-map">
                                {this.props.geometry === null ? <div/> :
                                    <MyMapComponent
                                        lat={this.props.geometry.location.lat}
                                        lng={this.props.geometry.location.lng}
                                    />
                                }
                            </div>
                        </div>
                    </Box>
                </Paper>
                <Box className="RestaurantProfile-reviewsSort">
                    <ReviewsSort />
                </Box>
                <Box
                    className="RestaurantProfile-reviews"
                    display="block"
                    flexDirection="row"
                >
                    {this.props.skip > 0 ?
                        this.props.reviews.map((r, idx) => {
                        return <Review key={"review-" + r.id + idx} id={idx} parent="restaurantProfile" />;
                    }): null}
                    {this.props.skip > 0 && this.props.skip % 5 === 0 && this.props.remaining ?
                        <Button variant="contained" color="primary" className="RestaurantProfile-loadMore"
                                onClick={event => this.handelReviews(event)}>
                            Load more results
                        </Button>
                        : null
                    }
                </Box>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        id: props.match.params.restId,
        cookies: props.cookies,
        alertOpen: state['restaurantProfile'].get('alertOpen'),
        name: state['restaurantProfile'].get('name'),
        location: state['restaurantProfile'].get('location'),
        geometry: state['restaurantProfile'].get('geometry'),
        photo: state['restaurantProfile'].get('photo'),
        rating: state['restaurantProfile'].get('rating'),
        reviews: state['restaurantProfile'].get('reviews'),
        skip: state['restaurantProfile'].get('reviews').size,
        remaining: state['restaurantProfile'].get('remaining'),
        sortDate: state['reviewsSort'].get('sortDate'),
        sortTopic: state['reviewsSort'].get('sortTopic'),
        filterDate: state['reviewsSort'].get('filterDate'),
        filterTopic: state['reviewsSort'].get('filterTopic'),
        reviewSortUpdated: state['reviewsSort'].get('reviewSortUpdated'),
    }
};



const mapDispatchToProps = (dispatch) => {
    return {
        getGeneralDetailsAction: (id) => {
            dispatch(RestProfileActions.getGeneralDetailsAction(id));
        },
        getReviewsAction: (id) => {
            dispatch(RestProfileActions.getReviewsAction(id));
        },
        resetReviewsAction: () => {
            dispatch(RestProfileActions.resetReviewsAction());
        },
        resetRestaurantsAction: () => {
            dispatch(RestResultsActions.resetRestaurantsAction())
        },
        reviewsSortUpdatedAction: (update) => {
            dispatch(ReviewsSortActions.reviewsSortUpdatedAction(update))
        },
        updateAlertAction: (alert) => {
            dispatch(RestProfileActions.updateAlertAction(alert))
        },
    }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(RestaurantProfile));

