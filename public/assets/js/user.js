// Function to build the quiz in the quizstructure: 
$(function () {
  let type1 = 0;
  let type2 = 0;
  let type3 = 0;
  let type4 = 0;

  const sugDiv = $("#sug-breed");
  const closeDiv = $("#dogs-close-by");
  const city = $("#city-location");
  const locationError = $("#location-error");

  $("#find-breed").on("click", function (e) {
    e.preventDefault();
    if (city.val() === "") {
      locationError.empty();
      locationError.append($("<p>").addClass("error").text("Location input cannot be blank!"));
      setTimeout(function () {
        locationError.empty();
      }, 5000);
    } else {
      let selected1 = $('input[name="question1"]:checked').val();
      console.log(selected1)
      counter(selected1)
      let selected2 = $('input[name="question2"]:checked').val();
      console.log(selected2)
      counter(selected2)
      let selected3 = $('input[name="question3"]:checked').val();
      console.log(selected3)
      counter(selected3)
      let selected4 = $('input[name="question4"]:checked').val();
      console.log(selected4)
      counter(selected4)
      let selected5 = $('input[name="question5"]:checked').val();
      console.log(selected5)
      counter(selected5)
      let selected6 = $('input[name="question6"]:checked').val();
      console.log(selected6)
      counter(selected6)
      let selected7 = $('input[name="question7"]:checked').val();
      console.log(selected7)
      counter(selected7)

      //at the end
      if ((type1 > type2) && (type1 > type3) && (type1 > type4)) {
        $.ajax("/api/type1", {
          type: "GET"
        }).then(function (dog) {
          renderDog(dog);
        });
      } else if (((type2 > type1) && (type2 > type3) && (type2 > type4))) {
        $.ajax("/api/type2", {
          type: "GET"
        }).then(function (dog) {
          renderDog(dog);
        });
      } else if (((type3 > type1) && (type3 > type2) && (type3 > type4))) {
        $.ajax("/api/type3", {
          type: "GET"
        }).then(function (dog) {
          renderDog(dog);
        });
      } else if (((type4 > type1) && (type4 > type2) && (type4 > type3))) {
        $.ajax("/api/type4", {
          type: "GET"
        }).then(function (dog) {
          renderDog(dog);
        });
      } else {
        $.ajax("/api/type1", {
          type: "GET"
        }).then(function (dog) {
          renderDog(dog);
        });
      }

      function counter(answer) {
        switch (answer) {
          case '1': type1++;
            break;
          case '2': type2++;
            break;
          case '3': type3++;
            break;
          case '4': type4++;
            break;
        }
      }

      console.log(type1)
      console.log(type2)
      console.log(type3)
      console.log(type4)

      type1 = 0;
      type2 = 0;
      type3 = 0;
      type4 = 0;
    }
  });

  function renderDog(dog) {
    sugDiv.empty();
    sugDiv.append($("<h3>").text(`Breed: ${dog.name}`))
    sugDiv.append($("<h4>").text(`Breed Group: ${dog.breed_group}`))
    sugDiv.append($("<h4>").text(`Dog Bred For: ${dog.bred_for}`))
    sugDiv.append($("<h4>").text(`Life Span: ${dog.life_span}`))
    sugDiv.append($("<h4>").text(`Avgerage Height: ${dog.height.imperial}`))
    sugDiv.append($("<h4>").text(`Average Weight: ${dog.weight.imperial}`))

    const userInfo = {
      breed: dog.name,
      city: city.val().toLowerCase().trim()
    }
    $.ajax("/api/results", {
      type: "POST",
      data: userInfo
    }).then(function (data) {
      console.log("saved");
    });

    $.ajax("/api/shelterDogs/close/" + userInfo.city, {
      type: "GET"
    }).then(function (shelters) {
      console.log(shelters);
      closeDiv.empty();
      const adoptableDogs = [];
      const adoptableShelters = [];
      if (shelters.length === 0) {
        closeDiv.append($("<h3>").text("Sorry no shelters in your area, please try another location or add a shelter with dogs!"));
      } else {
        for (let i = 0; i < shelters.length; i++) {
          for (let j = 0; j < shelters[i].ShelterDogs.length; j++) {
            if (shelters[i].ShelterDogs[j].breed === dog.name.toLowerCase()) {
              // console.log(shelters[i].ShelterDogs[j].dogName);
              adoptableShelters.push(shelters[i]);
              adoptableDogs.push(shelters[i].ShelterDogs[j].dogName);
            }
          }
        }
        console.log(adoptableDogs);
        if (adoptableDogs.length === 0) {
          closeDiv.append($("<h3>").text(`Sorry there are no ${dog.name}'s in your area.`));
        } else {
          for (let i = 0; i < adoptableShelters.length; i++) {
            closeDiv.append($("<h3>").text("Shelter Name: " + adoptableShelters[i].name));
            closeDiv.append($("<h3>").text("Shelter City: " + adoptableShelters[i].city));
            closeDiv.append($("<h3>").text("Dog Name: " + adoptableDogs[i]));
          }
        }
      }
    });
  };
});





