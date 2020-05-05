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

// axios({

// });

    // app.get("/", function(req, res){
    //     res.send("Hello World");
    // });


module.exports = router;