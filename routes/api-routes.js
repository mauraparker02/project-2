const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.render("index")
})
    // app.get("/", function(req, res){
    //     res.send("Hello World");
    // });


module.exports = router;