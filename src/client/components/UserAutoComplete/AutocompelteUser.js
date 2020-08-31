import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import { useDispatch, useSelector } from "react-redux";
import AutocompleteUserActions from './actions';
import SignUpActions from "../SignUp/actions";
import UserProfileActions from "../UserProfile/actions";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };
const curSessionToken = {current: null};
const PlacesService = { current: null };


const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));



export default function AutocompelteUser() {
    const classes = useStyles();

    //redux getters - equivalent to mapStateToProps
    const inputValue = useSelector(state => state['autocompleteUser'].get('inputValue'));
    const options = useSelector(state => state['autocompleteUser'].get('options'));
    const loaded = useSelector(state => state['autocompleteUser'].get('loaded'));

    //redux dispatchers - equivalent to mapDispatchToProps
    const dispatch = useDispatch();
    const updateInputValueAction = (x) => {dispatch(AutocompleteUserActions.updateInputValueAction(x))};
    const updateOptionsAction = (x) => {dispatch(AutocompleteUserActions.updateOptionsAction(x))};
    const updateLoadedAction = (x) => {dispatch(AutocompleteUserActions.updateLoadedAction(x))};
    const updateLocationAction = (location) => {dispatch(SignUpActions.updateLocationAction(location))};
    const updateProfileLocationAction = (location) => {dispatch(UserProfileActions.updateLocationAction(location))};
    if (typeof window !== 'undefined' && !loaded) {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                'https://maps.googleapis.com/maps/api/js?key=yourkeyhere&libraries=places',
                document.querySelector('head'),
                'google-maps',
            );
        }
        updateLoadedAction(true);
    }

    const handleChange = event => {updateInputValueAction(event.target.value)};


    const handelSelection = (event,value) => {
        if(value !== null && value !== undefined){
            PlacesService.current.getDetails(
                {
                    placeId: value.place_id,
                    fields: ['name'],
                    sessionToken: curSessionToken.current
                },
                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        updateLocationAction(place.name);
                        updateProfileLocationAction(place.name);
                    }
                });
        }
    };

    const fetch = React.useMemo(
        () =>
            throttle((input, callback) => {
                autocompleteService.current.getPlacePredictions(input, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if(!curSessionToken.current && window.google){
            curSessionToken.current = new window.google.maps.places.AutocompleteSessionToken();
        }
        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService();
        }
        if (!PlacesService.current && window.google) {
            PlacesService.current = new window.google.maps.places.PlacesService (document.createElement('div'));
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            updateOptionsAction([]);
            return undefined;
        }

        fetch({ input: inputValue, sessionToken: curSessionToken.current, types: ['(cities)']},
                results => {
            if (active) {
                updateOptionsAction(results || []);
            }
        });

        return () => {
            active = false;
        };
    }, [inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-restaurant-search"
            style={{ width: 300 }}
            getOptionLabel={option => (typeof option === 'string' ? option : option.description)}
            filterOptions={x => x}
            options={options.toArray()}
            autoComplete
            includeInputInList
            disableOpenOnFocus
            onChange={handelSelection}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Location"
                    fullWidth
                    onChange={handleChange}
                />
            )}
            renderOption={option => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map(match => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                  {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
