import React from 'react';
import './WriteReview.scss';
import { connect } from 'react-redux';
import WriteReviewActions from './actions';
import TopBar from "../TopBar/TopBar";

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import FormHelperText from "@material-ui/core/FormHelperText";
import {DropzoneArea} from 'material-ui-dropzone'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {withCookies} from "react-cookie";


class WriteReview extends React.Component {

    constructor(props) {
        super(props);
        console.log("constructor write review = ", props.match.params.page);
        if(props.match.params.page === 'userprofile'){
            this.props.getReviewInfo(props.cookies.get('username'),this.props.restaurantName,
                this.props.restaurantLocation,this.props.date);
        }

    }

    isDisabled = () => {
        return !(this.props.title
                && this.props.restaurantName
                && this.props.restaurantLocation
                && this.props.bathroomQuality
                && this.props.staffKindness
                && this.props.cleanliness
                && this.props.foodQuality)
    };

    handelFormSubmit = (event) => {
        event.preventDefault();
        (this.props.match.params.page !== "userprofile"?
            (this.props.submitReviewAction({
            name: this.props.restaurantName,
            location: this.props.restaurantLocation,
            photo: this.props.restaurantPhoto,
            geometry: this.props.restaurantGeometry,
            reviews:[{
                title: this.props.title,
                averageScore: (( parseInt(this.props.bathroomQuality) +
                    parseInt(this.props.cleanliness) +
                    (this.props.deliverySpeed === undefined ? 0 : parseInt(this.props.deliverySpeed)) +
                    (this.props.driveThroughQuality === undefined ? 0 : parseInt(this.props.driveThroughQuality)) +
                    parseInt(this.props.staffKindness) +
                    parseInt(this.props.foodQuality)) / 6),
                writtenReview: this.props.review,
                bathroomQuality: this.props.bathroomQuality,
                staffKindness: this.props.staffKindness,
                cleanliness: this.props.cleanliness,
                driveThroughQuality: this.props.driveThroughQuality,
                deliverySpeed: this.props.deliverySpeed,
                foodQuality: this.props.foodQuality,
                photos: this.props.photos,
                reviewer: {
                    username: this.props.cookies.get('username'),
                    loaction: null, //will be filled in on server side
                    photo: null, //will be filled in on server side
                }
            }]
        })) :  (this.props.updateAllReviewAction({
                name: this.props.restaurantName,
                location: this.props.restaurantLocation,
                reviews:[{
                    title: this.props.title,
                    averageScore: (( parseInt(this.props.bathroomQuality) +
                        parseInt(this.props.cleanliness) +
                        (this.props.deliverySpeed === undefined ? 0 : parseInt(this.props.deliverySpeed)) +
                        (this.props.driveThroughQuality === undefined ? 0 : parseInt(this.props.driveThroughQuality)) +
                        parseInt(this.props.staffKindness) +
                        parseInt(this.props.foodQuality)) / 6),
                    writtenReview: this.props.review,
                    creationDate: this.props.date,
                    bathroomQuality: this.props.bathroomQuality,
                    staffKindness: this.props.staffKindness,
                    cleanliness: this.props.cleanliness,
                    driveThroughQuality: this.props.driveThroughQuality,
                    deliverySpeed: this.props.deliverySpeed,
                    foodQuality: this.props.foodQuality,
                    photos: this.props.photos,
                    reviewer: {
                        username: this.props.cookies.get('username'),
                        loaction: null, //will be filled in on server side
                        photo: null, //will be filled in on server side
                    }
                }]
            }))
        );
        this.props.history.push('/');
    };

    handelPhotos = (acceptedFiles) => {
        console.log(acceptedFiles);
            if(acceptedFiles.length === 0){
                this.props.uploadPhotosAction([],-1);
            }
            else{
                acceptedFiles.forEach((file,index) => {
                    const reader = new FileReader();
                    reader.onabort = () => console.log('file reading was aborted');
                    reader.onerror = () => console.log('file reading has failed');
                    reader.onload = () => {
                        this.props.uploadPhotosAction(reader.result,index);
                    };
                    reader.readAsDataURL(file)
                })
            }
    };



