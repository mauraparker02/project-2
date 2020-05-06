const db = require("../models");
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/adopt", function(req, res) {
    res.render("user");
});

router.get("/shelterHelper", function(req, res) {
    res.render("breeder");
});

router.get("/add", function(req, res) {
    res.render("addShelter");
});

router.post("/api/shelters", function(req, res) {
    // console.log(req.body);
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        if(data.length === 1) {
            // console.log(data);
            // console.log(data[0].dataValues.id);
            // const hbsObj = {
            //     shelter: data
            // }
            // res.render("addShelter", hbsObj);
            // res.json(data);
            // const id = data[0].dataValues.id;
            // displayShelterDogs(id);
            res.json({ id: data[0].dataValues.id });
        } else {
            db.Shelter.create({
                name: req.body.name,
                city: req.body.city
            }).then(function(response) {
                console.log('created');
                res.json(response);
                // res.render("addShelter", )
            });
        }
    });
});

router.post("/api/shelterDogs", function(req, res) {
    // console.log(req.body);
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        if(data.length === 1) {
            // res.json(data);
            db.ShelterDogs.create({
                dogName: req.body.dogName,
                breed: req.body.breed,
                ShelterId: data[0].id
            }).then(function(response) {
                console.log("dog created");
                res.json(response);
            });
        }
    });
});

router.get("/api/shelters/:id", function(req, res) {
    // console.log(id);
    db.Shelter.findOne({
        where: {
            id: req.params.id
        },
        include: [db.ShelterDogs]
    }).then(function(data) {
        // console.log(data.dataValues);

        res.json(data.dataValues);
    });
})

module.exports = router;