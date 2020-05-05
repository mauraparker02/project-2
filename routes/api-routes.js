const db = require("../models");
const express = require("express");
const router = express.Router();

console.log(db.Result);

router.get("/", function(req, res) {
    res.render("index");
});

// GETTING BREED DATA FROM DATABASE //
router.get("/breeds", function(req,res){
    console.log("hitting route");
    db.Result.findAll({}).then(function(data){
        res.render("breeder", {
            dog: data
        })
    })
})

//GETTING LOCATION DATA FROM DATABASE //
router.get("/location", function(req,res){
    console.log("hitting route");
    db.Result.findAll({}).then(function(data){
        console.log(data[0].dataValues)
        res.render("breeder", {
            dog: data
        })
    })
})

router.get("/adopt", function(req, res) {
    res.render("user");
});

router.get("/shelterHelper", function(req, res) {
    res.render("breeder");
});

    // app.get("/", function(req, res){
    //     res.send("Hello World");
    // });


module.exports = router;
