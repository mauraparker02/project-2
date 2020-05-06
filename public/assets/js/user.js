
//The type of dog that would be best suited to an owner who's the type of person to garden 
var type1 = ["Curious", "Fun-loving", "Aloof", "Clownish", "Hardworking", "Intelligent", "Docile", "Faithful", "Loving", "Responsible", "Affectionate", "Reserved", "Sweet-Tempered", "Steady", "Reliable", "Cautious", "Companionable", "Amiable", "Calm", "Good-tempered", "Sensitive", "Familial", "Quiet", "Patient", "Merry", "Trustworthy", "Thoughtful", "Cat-like", "Benevolent", "Diligent"];

//The type of dog that would be best suited to an owner who's the type of person to own a boat 
var type2 = ["Adventurous", "Dignified", "Happy", "Wild", "Confident", "Courageous", "Protective", "Assertive", "Dominant", "Bold", "Proud", "Spirited", "Rugged", "Refined", "Joyful", "Self-confidence", "Watchful", "Cheerful", "Territorial", "Rational", "Powerful", "Suspicious", "Vocal", "Cunning", "Self-important", "Generous", "Bubbly", "Opinionated", "Spunky", "Fast"];

//The type of dog that would be best suited to an owner who's the type of person to go on long hikes  
var type3 = ["Active", "Independent", "Dutiful", "Friendly", "Brave", "Composed", "Trainable", "Gentle", "Obedient", "Kind", "Tenacious", "Fearless", "Self-assured", "Good-natured", "Even Tempered", "Determined", "Hardy", "Easygoing", "Adaptable", "Lovable", "Stable", "Tolerant", "Athletic", "Respectful", "Charming", "Unflappable", "Willful", "Vigilant"];

//The type of dog that would be best suited to an owner who loves to play competetive sports 
var type4 = ["Stubborn", "Playful", "Outgoing", "Alert", "Loyal", "Responsive", "Receptive", "Energetic", "Devoted", "Strong Willed", "Attentive", "Lively", "Eager", "Fierce", "Agile", "Excitable", "Hard-working", "Feisty", "Trusting", "Keen", "Bright", "Quick", "Gay", "Inquisitive", "Strong", "Sociable", "Great-hearted", "Mischievous", "People-Oriented", "Boisterous", "Cooperative", "Sturdy", "Clever", "Aggressive", "Extroverted",];

var type1Breed = []
var type2Breed = []
var type3Breed = []
var type4Breed = []

var allBreeds = []
//counter pseduo: everytime we get a match and then the push only happens if that counter hits 2 times 


//This code essentially sorts out which breeds are a "type1" dog based on the temperments listed in the type1 variable they must have at least 3 keyterms in the dataset to be considred a "type1" dog 
$.ajax({
  method: "GET",
  url: "https://api.thedogapi.com/v1/breeds?attach_breed=0",
  Headers: {
    "X-Api-Key": "c084c79c-3f23-4339-9e9a-844d804bc65d"
  }
}).then(function (res) {
  // console.log(res.name)
  for (let i = 0; i < res.length; i++) {
    if (res[i].name && res[i].temperament) {
      let breed = res[i].name;
      allBreeds.push(breed) //how many breeds are there anyway? that's the answer to that question. 
      let type1Counter = 0;
      let type2Counter = 0;
      let type3Counter = 0;
      let type4Counter = 0;
      let individualTemperament = res[i].temperament.split(", ") //all of the temperments for all of the breeds into their own arrays 
      // console.log(individualTemperament) //this is an array 
      for (let j = 0; j < individualTemperament.length; j++) {

        //Here is where the loops starts to go through all of the different types of dogs 
        //loop for type2, type3, type4 is a silbing loop of type1 

        for (let k = 0; k < type1.length; k++) {
          if (individualTemperament[j] === type1[k]) {
            type1Counter++;
          }
        }
        for (let l = 0; l < type2.length; l++) {
          if (individualTemperament[j] === type2[l]) {
            type2Counter++;
          }
        }
        for (let m = 0; m < type3.length; m++) {
          if (individualTemperament[j] === type3[m]) {
            type3Counter++;
          }
        }
        for (let n = 0; n < type4.length; n++) {
          if (individualTemperament[j] === type4[n]) {
            type4Counter++;
          }
        }
        // console.log(type1Breed.includes(res.name[i]))
        // console.log(res.name)
      }
      if (type1Counter >= 3) {
        if (type1Breed.includes(breed) === false) {
          type1Breed.push(breed);
        }
      }
      if (type2Counter >= 3) {
        if (type2Breed.includes(breed) === false) {
          type2Breed.push(breed);
        }
      }
      if (type3Counter >= 2) {
        if (type3Breed.includes(breed) === false) {
          type3Breed.push(breed);
        }
      }
      if (type4Counter >= 3) {
        if (type4Breed.includes(breed) === false) {
          type4Breed.push(breed);
        }
      }
    }
  }
})

// console.log(allBreeds)
console.log(type1Breed)
console.log(type2Breed)
console.log(type3Breed)
console.log(type4Breed)


//now to filter this down further: 


//turn the typenumBreed into a variable the result 

//append it as answers to a question on the html 

//Quiz with 9 questions based on personality 
  //3 differnt times they answered equally type1, type2, type3 
  //easy fix would be recommending like 3 dogs 
  //use math.random to select 3 random dogs from that array 

  // Function to build the quiz in the quizstructure: 



