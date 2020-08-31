let mongoose = require('mongoose');
let Schema = mongoose.Schema;

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

module.exports = mongoose.model('userModel', userSchema);
