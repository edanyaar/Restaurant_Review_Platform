let axios = require('axios');
let restaurantModel = require('../model/restaurant');
let R = require('ramda');

const distance = (lat1,lng1,lat2,lng2) => {
    lat1 = lat1* (Math.PI/180);
    lat2 = lat2* (Math.PI/180);
    lng1 = lng1* (Math.PI/180);
    lng2 = lng2* (Math.PI/180);
    const x = (lng2-lng1) * Math.cos((lat1+lat2)/2);
    const y = (lat2-lat1);
    return Math.sqrt(x*x + y*y)* 6371;
};

module.exports = (app) => {
    app.post('/api/load/restresults', function (req, res, next) {

        const rating = Number(req.body.params.rating) - 0.5;
        console.log("search for=",req.body.params.searchName);

        if(req.body.params.searchBy === 'both'){
            restaurantModel
                .find({name: {$regex: req.body.params.searchName, $options: 'i'}, averageScore: {$gte: rating},
                        location: {$regex: req.body.params.searchLocation, $options: 'i'}},
                        "name location averageScore photo reviews"
                    )
                .sort("-averageScore")
                .skip(req.body.params.skip)
                .limit(10)
                .then(doc =>{
                    if(doc != null){
                        res.json(doc)
                    }
                    else res.end();
                })
        }
        else if(req.body.params.searchBy === 'nameOnly') {
            restaurantModel
                .find({name: {$regex: req.body.params.searchName, $options: 'i'}, averageScore: {$gte: rating}},
                    "name location averageScore photo reviews"
                )
                .sort("-averageScore")
                .skip(req.body.params.skip)
                .limit(10)
                .then(doc =>{
                        if(doc != null){
                            console.log(doc);

                            res.json(doc)
                        }
                        else res.end();
            })
        }
        else{//location only
            restaurantModel
                .find({location: {$regex: R.split(",",req.body.params.searchLocation)[0], $options: 'i'}, averageScore: {$gte: rating}},
                    "name location averageScore photo reviews geometry"
                )
                .sort("-averageScore")
                .then(doc =>{
                    if(doc != null){
                        console.log("location search results : " + doc);
                        const filtered = R.filter((restaurant) =>
                            distance(restaurant.geometry.location.lat,
                                     restaurant.geometry.location.lng,
                                     req.body.params.lat,
                                     req.body.params.lng) <= req.body.params.radius,
                            doc);
                        const distSort = R.sort((rest1,rest2) =>
                            distance(rest1.geometry.location.lat,
                                    rest1.geometry.location.lng,
                                    req.body.params.lat,
                                    req.body.params.lng) -
                            distance(rest2.geometry.location.lat,
                                rest2.geometry.location.lng,
                                req.body.params.lat,
                                req.body.params.lng)
                        ,filtered);
                        const skipped = R.slice(req.body.params.skip, Infinity,distSort);
                        const response = R.slice(0,10,skipped);
                        res.json(response)
                    }
                    else res.end();
                })
            }
    });

    app.post('/api/load/restprofilegeneral', function (req, res, next) {
        restaurantModel.findById(req.body.id, "name location averageScore photo geometry").then(doc =>{
            if(doc != null){
                res.json(doc)
            }
            else res.end();
        })

    });

    app.post('/api/load/restprofilereviews', function (req, res, next) {
        const topicSort =req.body.params.sortTopic;
        const dateFilter = new Date(req.body.params.filterDate);
        const topicFilter = req.body.params.filterTopic;
        const newestTopicSort = R.sortWith([
            R.descend(R.prop('creationDate')),
            R.descend(R.prop(topicSort))
        ]);
        const oldestTopicSort = R.sortWith([
            R.ascend(R.prop('creationDate')),
            R.descend(R.prop(topicSort))
        ]);
        restaurantModel.findById(req.body.params.id, "reviews")
            .then(doc =>{
            if(doc != null){
                const reviews = doc.reviews;
                const dateFiltered = R.filter((review) => review.creationDate >= dateFilter ,reviews);
                const topicFiltered = R.filter((review) => review[topicSort] >= topicFilter,dateFiltered);
                const sorted = req.body.params.sortDate === "newFirst" ? newestTopicSort(topicFiltered) : oldestTopicSort(topicFiltered);
                const skipped = R.slice(req.body.params.skip, Infinity,sorted);
                const response = R.slice(0,5,skipped);
                res.json({id: doc._id,
                          reviews: response,
                          skip: req.body.params.skip
                });
            }
            else  res.json({id: "",
                            reviews: []
            });
        })

    });
};

