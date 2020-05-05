const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("index");
});

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