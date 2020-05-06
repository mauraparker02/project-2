//This is how to filter out all of the keywords for temperment 

var list;

$.ajax({
  method: "GET",
  url: "https://api.thedogapi.com/v1/breeds?attach_breed=0",
  Headers: {
    "X-Api-Key": "c084c79c-3f23-4339-9e9a-844d804bc65d"
  }
}).then(function (res) {
  var list = []; 
  console.log(res[0])
  for (let i = 0; i < res.length; i++) {
    if (res[i].temperament){
    let keywords = res[i].temperament.split(", ");
    // console.log(res[i].temperament)
    // console.log(keywords)
    for (let j = 0; j < keywords.length; j++) {
      if (list.indexOf(keywords[j]) === -1){
        list.push(keywords[j])
      }
    }
  }
  else{
   console.log("null data")
  }
    console.log("one", list);
  }
console.log("two", list); 
return list; 
})
//define the functions and their logic, then call them after 36 
console.log("three", list)


  var keywords = (res[0].temperament.split(", "));
  console.log(keywords)
  for (let i=0; i < keywords.length; i++){
    //let the index start at zero, the loop ends at the end of the index of keywords, loop through forward 
    console.log(keywords[i]);
    if (list.includes(keywords[i]) === false){
      list.push(keywords[i])
    }
  }

