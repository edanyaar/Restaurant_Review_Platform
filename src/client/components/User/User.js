import React from 'react';
import './User.scss';
import { connect } from 'react-redux';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import {Link as RouterLink} from "react-router-dom";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class User extends React.Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className='user'>
                    <Card>
                        <div className='user-photo'>
                            <CardMedia
                                style={{height: '100%' , width: '300px'}}
                                image={this.props.image}
                                component={RouterLink} to={'/userprofile/'+ this.props.username}
                            />
                        </div>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.username}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" component="p">
                                {"Name: " + this.props.firstname + " " + this.props.lastname}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" component="p">
                                {"Location: " + this.props.location}
                            </Typography>
                        </CardContent>
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
        firstname: state['userResults'].getIn(['users', props.idx]).firstname,
        lastname: state['userResults'].getIn(['users', props.idx]).lastname,
        username: state['userResults'].getIn(['users', props.idx]).username,
        location: state['userResults'].getIn(['users', props.idx]).location,
        image: state['userResults'].getIn(['users', props.idx]).image,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

