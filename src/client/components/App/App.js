import React , {useEffect}  from 'react';
import './App.scss';
import { connect } from 'react-redux';
import AppActions from './actions';

import theme from '../../theme';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import RestAdvancedSearch from "../RestAdvancedSearch/RestAdvancedSearch";
import TopBar from "../TopBar/TopBar";
import {Box} from "@material-ui/core";

import { withCookies } from 'react-cookie'
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import UserResults from "../UserResults/UserResults";
import UserResultsActions from "../UserResults/actions";
import AutocompelteRestaurants from "../AutocompleteRestaurants/AutocompelteRestaurants";
import keydown from "react-keydown";


class App extends React.Component {

    componentDidMount() {
        this.props.cookies.set('searchName', this.props.searchName, {path: '/'});
        this.props.cookies.set('searchLocation', this.props.searchLocation, {path: '/'});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.searchName !== this.props.searchName){
            this.props.cookies.set('searchName', this.props.searchName, {path: '/'});
        }
        if(prevProps.searchLocation !== this.props.searchLocation){
            this.props.cookies.set('searchLocation', this.props.searchLocation, {path: '/'});
        }
    }

    handelUserSearch = (event) => {
        event.preventDefault();
        if(this.props.searchUserName !== "" || this.props.searchUserLocation !== ""){
            this.props.userSearchAction({
                username:this.props.searchUserName,
                location:this.props.searchUserLocation,
                skip: 0
            });
        }
        this.props.resetUserResultsAction();
    };


    @keydown( 'enter' )
    handelEnter() {
        this.props.updateSearchReqAction(true);
    };

    render() {
    return (
        <div className="app">
          <ThemeProvider theme={theme}>
              <div className="app-appbar">
                  <TopBar/>
              </div>
              <div className="app-main">
                  <Box className="app-searchbar" display="flex" flexDirection="row">
                      {this.props.searchBy === "Restaurants" ?
                          (<Box className="app-searchtext">
                              <AutocompelteRestaurants/>
                              <IconButton onClick={event => this.props.updateSearchReqAction(true)} color="primary"
                                          style={{position:"relative", left:"15px"}}>
                                  <SearchIcon fontSize="large"/>
                              </IconButton>
                          </Box>) :
                          (<Box>
                              <Box className="app-userSearchtext">
                                  <TextField
                                      id="SearchUserName"
                                      label="Name/Username"
                                      style={{width: "300px"}}
                                      onChange={event => {this.props.updateSearchUserNameAction(event.target.value);}}
                                  />
                                  <IconButton onClick={this.handelUserSearch} size = "medium"
                                              style={{position:"relative", left:"15px"}}>
                                      <SearchIcon/>
                                  </IconButton>
                              </Box>
                                  <TextField
                                      className="app-userSearchLocation"
                                      id="SearchUserLocation"
                                      label="Location"
                                      style={{width: "300px"}}
                                      onChange={event => {this.props.updateSearchUserLocationAction(event.target.value);}}
                                  />
                          </Box>)
                      }
                      <div className="app-searchopts">
                          <FormControl component="fieldset">
                              <RadioGroup aria-label="searchby" name="searchby" value={this.props.searchBy} row
                                          onChange={event => {this.props.updateSearchParam(event.target.value);
                                                              this.props.resetUserResultsAction();
                                          }}>
                                  <FormControlLabel
                                      value="Users"
                                      control={<Radio color="primary" />}
                                      label="Users"
                                      labelPlacement="start"
                                  />
                                  <FormControlLabel
                                      value="Restaurants"
                                      control={<Radio color="primary" />}
                                      label="Restaurants"
                                      labelPlacement="start"
                                  />
                              </RadioGroup>
                          </FormControl>
                      </div>
                  </Box>
                  <div className="searchResults">
                      {this.props.searchBy === "Restaurants" ?
                          (<RestAdvancedSearch/>) :
                          (<div className="user-searchResults">
                              <UserResults/>
                          </div>)
                      }
                  </div>
              </div>
          </ThemeProvider>
        </div>
    );
  }
}



const mapStateToProps = (state,props) => {
  return {
      searchBy: state['app'].get('searchBy'),
      searchName: state['app'].get('searchName'),
      searchLocation: state['app'].get('searchLocation'),
      searchPhoto: state['app'].get('searchPhoto'),
      searchGeometry: state['app'].get('searchGeometry'),
      cookies: props.cookies,
      searchReq: state['app'].get('searchReq'),
      searchUserName: state['app'].get('searchUserName'),
      searchUserLocation: state['app'].get('searchUserLocation'),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      updateSearchParam: (selection) => {
          dispatch(AppActions.updateSearchParamAction(selection));
      },
      updateWriteRevAnchorElAction: (el) => {
          dispatch(AppActions.updateWriteRevAnchorElAction(el));
      },
      updateSearchReqAction: (req) => {
          dispatch(AppActions.updateSearchReqAction(req));
      },
      updateSearchUserNameAction: (searchValue) => {
          dispatch(AppActions.updateSearchUserNameAction(searchValue));
      },
      updateSearchUserLocationAction: (searchValue) => {
          dispatch(AppActions.updateSearchUserLocationAction(searchValue));
      },
      userSearchAction: (params) => {
          dispatch(UserResultsActions.searchAction(params));
      },
      resetUserResultsAction: () => {
          dispatch(UserResultsActions.resetUserResultsAction());
      }
  }
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(App));


