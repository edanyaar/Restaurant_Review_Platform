import React from 'react';
import './RestResults.scss';
import { connect } from 'react-redux';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Restaurant from "../Restaurant/Restaurant";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from "react-router-dom";
import {withCookies} from "react-cookie";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Snackbar from "@material-ui/core/Snackbar";
import { Alert } from '@material-ui/lab';
import RestResultsActions from "./actions";
import RestAdvancedSearchActions from "../RestAdvancedSearch/actions";

class RestResults extends React.Component {


    handelAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.props.updateAlertAction(false);
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                {this.props.cookies.get('searchName') !== ""
                    && this.props.noResults && this.props.searchBy !== "locationOnly"  ?
                    (this.props.cookies.get('username') === undefined ?
                            (
                                <Box className="restResults-addreview" >
                                    <NewReleasesIcon color="secondary" fontSize="large"/>
                                    <Typography variant="h5" gutterBottom>
                                        We do not seem to have this restaurant in our database,
                                        would you like to be the first to review it?
                                    </Typography>
                                    <Button variant="contained" color="primary"
                                            onClick={() => this.props.updateAlertAction(true)}>
                                        Write a review
                                    </Button>
                                    <Snackbar open={this.props.alertOpen} autoHideDuration={6000}
                                              onClose={this.handelAlertClose}
                                              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                        <Alert elevation={6} variant="filled"  severity="error"
                                               onClose={this.handelAlertClose} color="error"
                                               className="restResults-alert">
                                            You must be logged in to write a review
                                        </Alert>
                                    </Snackbar>
                                </Box>
                            ) :
                            (
                                <Box className="restResults-addreview" >
                                    <NewReleasesIcon color="secondary" fontSize="large"/>
                                    <Typography variant="h5" gutterBottom>
                                        We do not seem to have this restaurant in our database,
                                        would you like to be the first to review it?
                                    </Typography>
                                    <Button variant="contained" color="primary" component={RouterLink}
                                            to={"/writeReview/restaurantProfile/" + this.props.searchName + "/" + this.props.searchLocation + "/0"}>
                                        Write a review
                                    </Button>
                                </Box>
                            )
                    ):
                    (<Box>
                        <Grid container spacing={1} className='restResults'>
                            {this.props.restaurants.map((r,idx) => {
                                return <Restaurant
                                    key={'restaurant-' + r._id + idx}
                                    idx={idx}
                                    id={r._id}/>;
                            })}
                        </Grid>
                        {this.props.skip > 0 && this.props.skip % 10 === 0 && this.props.remaining ?
                            <Button variant="contained" color="primary" className="restResults-loadMore"
                                    onClick={(event => this.props.updateMoreReqAction(event))}>
                                Load more results
                            </Button>
                            : null
                        }
                        {(this.props.cookies.get('searchName') !== "" &&
                            this.props.skip > 0 &&
                            this.props.searchBy !== "locationOnly" ?
                            (this.props.cookies.get('username') === undefined?
                                (
                                    <Box className="restResults-addreview" >
                                        <NewReleasesIcon color="secondary" fontSize="large"/>
                                        <Typography variant="h5" gutterBottom>
                                            Didn't find what you were looking for?
                                            be the first to review the restaurant!
                                        </Typography>
                                        <Button variant="contained" color="primary"
                                                onClick={() => this.props.updateAlertAction(true)}>
                                            Write a review
                                        </Button>
                                        <Snackbar open={this.props.alertOpen} autoHideDuration={6000}
                                                  onClose={this.handelAlertClose}
                                                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                                            <Alert elevation={6} variant="filled"  severity="error"
                                                   onClose={this.handelAlertClose} color="error"
                                                   className="restResults-alert">
                                                You must be logged in to write a review
                                            </Alert>
                                        </Snackbar>
                                    </Box>
                                ) :
                                (
                                    <Box className="restResults-addreview" >
                                        <NewReleasesIcon color="secondary" fontSize="large"/>
                                        <Typography variant="h5" gutterBottom>
                                            Didn't find what you were looking for?
                                            be the first to review the restaurant!
                                        </Typography>
                                        <Button variant="contained" color="primary" component={RouterLink}
                                                to={"/writeReview/restaurantProfile/" + this.props.searchName + "/" + this.props.searchLocation + "/0"}>
                                            Write a review
                                        </Button>
                                    </Box>
                                )
                            ):null)}
                        </Box>)}
            </ThemeProvider>
        );
    }
}



const mapStateToProps = (state,props) => {
    return {
        restaurants: state['restResults'].get('restaurants'),
        cookies: props.cookies,
        alertOpen: state['restResults'].get('alertOpen'),
        searchReq: state['app'].get('searchReq'),
        searchName: state['app'].get('searchName'),
        searchLocation: state['app'].get('searchLocation'),
        skip: state['restResults'].get('restaurants').size,
        remaining: state['restResults'].get('remaining'),
        moreReq: state['restResults'].get('moreReq'),
        noResults: state['restResults'].get('noResults'),
        searchBy: state['restAdvancedSearch'].get('searchBy'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateAlertAction: (alert) => {
            dispatch(RestResultsActions.updateAlertAction(alert))
        },
        resetRestaurantsAction: () => {
            dispatch(RestResultsActions.resetRestaurantsAction())
        },
        searchAction: (params) => {
            dispatch(RestAdvancedSearchActions.searchAction(params));
        },
        updateMoreReqAction: (req) => {
            dispatch(RestAdvancedSearchActions.updateMoreReqAction(req));
        },
    }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(RestResults));

