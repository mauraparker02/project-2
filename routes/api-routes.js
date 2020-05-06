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

// axios({

// });

// app.get("/", function(req, res){
//     res.send("Hello World");
// });


module.exports = router;