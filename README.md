# Restaurant Review Platform

The site was based on the template found [here](https://github.com/majeek/simple-react-redux-reducers-saga-webkit-express-mongoose-boilerplate) and uses a React-Redux front-end and Node-Express/MongoDB backend. Material UI was chosen as the UI framework. The other major libraries that were used are [react-router](https://www.npmjs.com/package/react-router) for client-side routing, [react-dropzone](https://www.npmjs.com/package/react-dropzone) to facilitate picture drag and drop functionality, [react-cookie](https://www.npmjs.com/package/react-cookie) for remembering login details and [ramda.js](https://ramdajs.com/) for functional programming. 

To start the server:
1.	node src\server\server.js # backend
2.	npm run dev # frontend

Inside the [Public folder](https://github.com/edanyaar/Restaurant_Review_Platform/tree/master/public) 2 json files are provided – one with users and one with restaurants, that can be loaded into mongo to populate the database. 

note: The site is based on an integration with the google maps Places service via the places javascript api. In order to avoid inadvertent billing the api key was removed for this upload.  

## Project Design

The site is made up of several pages: 

### The Homepage 
Allows the user to sign in as well as search either restaurants or users. The restaurant search is carried out using the google maps autocomplete service. Once the user has selected a restaurant/location a search request is sent out to the server. Any restaurants that match the query are presented. If none are found, the user is informed of this and prompted to be the first to review the restaurant. 

### Login-Sign in page
Allow the user to sign in and then log in to the site. The user is connected until logged out or the log in cookie expires. 

### User profile page
Shows general user info and their reviews. If viewing own profile page the user can edit their profile as well as edit/remove their reviews. 

### Restaurant profile page
Contains general information about the restaurant, a map of its location as well as its reviews. 

### Write review page
Allows the user to fill out a review for a restaurant. Can be accessed either from a restaurants homepage (for an existing restaurant) or from the homepage (if a search request returned no matching results). The user must fill all required fields (all but the written review and photos fields) in order to submit a review. If this is the first review for the restaurant its details (such as name, photo and precise location) are acquired from the Google Maps Places service and stored in the database. 

## Mongoose Model
Two mongoose schemas were implemented – one for users and one for restaurants. 

### Restaurant
Each document contains information about the restaurant – such as name, location (received from google maps) and average score. It further contains a list of the restaurants reviews.  

```
let restaurantSchema = new Schema({
    name: String,
    location: String,
    averageScore: Number,
    photo: String,
    geometry: {
        location:{
            lat: Number,
            lng: Number,
            noWrap: Boolean
        },
        viewport:{
            sw:{
                lat: Number,
                lng: Number,
                noWrap: Boolean
            },
            ne:{
                lat: Number,
                lng: Number,
                noWrap: Boolean
            }
        }
    },
    tags: [{
        tag: String,
    }],
    reviews:[{
        title: String,
        averageScore: Number,
        writtenReview: String,
        creationDate: {type: Date, default: Date.now()},
        bathroomQuality: {type: Number, min: 1, max: 5},
        staffKindness: {type: Number, min: 1, max: 5},
        cleanliness: {type: Number, min: 1, max: 5},
        driveThroughQuality: {type: Number, min: 0, max: 5 ,default: 0},
        deliverySpeed: {type: Number, min: 0, max: 5, default: 0},
        foodQuality: {type: Number, min: 1, max: 5},
        photos:[{
            photo: String
        }],
        reviewer: {
            username: String,
            location:  String,
            picture: String,
        },
    }],

});
```

### User
the user schema contains information about the user as well as a list of his reviews. 

```
let userSchema = new Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    image: String,
    location: String,
    reviews:[{
        title: String,
        averageScore: Number,
        writtenReview: String,
        creationDate: {type: Date, default: Date.now()},
        bathroomQuality: {type: Number, min: 1, max: 5},
        staffKindness: {type: Number, min: 1, max: 5},
        cleanliness: {type: Number, min: 1, max: 5},
        driveThroughQuality: {type: Number, min: 0, max: 5},
        deliverySpeed: {type: Number, min: 0, max: 5},
        foodQuality: {type: Number, min: 1, max: 5},
        photos:[{
            photo: String
        }],
        restaurant: {
            name: String,
            location: String,
        }
    }]
});
```

## Data Flow Examples

To begin with, let’s say the user searches for a restaurant that does not exist in the database.
Once the search term has been selected from the google maps autocomplete, a request is sent from the AutocompleteRestaruant component to the google Places service for information about the restaurant (name, location , geolocation and photo). A search request is then sent from the RestAdvancedSearch component to the backend via saga, and in this case the search comes up empty (which triggers a redux store update). The UI is then updated, and the user is prompted to be the first to review the restaurant (note: if the user isn’t logged in a popup message is triggered instead which informs him he should log in first). 

![image 1](/public/example1.png)

The write a review page pulls the relevant restaurant data from google maps and the user fills in the review form and submits it. Saga then forwards it to the server and a new restaurant document is created.

![image 2](/public/example2.png)

Now upon searching for the restaurant again we will find our review

![image 3](/public/example3.png)
![image 4](/public/example4.png)

Now, let’s say the user selects the location only search, types in New York and selects it from the autocomplete list. As a result, the AutocompleteRestaruant component sends a Places data request to google maps and receives the geolocation of the search term. It then updates the Advanced search component that the search value has changed. As a result, a search request is sent to the back end via saga containing the search value (New York) as well as the geolocation. On the backend, mongoose queries the database for all restaurants whose location matches New York. On the results received it than applies a distance filter according to the user’s selected search radius and the received geolocation, and only sends back to the client side those restaurants that passed the distance filter. Once the response is received redux updates the results component to display the restaurants that were found. Clicking on one of them takes the user to the restaurant’s profile page.

![image 5](/public/example5.png)
![image 6](/public/example6.png)

