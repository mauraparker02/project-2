const db = require("../models");
const express = require("express");
const router = express.Router();
// const sequelize = require("sequelize");
const {QueryTypes} = require('sequelize');

const axios = require("axios");

router.get("/", function (req, res) {
    res.render("index");
});

// SHOW ALL INFORMATION FROM DATABASE //
router.get("/shelterHelper/home", async function (req, res) {
    console.log('im before the queries')
    const breeds = await db.sequelize.query("SELECT DISTINCT breed FROM `Results`", {
        type: QueryTypes.SELECT
    } );
    const location = await db.sequelize.query("SELECT DISTINCT city FROM `Results`", {
        type: QueryTypes.SELECT
    } );
    console.log('im after the queries and before the res')
    console.log(breeds)
    console.log(location)
    res.render("breeder", {
        dog: breeds,
        location: location
    })
    // db.Result.findAll({}).then(function (data) {
    //     console.log(data)
    //     const newBreed = [];
    //     for(i=0; i<data.length; i++) {
    //         console.log(data[i].dataValues.breed)
    //         if(newBreed.indexOf(data[i].dataValues.breed) === -1) {
    //             newBreed.push(data[i].dataValues.breed)
    //         }
    //     }
    //     res.render("breeder", {
    //         dog: newBreed
    //     })
    // })
})

// SHOW WHAT BREED USER SELECTED //
router.get("/breeds/:breed", function (req, res) {
    console.log(req.params.breed);
    db.Result.findAll({
        where: {
            breed: req.params.breed
            },
            attributes: ['city', 'breed',[db.sequelize.fn('count', db.sequelize.col('city')), 'cnt']],
            group: ['city']
        }).then(function (data) {
            res.json(data)
        })
    })

// SHOW WHAT LOCATION USER SELECTED //
router.get("/location/:location", function (req, res) {
    console.log(req.params.location);
    // https://stackoverflow.com/questions/22627258/how-does-group-by-works-in-sequelize
    db.Result.findAll({
        where: {
            city: req.params.location
            },
        attributes: ['breed', 'city',[db.sequelize.fn('count', db.sequelize.col('breed')), 'cnt']],
        group: ['breed']
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