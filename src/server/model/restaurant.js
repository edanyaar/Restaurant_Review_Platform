
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

module.exports = mongoose.model('restaurantModel', restaurantSchema);
