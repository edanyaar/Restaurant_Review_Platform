import React from 'react';
import './Restaurant.scss';
import { connect } from 'react-redux';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/lab/Rating";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {Link as RouterLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {FormatQuote} from "@material-ui/icons";
import Box from "@material-ui/core/Box";


class Restaurant extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className='restaurant'>
                    <Card>
                        <div className="restaurant-header">
                            <CardHeader
                                title={this.props.name}
                                subheader={this.props.location}
                                action={
                                    <Rating name="rating" readOnly  value={this.props.averageScore} size="medium" />
                                }
                                component={RouterLink} to={'/restaurant/'+ this.props.id}
                                style={{ textDecoration: 'none' ,color: "black" }}
                            />
                        </div>
                        <div className='restaurant-photo'>
                            <CardMedia
                                style={{height: '100%' , width: '300px', backgroundImage: `url(${this.props.photo})`}}
                                src={this.props.photo}
                                component={RouterLink} to={'/restaurant/'+ this.props.id}
                            />
                        </div>
                        <CardContent>
                            <Box display="flex" flexDirection="row">
                                <FormatQuote color="secondary"/>
                                <Typography variant="h6" gutterBottom className="restaurant-review">
                                    {this.props.topReviewTitle}
                                </Typography>
                            </Box>
                        </CardContent>
                        <CardActions disableSpacing>
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
        idx: props.idx,
        name: state['restResults'].getIn(['restaurants', props.idx]).name,
        location: state['restResults'].getIn(['restaurants', props.idx]).location,
        averageScore: state['restResults'].getIn(['restaurants', props.idx]).averageScore,
        photo: state['restResults'].getIn(['restaurants', props.idx]).photo,
        topReviewTitle: state['restResults'].getIn(['restaurants', props.idx]).reviews[0].title,
    }
};



const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);

