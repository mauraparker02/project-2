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
    console.log(req.body);
    db.Shelter.create(req.body).then(function(data) {
        res.json(data);
    });
});

// axios({

// });

    // app.get("/", function(req, res){
    //     res.send("Hello World");
    // });


module.exports = router;