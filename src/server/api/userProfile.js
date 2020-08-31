let axios = require("axios");
let UserModel = require("../model/user");
let restaurantModel = require("../model/restaurant");
let ObjectId = require("mongodb").ObjectID;

//create user

module.exports = app => {
  //for userProfile
  app.post("/api/user/info", function(req, res, next) {
    console.log(req.body);
    UserModel.findOne({ username: req.body.user },{reviews: 0})
      .then(doc => {
        if (doc != null) {
          // console.log("username found for info=", req.body.user);
          // console.log("results= ", doc);
          res.json(doc);
        } else {
          res.end();
        }
      })
      .catch(err => next(err));
  });

    app.post('/api/user/getReviews', function (req, res, next) {

        UserModel.findOne({username: req.body.params.username},{reviews: {$slice:[req.body.params.skip,5]}})
            .then(doc =>{
                console.log("skip = ",req.body.params.skip,doc);
                if(doc != null){
                    res.json(doc)
                }
                else  res.json({id: "",
                    reviews: []
                });
            }).catch(err => next(err));

    });

  //to update user
  app.post("/api/user/update", function(req, res, next) {
    console.log(req.body);
    UserModel.updateOne(
      { _id: ObjectId(req.body.details.id) },
      {
        $set: {
          username: req.body.details.username,
          firstname: req.body.details.firstname,
          lastname: req.body.details.lastname,
          password: req.body.details.password,
          location: req.body.details.location,
          image: req.body.details.image
        }
      }
    )
      .then(doc => {
        if (doc != null) {
          console.log("username found for update =", req.body.details.username);
          console.log("results= ", doc);
          res.json(doc);
        } else {
          res.end();
        }
      })
      .catch(err => next(err));
  });
  app.post("/api/review/delete", function(req, res, next) {
    console.log(req.body);
    UserModel.findOne({ username: req.body.details.username })
      .then(doc => {
        const review = doc.reviews[req.body.details.id];
        if (doc != null) {
          let before = doc.reviews.length;
          doc.reviews.splice(req.body.details.id, 1);
          if (before === doc.reviews.length + 1) {
            console.log("reviews after remove=", doc.reviews);
            doc.save();
            restaurantModel
            .updateOne({
                name: review.restaurant.name,
                location: review.restaurant.location},
              {$pull:{reviews: {creationDate: new Date(req.body.details.creationDate), "reviewer.username": req.body.details.username}}
            })
            .then(resdoc => {
                if (resdoc != null) {
                    restaurantModel.findOne({
                        name: review.restaurant.name,
                        location: review.restaurant.location},
                        "reviews"
                    ).then(reviews =>{
                        console.log(reviews);
                        if(reviews.reviews.length === 0){
                            console.log("removing restaurant" + review.restaurant.name);
                            restaurantModel.findOneAndDelete({
                                name: review.restaurant.name,
                                location: review.restaurant.location}).then(result =>{
                                res.json(resdoc);
                        });
                        }
                        else{
                            res.json(resdoc);
                        }
                    });
              } else {
                res.end();
              }
          })
          .catch(err => next(err));
          } else {
              res.end();
          }
        } else {
            res.end();
        }
      })
      .catch(err => next(err));
  });
};
