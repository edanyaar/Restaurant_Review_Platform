let axios = require('axios');
let restaurantModel = require('../model/restaurant');
let UserModel = require('../model/user');
let R = require('ramda');


module.exports = (app) => {
    app.post('/api/submitreview', function (req, res, next) {
        const review = req.body.form.reviews[0];
        let creationDate = Date.now();
        //update user doc
        UserModel.findOne({username: review.reviewer.username}).then(doc => {
            const user_review = {
                title: review.title,
                averageScore: review.averageScore,
                writtenReview: review.writtenReview,
                creationDate: creationDate,
                bathroomQuality: review.bathroomQuality,
                staffKindness: review.staffKindness,
                cleanliness: review.cleanliness,
                driveThroughQuality: review.driveThroughQuality,
                deliverySpeed: review.deliverySpeed,
                foodQuality: review.foodQuality,
                photos: review.photos,
                restaurant: {
                    name: req.body.form.name,
                    location: req.body.form.location,
                },
            };
            doc.reviews.push(user_review);
            doc.save();

            const res_review = {
                title: review.title,
                averageScore: review.averageScore,
                writtenReview: review.writtenReview,
                creationDate: creationDate,
                bathroomQuality: review.bathroomQuality,
                staffKindness: review.staffKindness,
                cleanliness: review.cleanliness,
                driveThroughQuality: review.driveThroughQuality,
                deliverySpeed: review.deliverySpeed,
                foodQuality: review.foodQuality,
                photos: review.photos,
                reviewer: {
                    username: review.reviewer.username,
                    location: doc.location,
                    picture: doc.image,
                },
            };

            // //update restaurant doc
            // review.reviewer.location = doc.location;
            // review.reviewer.picture = doc.image;

            restaurantModel
                .findOne({name: req.body.form.name, location: req.body.form.location})
                .then(doc => {
                    if (doc != null) { //restaurant exists - add review to it and to relevant user
                        console.log('restaurant found=', req.body.form.name);
                        doc.reviews.push(res_review);
                        doc.averageScore = doc.averageScore + ((res_review.averageScore - doc.averageScore) / (doc.reviews.length));
                        doc.save();
                    } else { //restaurant does not exist - create it and add review to it and to relevant user
                        let s = req.body.form;
                        s.reviews.pop();
                        s.reviews.push(res_review);
                        console.log('new restaurant=', req.body.form.name);
                        const restaurant = new restaurantModel(s);
                        const photos = review.photos;
                        restaurant.averageScore = req.body.form.reviews[0].averageScore;
                        restaurant.save();
                    }

                })
                .catch((err) => next(err));


            res.json("success");
        }).catch((err) => next(err));
    });

    app.post('/api/findreview', function (req, res, next) {
        console.log("username review= ", req.body);
        restaurantModel
            .findOne({name: req.body.restaurantName, location: req.body.restaurantLocation},
                {reviews: {$elemMatch: { creationDate: new Date(req.body.date),  "reviewer.username": req.body.username}
                    }}).then(review => {
                if (review != null) {
                    console.log("find review = ", review.reviews);
                    res.json(review.reviews[0]);
                } else {
                    console.log("didnt find the review");
                    res.end();
                }
            }
        ).catch((err) => next(err));
    });

    app.post('/api/updatereview', function (req, res, next) {
        const review = req.body.form.reviews[0];
        console.log("updateReview = ", review.reviewer.username, req.body.form.name,review.creationDate);


        UserModel.updateOne({
            username: review.reviewer.username, reviews: {$elemMatch: {creationDate: new Date(review.creationDate) ,
                        "restaurant.name": req.body.form.name, "restaurant.location": req.body.form.location}}
        }, {
            $set: {
                "reviews.$.title": review.title,
                "reviews.$.averageScore": review.averageScore,
                "reviews.$.writtenReview": review.writtenReview,
                "reviews.$.bathroomQuality": review.bathroomQuality,
                "reviews.$.staffKindness": review.staffKindness,
                "reviews.$.cleanliness": review.cleanliness,
                "reviews.$.driveThroughQuality": review.driveThroughQuality,
                "reviews.$.deliverySpeed": review.deliverySpeed,
                "reviews.$.foodQuality": review.foodQuality,
                "reviews.$.photos": review.photos

            }
        }).then(doc => {
            if (doc != null) {
                console.log("return update review = ", doc);
                review.reviewer.location = doc.location;
                review.reviewer.picture = doc.image;
                restaurantModel
                    .findOne({name: req.body.form.name, location: req.body.form.location },
                        {averageScore: 1 ,reviews: {$elemMatch: {creationDate: new Date(review.creationDate),
                                    "reviewer.username": review.reviewer.username}}})
                    .then(rest => {
                        if (rest != null) {

                            let before = rest.reviews[0];
                            rest.averageScore = rest.averageScore + ((review.averageScore - before.averageScore) / (rest.reviews.length));
                            rest.save();
                            restaurantModel
                                .updateOne({
                                    name: req.body.form.name, location: req.body.form.location, reviews: {
                                        $elemMatch: {
                                            creationDate: new Date(review.creationDate),
                                            "reviewer.username": review.reviewer.username
                                        }
                                    }
                                }
                                       ,
                                    {
                                        $set: {
                                            "reviews.$.title": review.title,
                                            "reviews.$.averageScore": review.averageScore,
                                            "reviews.$.writtenReview": review.writtenReview,
                                            "reviews.$.bathroomQuality": review.bathroomQuality,
                                            "reviews.$.staffKindness": review.staffKindness,
                                            "reviews.$.cleanliness": review.cleanliness,
                                            "reviews.$.driveThroughQuality": review.driveThroughQuality,
                                            "reviews.$.deliverySpeed": review.deliverySpeed,
                                            "reviews.$.foodQuality": review.foodQuality,
                                            "reviews.$.photos": review.photos
                                        }
                                    })
                                .then(docres => {
                                    if (docres != null) { //restaurant exists - add review to it and to relevant user
                                        res.json(docres);
                                    } else {
                                        res.end();
                                    }
                                }).catch((err) => next(err));
                        } else {
                            res.end();
                        }
                    }).catch((err) => next(err));
            } else {
                res.end();
            }
        }).catch((err) => next(err));
    });
};
