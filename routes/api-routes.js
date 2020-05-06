const db = require("../models");
const express = require("express");
const router = express.Router();
const axios = require("axios");

// console.log(db.Result);

router.get("/", function (req, res) {
    res.render("index");
});

// SHOW ALL BREED DATA FROM DATABASE //
router.get("/shelterHelper/breeds", function (req, res) {
    console.log("hitting route");
    db.Result.findAll({}).then(function (data) {
        res.render("breeder", {
            dog: data
        })
    })
})

// router.get("/breeds/:breed", function(req, res){
//     sequelize.query(`SELECT * FROM results WHERE city = ? ORDER BY breed;`, 
//     {
//         replacements:[req.params.breed],
//         type:QueryTypes.SELECT
//     })
//     .then(function(data){
//         console.log(data)
//     })
// })

// SHOW ALL LOCATION DATA FROM DATABASE  //
router.get("/shelterHelper/location", function (req, res) {
    console.log("hitting route");
    db.Result.findAll({}).then(function (data) {
        console.log(data[0].dataValues)
        res.render("breeder", {
            dog: data
        })
    })
})

// SHOW WHAT USER SELECTED //
router.get("/breeds/:breed", function (req, res) {
    console.log(req.params.breed);
    db.Result.findAll({
        where: {
            breed: req.params.breed
            }
        }).then(function (data) {
            console.log(data)
            console.log(typeof data.dataValues)
            res.render("breeder", {
                dog: data
            })
        })
    })

router.get("/adopt", function (req, res) {
    res.render("user");
});

// router.get("/shelterHelper", function (req, res) {
//     res.render("breeder");
// });

router.get("/add", function (req, res) {
    res.render("addShelter");
});

// axios({

// });

// app.get("/", function(req, res){
//     res.send("Hello World");
// });


module.exports = router;