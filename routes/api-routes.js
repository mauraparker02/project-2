const db = require("../models");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
    res.render("index");
});

// SHOW ALL INFORMATION FROM DATABASE //
router.get("/shelterHelper/home", function (req, res) {
    db.Result.findAll({}).then(function (data) {
        res.render("breeder", {
            dog: data
        })
    })
})

// SHOW WHAT BREED USER SELECTED //
router.get("/breeds/:breed", function (req, res) {
    console.log(req.params.breed);
    db.Result.findAll({
        where: {
            breed: req.params.breed
            }
        }).then(function (data) {
            res.json(data)
        })
    })

// SHOW WHAT LOCATION USER SELECTED //
router.get("/location/:location", function (req, res) {
    console.log(req.params.location);
    db.Result.findAll({
        where: {
            city: req.params.location
            }
        }).then(function (data) {
            res.json(data)
        })
    }) 

router.get("/adopt", function (req, res) {
    res.render("user");
});

router.get("/add", function (req, res) {
    res.render("addShelter");
});

router.post("/api/shelters", function(req, res) {
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        if(data.length === 1) {
            res.json({ id: data[0].dataValues.id });
        } else {
            db.Shelter.create({
                name: req.body.name,
                city: req.body.city
            }).then(function(response) {
                console.log('created');
                res.json({ id: response.dataValues.id});
            });
        }
    });
});

router.post("/api/shelterDogs", function(req, res) {
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        let state = [];
        if(data.length === 0) {
            return res.json({id:-1});
        } else {
            res.json({ id: data[0].dataValues.id });
            for (let i = 0; i < data[0].dataValues.ShelterDogs.length; i++) {
                if(data[0].dataValues.ShelterDogs[i].dogName === req.body.dogName && data[0].dataValues.ShelterDogs[i].breed === req.body.breed){
                    state.push(req.body.dogName);
                }
            }
    
            if(state.length === 0) {
                db.ShelterDogs.create({
                    dogName: req.body.dogName,
                    breed: req.body.breed,
                    ShelterId: data[0].id
                }).then(function(response) {
                    console.log("dog created");
                });
            }
        }
    });
});

router.get("/api/shelters/:id", function(req, res) {
    db.Shelter.findOne({
        where: {
            id: req.params.id
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        res.json(data.dataValues);
    });
});

module.exports = router;