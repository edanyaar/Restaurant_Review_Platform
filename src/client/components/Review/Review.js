import React from "react";
import "./Review.scss";
import { connect } from "react-redux";
import theme from "../../theme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UserProfileActions from "../UserProfile/actions";
import {withCookies} from "react-cookie";
import Avatar from "@material-ui/core/Avatar";
import {Link as RouterLink} from "react-router-dom";
import CardMedia from "@material-ui/core/CardMedia";



class Review extends React.Component {

  constructor(props) {
    super(props);
    if(this.props.parent === "restaurantProfile"){

    }
  }

  isCurrentUser = cookies => {
    return this.props.username === cookies.get("username");
  };

  render() {
    let { cookies } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div className="review">
          <Card style={{boxShadow:'1px 2px 4px rgba(0, 0, 0, .5)' }}>
            <div className="review-header">
              <CardHeader
                  avatar = {this.props.parent === "userprofile" ? null :
                      <Avatar aria-label="recipe" src={this.props.userphoto}/>
                  }
                className="review-headercard"
                title={this.props.name}
                subheader={this.props.location}
                action={
                  <div className="review-header-rating">
                    <h4 >Average score</h4>
                    <Rating
                      name="size-small"
                      readOnly
                      value={this.props.averageScore}
                      size="large"
                    />
                  </div>
                }
              />
            </div>
            <div className="review-photoscores">
              <Grid
                container
                spacing={1}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >

                <div className="review-photo" style={{boxShadow:'1px 2px 4px rgba(0, 0, 0, 1)' }}>
                  {this.props.photos.length > 0 ?
                  (<GridList
                    cellHeight={225}
                    className={"review-gridlist"}
                    cols={this.props.photos.length}
                  >
                    {this.props.photos.map(tile => (
                      <GridListTile key={tile._id} cols={1}>
                        <img src={tile.photo} alt={"image"} />
                      </GridListTile>
                    ))}
                  </GridList>)
                  :<CardMedia style = {{ height: 0, paddingTop: '56%'}} image={require("../../../../public/fast_food.png")}/>}
                </div>
                <div className="review-scoretitles">
                  <h4>Bathroom quality</h4>
                  <h4>Staff kindness</h4>
                  <h4>cleanliness</h4>
                  <h4>Drive through Quality</h4>
                  <h4>Delivery speed</h4>
                  <h4>Food quality</h4>
                </div>
                <div className="review-scores">
                  <Box


                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.bathroomQuality}
                        size="medium"
                      />
                    }
                  </Box>
                  <Box
                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.staffKindness}
                        size="medium"
                      />
                    }
                  </Box>
                  <Box
                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.cleanliness}
                        size="medium"
                      />
                    }
                  </Box>
                  <Box
                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.driveThroughQuality}
                        size="medium"
                      />
                    }
                  </Box>
                  <Box
                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.deliverySpeed}
                        size="medium"
                      />
                    }
                  </Box>
                  <Box
                    className="review-score"
                    display="flex"
                    flexDirection="row"
                  >
                    {
                      <Rating
                        name="size-small"
                        readOnly
                        value={this.props.foodQuality}
                        size="medium"
                      />
                    }
                  </Box>
                </div>
              </Grid>
            </div>
            <CardContent>
              <div className="restaurant-review1">
                <h2>{this.props.title}</h2>
                <h3>
                  <i>"{this.props.writtenReview}"</i>
                </h3>
                <h3 className="creationDate">
                  {new Date(this.props.creationDate).toDateString()}
                </h3>
              </div>
            </CardContent>
            <CardActions>
              {this.isCurrentUser(cookies) && this.props.parent === "userprofile" ? (
                <div className="review-buttons">
                  <IconButton
                    aria-label="delete"
                    className="Review-delete"
                    onClick={() => {
                      this.props.deleteReview({
                        id: this.props.id,
                        username: this.props.username,
                        creationDate: this.props.creationDate});
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    className="Review-edit"
                    component={RouterLink}
                    to={"/writeReview/userprofile/" + this.props.name + "/" + this.props.location + "/" + this.props.creationDate}
                  >
                    <EditIcon />
                  </IconButton>
                </div>
              ) : null}
            </CardActions>
          </Card>
        </div>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    id: props.id,
    username: (props.parent === "userprofile" ? state[props.parent].get("username")
                :state[props.parent].getIn(["reviews", props.id]).reviewer.username),
    title: state[props.parent].getIn(["reviews", props.id]).title,
    name: (props.parent === "userprofile" ? state[props.parent].getIn(["reviews", props.id]).restaurant.name
            :state[props.parent].getIn(["reviews", props.id]).reviewer.username),
    location: (props.parent === "userprofile" ? state[props.parent].getIn(["reviews", props.id]).restaurant.location
                :state[props.parent].getIn(["reviews", props.id]).reviewer.location),
    averageScore: state[props.parent].getIn(["reviews", props.id]).averageScore,
    writtenReview: state[props.parent].getIn(["reviews", props.id]).writtenReview,
    creationDate: state[props.parent].getIn(["reviews", props.id]).creationDate,
    bathroomQuality: state[props.parent].getIn(["reviews", props.id]).bathroomQuality,
    staffKindness: state[props.parent].getIn(["reviews", props.id]).staffKindness,
    cleanliness: state[props.parent].getIn(["reviews", props.id]).cleanliness,
    driveThroughQuality: state[props.parent].getIn(["reviews", props.id]).driveThroughQuality,
    deliverySpeed: state[props.parent].getIn(["reviews", props.id]).deliverySpeed,
    foodQuality: state[props.parent].getIn(["reviews", props.id]).foodQuality,
    photos: state[props.parent].getIn(["reviews", props.id]).photos,
    userphoto: (props.parent === "userprofile" ? null : state[props.parent].getIn(["reviews", props.id]).reviewer.picture),
    cookies: props.cookies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteReview: (details) => {
      dispatch(UserProfileActions.deleteReview(details));
    }
  };
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Review));
