import React from 'react';
import './ReviewsSort.scss';
import { connect } from 'react-redux';
import ReviewsSortActions from './actions';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Paper from "@material-ui/core/Paper";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import RestResults from "../RestResults/RestResults";




class ReviewsSort extends React.Component {
    render() {
    return (
      <ThemeProvider theme={theme}>
          <div className="ReviewsSort">
              <div className='ReviewsSort-body'>
                  <Paper>
                      <div className="ReviewsSort-sortDate">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Sort By Date</FormLabel>
                              <RadioGroup aria-label="ReviewsSort-sortDate" name="ReviewsSort-sortDate" value={this.props.sortDate}
                                          onChange={event => {this.props.updateSortDateAction(event.target.value);}}
                              >
                                  <FormControlLabel
                                      value="newFirst"
                                      control={<Radio color="primary" />}
                                      label="Newest First"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="oldFirst"
                                      control={<Radio color="primary" />}
                                      label="Oldest First"
                                      labelPlacement="end"
                                  />
                              </RadioGroup>
                              </FormControl>
                      </div>
                      <div className="ReviewsSort-filterDate">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Show Results For</FormLabel>
                              <RadioGroup aria-label="ReviewsSort-filterDate" name="ReviewsSort-filterDate" value={this.props.filterDate}
                                          onChange={event => {this.props.updateFilterDateAction(event.target.value);}}
                                          >
                                  <FormControlLabel
                                      value="lastWeek"
                                      control={<Radio color="primary" />}
                                      label="Last Week"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="lastMonth"
                                      control={<Radio color="primary" />}
                                      label="Last Month"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="lastYear"
                                      control={<Radio color="primary" />}
                                      label="Last Year"
                                      labelPlacement="end"
                                  />
                              </RadioGroup>
                          </FormControl>
                      </div>
                      <div className="ReviewsSort-sortTopic">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Sort By Topic</FormLabel>
                              <RadioGroup aria-label="ReviewsSort-sortTopic" name="ReviewsSort-sortTopic" value={this.props.sortTopic}
                                          onChange={event => {this.props.updateSortTopicAction(event.target.value);}}
                              >
                                  <FormControlLabel
                                      value="bathroomQuality"
                                      control={<Radio color="primary" />}
                                      label="Bathroom Quality"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="staffKindness"
                                      control={<Radio color="primary" />}
                                      label="Staff Kindness"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="cleanliness"
                                      control={<Radio color="primary" />}
                                      label="Cleanliness"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="driveThroughQuality"
                                      control={<Radio color="primary" />}
                                      label="Drive-Through Quality"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="deliverySpeed"
                                      control={<Radio color="primary" />}
                                      label="Delivery Speed"
                                      labelPlacement="end"
                                  />
                                  <FormControlLabel
                                      value="foodQuality"
                                      control={<Radio color="primary" />}
                                      label="Food Quality"
                                      labelPlacement="end"
                                  />
                              </RadioGroup>
                          </FormControl>
                      </div>
                      <div className="ReviewsSort-filterTopic">
                          <FormControl component="fieldset">
                              <FormLabel component="legend">Topic Threshold</FormLabel>
                              <RadioGroup aria-label="rating-threshold" name="rating-threshold" value={this.props.filterTopic}
                                          onChange={event => {this.props.updateFilterTopicAction(event.target.value);}}
                              >
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="1"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="ReviewsSort-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={1} size="small" />
                                      </div>
                                      <div className="ReviewsSort-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="2"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="ReviewsSort-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={2} size="small" />
                                      </div>
                                      <div className="ReviewsSort-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="3"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="ReviewsSort-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={3} size="small" />
                                      </div>
                                      <div className="ReviewsSort-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="4"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="ReviewsSort-averageRating1-4">
                                          <Rating name="size-small" readOnly  value={4} size="small" />
                                      </div>
                                      <div className="ReviewsSort-averageRatingText">
                                          <label>& up</label>
                                      </div>
                                  </Box>
                                  <Box display="flex" flexDirection="row">
                                      <FormControlLabel
                                          value="5"
                                          control={<Radio color="primary" />}
                                      />
                                      <div className="ReviewsSort-averageRating5">
                                          <Rating name="size-small" readOnly  value={5} size="small" />
                                      </div>
                                  </Box>
                              </RadioGroup>
                          </FormControl>
                      </div>
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
      sortDate: state['reviewsSort'].get('sortDate'),
      sortTopic: state['reviewsSort'].get('sortTopic'),
      filterDate: state['reviewsSort'].get('filterDate'),
      filterTopic: state['reviewsSort'].get('filterTopic'),
      reviewSortUpdated: state['reviewsSort'].get('reviewSortUpdated'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateSortDateAction: (selection) => {
          dispatch(ReviewsSortActions.updateSortDateAction(selection));
      },
      updateSortTopicAction: (selection) => {
          dispatch(ReviewsSortActions.updateSortTopicAction(selection));
      },
      updateFilterDateAction: (selection) => {
          dispatch(ReviewsSortActions.updateFilterDateAction(selection));
      },
      updateFilterTopicAction: (selection) => {
          dispatch(ReviewsSortActions.updateFilterTopicAction(selection));
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewsSort);

