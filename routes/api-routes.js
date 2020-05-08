const db = require("../models");
const express = require("express");
const router = express.Router();
// const sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const axios = require("axios");

router.get("/", function (req, res) {
    res.render("index");
});

// SHOW ALL INFORMATION FROM DATABASE //
router.get("/shelterHelper/home", async function (req, res) {
    console.log('im before the queries')
    const breeds = await db.sequelize.query("SELECT DISTINCT breed FROM `Results`", {
        type: QueryTypes.SELECT
    });
    const location = await db.sequelize.query("SELECT DISTINCT city FROM `Results`", {
        type: QueryTypes.SELECT
    });
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
        attributes: ['city', 'breed', [db.sequelize.fn('count', db.sequelize.col('city')), 'cnt']],
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
        attributes: ['breed', 'city', [db.sequelize.fn('count', db.sequelize.col('breed')), 'cnt']],
        group: ['breed']
    }).then(function (data) {
        res.json(data)
    })
})

router.get("/adopt", function (req, res) {
    res.render("user");
});

router.get("/quiz", function (req, res){
    const allQuestions= {
        questions: [ {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            key: "1"
            
        },
        {
            question: "Pick an outdoor activity",
            answers: {
                a: "Gardening", //all answers that are a should correlate with data from array type1 
                b: "Boating", //all answers that are a should correlate with data from array type2
                c: "Hiking", //all answers that are a should correlate with data from array type3
                d: "Playing a competitive sport", //all answers that are a should correlate with data from array type4 
            },
            key: "2"
            
        },]
    }
    res.render("user", allQuestions)
})

// THESE ROUTES LEAD TO THE TYPES 

//The type of dog that would be best suited to an owner who's the type of person to garden 
var type1 = ["Curious", "Fun-loving", "Aloof", "Clownish", "Hardworking", "Intelligent", "Docile", "Faithful", "Loving", "Responsible", "Affectionate", "Reserved", "Sweet-Tempered", "Steady", "Reliable", "Cautious", "Companionable", "Amiable", "Calm", "Good-tempered", "Sensitive", "Familial", "Quiet", "Patient", "Merry", "Trustworthy", "Thoughtful", "Cat-like", "Benevolent", "Diligent"];
//The type of dog that would be best suited to an owner who's the type of person to own a boat 
var type2 = ["Adventurous", "Dignified", "Happy", "Wild", "Confident", "Courageous", "Protective", "Assertive", "Dominant", "Bold", "Proud", "Spirited", "Rugged", "Refined", "Joyful", "Self-confidence", "Watchful", "Cheerful", "Territorial", "Rational", "Powerful", "Suspicious", "Vocal", "Cunning", "Self-important", "Generous", "Bubbly", "Opinionated", "Spunky", "Fast"];
//The type of dog that would be best suited to an owner who's the type of person to go on long hikes  
var type3 = ["Active", "Independent", "Dutiful", "Friendly", "Brave", "Composed", "Trainable", "Gentle", "Obedient", "Kind", "Tenacious", "Fearless", "Self-assured", "Good-natured", "Even Tempered", "Determined", "Hardy", "Easygoing", "Adaptable", "Lovable", "Stable", "Tolerant", "Athletic", "Respectful", "Charming", "Unflappable", "Willful", "Vigilant"];
//The type of dog that would be best suited to an owner who loves to play competetive sports 
var type4 = ["Stubborn", "Playful", "Outgoing", "Alert", "Loyal", "Responsive", "Receptive", "Energetic", "Devoted", "Strong Willed", "Attentive", "Lively", "Eager", "Fierce", "Agile", "Excitable", "Hard-working", "Feisty", "Trusting", "Keen", "Bright", "Quick", "Gay", "Inquisitive", "Strong", "Sociable", "Great-hearted", "Mischievous", "People-Oriented", "Boisterous", "Cooperative", "Sturdy", "Clever", "Aggressive", "Extroverted",];
//counter pseduo: everytime we get a match and then the push only happens if that counter hits 2 times 
//This code essentially sorts out which breeds are a "type1" dog based on the temperments listed in the type1 variable they must have at least 3 keyterms in the dataset to be considred a "type1" dog 

