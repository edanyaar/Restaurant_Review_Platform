import React from 'react';
import './UserResults.scss';
import { connect } from 'react-redux';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Grid from "@material-ui/core/Grid";
import User from "../User/User";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import UserResultsActions from "./actions";

class UserResults extends React.Component {

    render() {
        return (
            <ThemeProvider theme={theme}>
                {typeof this.props.users === 'undefined' ?
                    (<Box/>):
                    (<div className="results">
                            <Grid container spacing={1}>
                                {this.props.users.map((u,idx) => {
                                    return <User
                                        key={'user-' + u._id + idx}
                                        idx={idx}
                                        id={u._id}/>;
                                })}
                            </Grid>
                            {this.props.skip > 0 && this.props.skip %10 === 0 ?
                                <Button variant="contained" color="primary" className="userResults-loadMore"
                                         onClick={() => this.props.searchAction({
                                             username:this.props.username,
                                             location:this.props.location,
                                             skip: this.props.users.size})}>
                                    Load more results
                                </Button>
                                : null
                            }
                    </div>)}
            </ThemeProvider>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        users: state['userResults'].get('users'),
        username: state['app'].get('searchUserName'),
        location: state['app'].get('searchUserLocation'),
        skip: state['userResults'].get('users').size,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchAction: (params) => {
            dispatch(UserResultsActions.searchAction(params));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserResults);

