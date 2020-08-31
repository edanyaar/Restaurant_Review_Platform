let axios = require('axios');
let UserModel = require('../model/user');
let ObjectId = require('mongodb').ObjectID;

//create user
module.exports = (app) => {
    app.post('/api/user', function (req, res, next) {
        let user = new UserModel(req.body.user);
        user.save();
        res.json("success");
        console.log('user create=', req.body);

    });

    //if user exist in signUp
    app.post('/api/user/find', function (req, res, next) {
        UserModel.findOne({username: req.body.username})
            .then(doc => {
                if (doc != null) {
                    console.log('username found=', req.body.username);
                    res.json("username already exists");
                } else {
                    res.json("OK")
                }
            }).catch((err) => next(err));
    });

    //for topBar
    app.post('/api/user/find/photo', function (req, res, next) {
        UserModel.findOne({username: req.body.username})
            .then(doc => {
                if (doc != null) {
                    console.log('username found=', req.body.username);
                    res.json(doc.image);
                } else {
                    res.json("Failed")
                }
            }).catch((err) => next(err));
    });
//for login
    app.post('/api/user/login', function (req, res, next) {
        UserModel.findOne({username: req.body.details.username, password: req.body.details.password})
            .then(doc => {
                if (doc != null) {
                    console.log('username found=', req.body.details.username);
                    console.log("results=",doc);
                    res.json("Success");
                } else {
                    res.json("Failed")
                }
            }).catch((err) => next(err));
    });

    app.post('/api/user/search', function (req, res, next) {
        if(req.body.params.username.length === 0){
            UserModel.find({location: {$regex: req.body.params.location, $options: 'i'}},
                "firstname lastname username location image",
                {skip: req.body.params.skip})
                .limit(10)
                .then(doc => {
                    if (doc != null) {
                        res.json(doc);
                    } else {
                        res.json("Failed")
                    }
                });
        }
        else if(req.body.params.location.length === 0){
            UserModel.find({$or: [{username: {$regex: req.body.params.username, $options: 'i'}},
                        {firstname: {$regex: req.body.params.username, $options: 'i'}},
                        {lastname: {$regex: req.body.params.username, $options: 'i'}}],},
                "firstname lastname username location image",
                {skip: req.body.params.skip})
                .limit(10)
                .then(doc => {
                    if (doc != null) {
                        res.json(doc);
                    } else {
                        res.json("Failed")
                    }
                });
        }
        else{
            UserModel.find({$or: [{username: {$regex: req.body.params.username, $options: 'i'}},
                        {firstname: {$regex: req.body.params.username, $options: 'i'}},
                        {lastname: {$regex: req.body.params.username, $options: 'i'}}],
                    location: {$regex: req.body.params.location, $options: 'i'}},
                "firstname lastname username location image",
                {skip: req.body.params.skip})
                .limit(10)
                .then(doc => {
                    if (doc != null) {
                        res.json(doc);
                    } else {
                        res.json("Failed")
                    }
                });
        }
    });

};