router.get("/api/type1", function (req, res) {
    axios('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { 'Authorization': 'Bearer ' + "X-Api-Key:c084c79c-3f23-4339-9e9a-844d804bc65d" } })
        .then(function (data) {
            // console.log(data.data[0])
            var breedList = []
            for (i = 0; i < data.data.length; i++) {
                // console.log(data.data[i])
                if (data.data[i].temperament)
                    temperament = data.data[i].temperament.split(", ")
                console.log(temperament)
                for (j = 0; j < temperament.length; j++) {
                    // console.log(temperament[j])
                    // console.log(temperament[j], type1.indexOf(temperament[j]), type2.indexOf(temperament[j]), type3.indexOf(temperament[j]), type4.indexOf(temperament[j]))
                    if (type1.indexOf(temperament[j]) > -1) {
                        if (breedList.indexOf(data.data[i]) == -1) {
                            breedList.push(data.data[i])
                        }
                    }
                }
            }
            console.log(breedList) //arrays of the dog breeds from type1 
            var randomBreed1= Math.floor(Math.random()*breedList.length)
            console.log(breedList[randomBreed1])
            // res.render("user", { keyName: breedList })
            res.json(breedList[randomBreed1])
        })
})

router.get("/api/type2", function (req, res) {
    axios('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { 'Authorization': 'Bearer ' + "X-Api-Key:c084c79c-3f23-4339-9e9a-844d804bc65d" } })
        .then(function (data) {
            // console.log(data.data[0])
            var breedList = []
            for (i = 0; i < data.data.length; i++) {
                // console.log(data.data[i])
                if (data.data[i].temperament)
                    temperament = data.data[i].temperament.split(", ")
                console.log(temperament)
                for (j = 0; j < temperament.length; j++) {
                    // console.log(temperament[j])
                    // console.log(temperament[j], type1.indexOf(temperament[j]), type2.indexOf(temperament[j]), type3.indexOf(temperament[j]), type4.indexOf(temperament[j]))
                    if (type2.indexOf(temperament[j]) > -1) {
                        if (breedList.indexOf(data.data[i]) == -1) {
                            breedList.push(data.data[i])
                        }
                    }
                }
            }
            console.log(breedList) //arrays of the dog breeds from type1 
            var randomBreed1= Math.floor(Math.random()*breedList.length)
            console.log(breedList[randomBreed1])
            // res.render("user", { keyName: breedList })
            res.json(breedList[randomBreed1])
        })
});

router.get("/api/type3", function (req, res) {
    axios('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { 'Authorization': 'Bearer ' + "X-Api-Key:c084c79c-3f23-4339-9e9a-844d804bc65d" } })
        .then(function (data) {
            // console.log(data.data[0])
            var breedList = []
            for (i = 0; i < data.data.length; i++) {
                // console.log(data.data[i])
                if (data.data[i].temperament)
                    temperament = data.data[i].temperament.split(", ")
                console.log(temperament)
                for (j = 0; j < temperament.length; j++) {
                    // console.log(temperament[j])
                    // console.log(temperament[j], type1.indexOf(temperament[j]), type2.indexOf(temperament[j]), type3.indexOf(temperament[j]), type4.indexOf(temperament[j]))
                    if (type3.indexOf(temperament[j]) > -1) {
                        if (breedList.indexOf(data.data[i]) == -1) {
                            breedList.push(data.data[i])
                        }
                    }
                }
            }
            console.log(breedList) //arrays of the dog breeds from type1 
            var randomBreed1= Math.floor(Math.random()*breedList.length)
            console.log(breedList[randomBreed1])
            // res.render("user", { keyName: breedList })
            res.json(breedList[randomBreed1])
        })
})

router.get("/api/type4", function (req, res) {
    axios('https://api.thedogapi.com/v1/breeds?attach_breed=0', { headers: { 'Authorization': 'Bearer ' + "X-Api-Key:c084c79c-3f23-4339-9e9a-844d804bc65d" } })
        .then(function (data) {
            // console.log(data.data[0])
            var breedList = []
            for (i = 0; i < data.data.length; i++) {
                // console.log(data.data[i])
                if (data.data[i].temperament)
                    temperament = data.data[i].temperament.split(", ")
                console.log(temperament)
                for (j = 0; j < temperament.length; j++) {
                    // console.log(temperament[j])
                    // console.log(temperament[j], type1.indexOf(temperament[j]), type2.indexOf(temperament[j]), type3.indexOf(temperament[j]), type4.indexOf(temperament[j]))
                    if (type4.indexOf(temperament[j]) > -1) {
                        if (breedList.indexOf(data.data[i]) == -1) {
                            breedList.push(data.data[i])
                        }
                    }
                }
            }
            console.log(breedList) //arrays of the dog breeds from type1 
            var randomBreed1= Math.floor(Math.random()*breedList.length)
            console.log(breedList[randomBreed1])
            // res.render("user", { keyName: breedList })
            res.json(breedList[randomBreed1])
        })
})

router.get("/add", function (req, res) {
    res.render("addShelter");
})

router.post("/api/shelters", function (req, res) {
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function (data) {
        if (data.length === 1) {
            res.json({ id: data[0].dataValues.id });
        } else {
            db.Shelter.create({
                name: req.body.name,
                city: req.body.city
            }).then(function (response) {
                console.log('created');
                res.json({ id: response.dataValues.id });
            });
        }
    });
});

router.post("/api/shelterDogs", function (req, res) {
    db.Shelter.findAll({
        where: {
            name: req.body.name,
            city: req.body.city
        },
        include: [db.ShelterDogs]
    }).then(function (data) {
        let state = [];
        if (data.length === 0) {
            return res.json({ id: -1 });
        } else {
            for (let i = 0; i < data[0].dataValues.ShelterDogs.length; i++) {
                if (data[0].dataValues.ShelterDogs[i].dogName === req.body.dogName && data[0].dataValues.ShelterDogs[i].breed === req.body.breed) {
                    state.push(req.body.dogName);
                }
            }

            if (state.length === 0) {
                db.ShelterDogs.create({
                    dogName: req.body.dogName,
                    breed: req.body.breed,
                    ShelterId: data[0].id
                }).then(function (response) {
                    console.log("dog created");
                    res.json({ id: data[0].dataValues.id });
                });
            }
        }
    });
});

router.get("/api/shelters/:id", function (req, res) {
    db.Shelter.findOne({
        where: {
            id: req.params.id
        },
        include: [db.ShelterDogs]
    }).then(function (data) {
        res.json(data.dataValues);
    });
});

router.post("/api/results", function (req, res) {
    // console.log(req.body);
    db.Result.create({
        breed: "American Bully",
        city: req.body.city
    }).then(function (response) {
        res.end();
    });
});

router.delete("/api/shelterDogs/:id", function(req, res) {
    db.ShelterDogs.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(data) {
        res.json(data);
    });
});

module.exports = router;