    render() {
        console.log(this.props.title);
    return (
        <div className="writeReview">
          <ThemeProvider theme={theme}>
              <TopBar/>
              <div id="write_review">
                  <form onSubmit={event => {this.handelFormSubmit(event);}}>
                      <div className="writeReview-searchRestaurant">
                          <Typography variant="h4" gutterBottom className="rest-name">
                              {this.props.restaurantName}
                          </Typography>
                          <Box  display="flex" flexDirection="row">
                              <LocationOnIcon color="primary"/>
                              <Typography variant="h5" gutterBottom className="rest-location">
                                  {this.props.restaurantLocation}
                              </Typography>
                          </Box>
                      </div>
                      <div className="writeReview-submit">
                          <Button variant="contained"
                                  color="primary"
                                  type = 'submit'
                                  disabled={this.isDisabled()}
                          >
                              {(this.props.match.params.page === 'userprofile'? 'Update review': 'Submit Your Review')}
                          </Button>
                      </div>
                      <div className="writeReview-ratings1">
                          <div className="writeReview-bathroom">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Bathroom Quality*</Typography>
                                  <Rating
                                      name="bathroom-quality"
                                      value={this.props.bathroomQuality}
                                      onChange={(event, newValue) =>
                                      {this.props.updateBathroomQualityAction(newValue);}}
                                  />
                              </Box>
                          </div>
                          <div className="writeReview-staffKindness">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Staff Kindness*</Typography>
                                  <Rating
                                      name="staff kindness"
                                      value={this.props.staffKindness}
                                      onChange={(event, newValue) =>
                                      {this.props.updateStaffKindnessAction(newValue);}}
                                  />
                              </Box>
                          </div>
                          <div className="writeReview-cleanliness">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Cleanliness*</Typography>
                                  <Rating
                                      name="cleanliness"
                                      value={this.props.cleanliness}
                                      onChange={(event, newValue) =>
                                      {this.props.updateCleanlinessAction(newValue);}}
                                  />
                              </Box>
                          </div>
                      </div>
                      <div className="writeReview-ratings2">
                          <div className="writeReview-driveThroughQuality">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Drive-Through Quality</Typography>
                                  <Rating
                                      name="driveThroughQuality"
                                      value={this.props.driveThroughQuality}
                                      onChange={(event, newValue) =>
                                      {this.props.updateDriveThroughAction(newValue);}}
                                  />
                                  <FormHelperText>Leave empty if no drive-through</FormHelperText>
                              </Box>
                          </div>
                          <div className="writeReview-deliverySpeed">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Delivery Speed</Typography>
                                  <Rating
                                      name="delivery speed"
                                      value={this.props.deliverySpeed}
                                      onChange={(event, newValue) =>
                                      {this.props.updateDeliverySpeedAction(newValue);}}
                                  />
                                  <FormHelperText>Leave empty if no delivery</FormHelperText>
                              </Box>
                          </div>
                          <div className="writeReview-foodQuality">
                              <Box component="fieldset" mb={3} borderColor="transparent">
                                  <Typography component="legend">Food Quality*</Typography>
                                  <Rating
                                      name="food Quality"
                                      required
                                      value={this.props.foodQuality}
                                      onChange={(event, newValue) =>
                                      {this.props.updateFoodQualityAction(newValue);}}
                                  />
                              </Box>
                          </div>
                      </div>
                      <div className="writeReview-title">
                          <TextField id="outlined-basic"  required label={(this.props.title?"":"Your Review Title")} variant="outlined"
                                     value={this.props.title || ''}
                            onChange={event => this.props.updateTitleAction(event.target.value)} autoComplete="off"/>
                      </div>
                      <div className="writeReview-writtenReview">
                          <TextField
                              id="writeReview-writtenReview"
                              label={(this.props.review?"":"Your Review")}
                              multiline
                              rows="7"
                              variant="outlined"
                              style = {{width: 750}}
                              value={this.props.review || ''}
                              onChange={event => this.props.updateReviewAction(event.target.value)}
                          />
                      </div>
                      <div className="writeReview-imageUpload">
                          <DropzoneArea
                              value = {this.props.photos}
                              filesLimit = {3}
                              maxFileSize = {4000000}
                              acceptedFiles={['image/*']}
                              dropzoneText= "Upload Photos"
                              dropzoneClass= "writeReview-dropZone"
                              onChange= {(acceptedFiles) => this.handelPhotos(acceptedFiles)}
                          />
                      </div>
                  </form>
              </div>
          </ThemeProvider>
        </div>
    );
  }
}


const mapStateToProps = (state,props) => {
  return {
      page: props.match.params.page,
      date: props.match.params.date,
      restaurantName: props.match.params.restName,
      restaurantLocation: props.match.params.restLocation,
      restaurantPhoto: state['app'].get('searchPhoto'),
      restaurantGeometry: state['app'].get('searchGeometry'),
      bathroomQuality: state['writeReview'].get('bathroomQuality'),
      staffKindness: state['writeReview'].get('staffKindness'),
      cleanliness: state['writeReview'].get('cleanliness'),
      driveThroughQuality : state['writeReview'].get('driveThroughQuality'),
      deliverySpeed: state['writeReview'].get('deliverySpeed'),
      foodQuality: state['writeReview'].get('foodQuality'),
      title: state['writeReview'].get('title'),
      review: state['writeReview'].get('review'),
      photos: state['writeReview'].get('photos'),
      cookies: props.cookies,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateBathroomQualityAction: (selection) => {
          dispatch(WriteReviewActions.updateBathroomQualityAction(selection))
      },
      updateStaffKindnessAction: (selection) => {
          dispatch(WriteReviewActions.updateStaffKindnessAction(selection))
      },
      updateCleanlinessAction: (selection) => {
          dispatch(WriteReviewActions.updateCleanlinessAction(selection))
      },
      updateDriveThroughAction: (selection) => {
          dispatch(WriteReviewActions.updateDriveThroughAction(selection))
      },
      updateDeliverySpeedAction: (selection) => {
          dispatch(WriteReviewActions.updateDeliverySpeedAction(selection))
      },
      updateFoodQualityAction: (selection) => {
          dispatch(WriteReviewActions.updateFoodQualityAction(selection))
      },
      updateTitleAction: (title) => {
          dispatch(WriteReviewActions.updateTitleAction(title))
      },
      updateReviewAction: (review) => {
          dispatch(WriteReviewActions.updateReviewAction(review))
      },
      uploadPhotosAction: (photo,index) => {
          dispatch(WriteReviewActions.uploadPhotosAction(photo,index))
      },
      submitReviewAction: (form) => {
          dispatch(WriteReviewActions.submitReviewAction(form))
      },
      updateAllReviewAction: (form) => {
          dispatch(WriteReviewActions.updateAllReviewAction(form))
      },
      getReviewInfo: (username,restaurantName,restaurantLocation,date) => {
          dispatch(WriteReviewActions.getReviewInfo(username,restaurantName,restaurantLocation,date))
      },
  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(WriteReview));

