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
import AutocompleteRestaurantsActions from './actions';
import AppActions from "../App/actions";

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



export default function AutocompelteRestaurants() {
    const classes = useStyles();

    //redux getters - equivalent to mapStateToProps
    const inputValue = useSelector(state => state['autocompleteRestaurants'].get('inputValue'));
    const options = useSelector(state => state['autocompleteRestaurants'].get('options'));
    const loaded = useSelector(state => state['autocompleteRestaurants'].get('loaded'));

    //redux dispatchers - equivalent to mapDispatchToProps
    const dispatch = useDispatch();
    const updateInputValueAction = (x) => {dispatch(AutocompleteRestaurantsActions.updateInputValueAction(x))};
    const updateOptionsAction = (x) => {dispatch(AutocompleteRestaurantsActions.updateOptionsAction(x))};
    const updateLoadedAction = (x) => {dispatch(AutocompleteRestaurantsActions.updateLoadedAction(x))};
    const updateSearchForAction = (x) => {dispatch(AppActions.updateSearchForAction(x))};
    const updateSearchReqAction = (x) =>{dispatch(AppActions.updateSearchReqAction(x))};

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
            PlacesService.current.getDetails(
                {
                    placeId: value.place_id,
                    fields: ['name', 'formatted_address', 'photos', 'geometry'],
                    sessionToken: curSessionToken.current
                },
                (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                            const placeResult = {
                                name: place.name,
                                location: place.formatted_address,
                                photo: place.photos !== undefined? place.photos[0].getUrl({maxWidth: 200, maxHeight: 200}) :
                                    require("../../../../public/fast_food.png"),
                                geometry: place.geometry,
                            };
                            updateSearchForAction(placeResult);
                            updateSearchReqAction(true);
                        }
                });
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

        fetch({ input: inputValue, sessionToken: curSessionToken.current},
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
                    label="search GoogleMaps"
                    variant="outlined"
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
