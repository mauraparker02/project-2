// Route to entire API 
https://api.thedogapi.com/v1/breeds

//test: 
/*Take a sample size of 20 dog breeds, analyze the keywords for tempermant and develop a form that would use these keywords in the API
*/

//running a test to grab several dog breeds 
breedQueryURL = "https://api.thecatapi.com/v1/breeds/search?q=" + partBreedName ;
// &limit=1



$.ajax({
    //cors must be enabled 
    url: cors + breedQueryURL,//cors 
    headers: {
        "user-key": "c084c79c-3f23-4339-9e9a-844d804bc65d" //TheDogAPI key 
    },
    method: "POST"
}).then(function(breedResponse) {
    console.log(breedResponse);
    localStorage.setItem("info", JSON.stringify(breedResponse));
    // location.href = ;
}).catch(function(error) {
    console.log(error);
});
});