import React from 'react';
import './RestAdvancedSearch.scss';
import { connect } from 'react-redux';
import RestAdvancedSearchActions from './actions';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import Slider from "@material-ui/core/Slider";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RestResults from "../RestResults/RestResults";
import AppActions from "../App/actions";
import RestResultsActions from "../RestResults/actions";



class RestAdvancedSearch extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(((prevProps.searchReq === false  && this.props.searchReq === true) ||
            (prevProps.searchBy !== this.props.searchBy) ||
            (prevProps.rating !== this.props.rating) ||
            (prevProps.slider !== this.props.slider)) && this.props.searchName !== ""){
            this.handelSearch();
            this.props.updateSearchReqAction(false);
        }
        if(prevProps.moreReq !== this.props.moreReq){//moreReq changed from false to true
            this.handelgetMore();
            this.props.updateMoreReqAction(false);
        }
    }

    handelgetMore = () => {
        this.props.searchAction({
            searchName: this.props.searchName,
            searchLocation: this.props.searchLocation,
            searchBy: this.props.searchBy,
            rating: this.props.rating,
            radius: this.props.slider,
            skip: this.props.skip,
            lat:this.props.geometry.location.lat(),
            lng:this.props.geometry.location.lng(),
        });
    };

    handelSearch = () => {
        this.props.searchAction({
            searchName: this.props.searchName,
            searchLocation: this.props.searchLocation,
            searchBy: this.props.searchBy,
            rating: this.props.rating,
            radius: this.props.slider,
            skip: 0,
            lat:this.props.geometry.location.lat(),
            lng:this.props.geometry.location.lng(),
        });
        this.props.resetRestaurantsAction();
    };



  render() {
    return (
      <ThemeProvider theme={theme}>
          <div className="restaurants">
              <div className='restAdvancedSearch'>
                  <Paper>
                      <div className="restAdvancedSearch-searchBy">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Search By</FormLabel>
                              <RadioGroup aria-label="searchby-restaurants" name="searchby-restaurants" value={this.props.searchBy}
                                          onChange={event => {this.props.updateSearchByAction(event.target.value);}}
                                          >
                                  <FormControlLabel
                                      value="nameOnly"
                                      control={<Radio color="primary" />}
                                      label="Name Only"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="locationOnly"
                                      control={<Radio color="primary" />}
                                      label="Location Only"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="both"
                                      control={<Radio color="primary" />}
                                      label="Both"
                                      labelPlacement="end"
                                  />
                              </RadioGroup>
                          </FormControl>
                      </div>
                      <div className="restAdvancedSearch-averageRating">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Average Rating</FormLabel>
                              <RadioGroup aria-label="rating" name="rating" value={this.props.rating}
                                          onChange={event => {this.props.updateRatingAction(event.target.value);}}
                              >
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="1"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="restAdvancedSearch-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={1} size="small" />
                                      </div>
                                      <div className="restAdvancedSearch-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="2"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="restAdvancedSearch-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={2} size="small" />
                                      </div>
                                      <div className="restAdvancedSearch-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="3"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="restAdvancedSearch-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={3} size="small" />
                                      </div>
                                      <div className="restAdvancedSearch-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="4"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="restAdvancedSearch-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={4} size="small" />
                                      </div>
                                      <div className="restAdvancedSearch-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="5"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="restAdvancedSearch-averageRating5">
                                          <Rating name="size-small" readOnly  value={5} size="small" />
                                      </div>
                                  </Box>
                              </RadioGroup>
                          </FormControl>
                      </div>
                      {this.props.searchBy === "locationOnly" ?
                          <div className="restAdvancedSearch-closerBetterScale">
                              <FormControl component="fieldset">
                                  <FormLabel component="legend">Search Radius</FormLabel>
                                  <div className="restAdvancedSearch-closerBetterSlider">
                                      <Slider
                                          track={false}
                                          aria-labelledby="closer-Better-slider"
                                          valueLabelDisplay="on"
                                          onChangeCommitted={(event, newValue) => {
                                              this.props.updateSliderAction(newValue);
                                              this.props.resetRestaurantsAction();
                                          }}
                                          defaultValue={this.props.slider}
                                          marks={[
                                              {
                                                  value: 0,
                                                  label: "0 km"
                                              },
                                              {
                                                  value: 100,
                                                  label: "100 km"
                                              }
                                          ]}
                                      />
                                  </div>
                              </FormControl>
                          </div> :
                          <div></div>
                      }

                  </Paper>
              </div>
              <div className="rest-results">
                  <RestResults/>
              </div>
          </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      searchName: state['app'].get('searchName'),
      searchLocation: state['app'].get('searchLocation'),
      searchReq: state['app'].get('searchReq'),
      moreReq: state['restResults'].get('moreReq'),
      searchBy: state['restAdvancedSearch'].get('searchBy'),
      rating: state['restAdvancedSearch'].get('rating'),
      slider: state['restAdvancedSearch'].get('slider'),
      skip: state['restResults'].get('restaurants').size,
      geometry: state['app'].get('searchGeometry'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateSearchByAction: (selection) => {
          dispatch(RestAdvancedSearchActions.updateSearchByAction(selection));
      },
      updateRatingAction: (selection) => {
          dispatch(RestAdvancedSearchActions.updateRatingAction(selection));
      },
      updateSliderAction: (selection) => {
          dispatch(RestAdvancedSearchActions.updateSliderAction(selection));
      },
      searchAction: (params) => {
          dispatch(RestAdvancedSearchActions.searchAction(params));
      },
      updateSearchReqAction: (req) => {
          dispatch(AppActions.updateSearchReqAction(req));
      },
      resetRestaurantsAction: () => {
          dispatch(RestResultsActions.resetRestaurantsAction())
      },
      updateMoreReqAction: (req) => {
          dispatch(RestAdvancedSearchActions.updateMoreReqAction(req));
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RestAdvancedSearch);

