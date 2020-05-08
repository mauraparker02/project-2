// Function to build the quiz in the quizstructure: 
$(function () {
  let type1 = 0;
  let type2 = 0;
  let type3 = 0;
  let type4 = 0;

  const div = $("#sug-breed");
  const city = $("#city-location");
  const locationError = $("#location-error");

  $("#find-breed").on("click", function (e) {
    e.preventDefault();
    if (city.val() === "") {
      console.log("empty")
      locationError.empty();
      locationError.append($("<p>").text("Location input cannot be blank!"));
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
    div.empty();
    div.append($("<h3>").text(dog.name))
    div.append($("<h4>").text(dog.breed_group))
    div.append($("<h4>").text(dog.bred_for))
    div.append($("<h4>").text(dog.life_span))
    div.append($("<h4>").text(dog.height.imperial))
    div.append($("<h4>").text(dog.weight.imperial))

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
  };
});





