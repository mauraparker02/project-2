var express = require("express");
var router = express.Router();
const db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res){
        res.send("Hello World");
    });

    // GETTING BREED DATA FROM DATABASE //
    router.get("/breeds", function(req,res){
        console.log("hitting route");
        dog.breed(function(data){
            res.render("breeder", {
                dog: data
            })
        })
    })

    // GETTING LOCATION DATA FROM DATABASE //
    router.get("/location", function(req,res){
        console.log("hitting route");
        dog.city(function(data){
            res.render("breeder", {
                dog: data
            })
        })
    })

};