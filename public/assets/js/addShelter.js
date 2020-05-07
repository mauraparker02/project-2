$(function () {
    const shelterName = $("#shelter-name");
    const shelterCity = $("#city-name");
    const dogName = $("#dog-name");
    const dogBreed = $("#dog-breed");

    $("#find-add").on("click", function (e) {
        e.preventDefault();
        const shelter = {
            name: shelterName.val().toLowerCase().trim(),
            city: shelterCity.val().toLowerCase().trim(),
        };
        if (shelterName.val() === "" || shelterCity.val() === "") {
            $("#shelter-error").empty();
            $("#shelter-error").append($("<p>").text("Shelter name and city cannot be blank!"));
            setTimeout(function () {
                $("#shelter-error").empty();
            }, 5000);
        } else {
            $.ajax("/api/shelters", {
                type: "POST",
                data: shelter
            }).then(function (res) {
                const id = res.id;

                $.ajax("/api/shelters/" + id, {
                    type: "GET"
                }).then(function (data) {
                    $("#title").empty();
                    $("#table-body").empty();

                    $("#title").append($("<h3>").addClass("cap").text(`${data.name} in ${data.city}`));
                    for (let i = 0; i < data.ShelterDogs.length; i++) {
                        $("#table-body").append($("<tr>")).append($("<td>").addClass("cap").text(data.ShelterDogs[i].dogName)).append($("<td>").addClass("cap").text(data.ShelterDogs[i].breed)).append($("<button>").text("Adopted").addClass("delete-btn"));
                    }
                });
            });
        }
    });

    $("#add-dog").on("click", function (e) {
        e.preventDefault();
        const dog = {
            name: shelterName.val().toLowerCase().trim(),
            city: shelterCity.val().toLowerCase().trim(),
            dogName: dogName.val().toLowerCase().trim(),
            breed: dogBreed.val().toLowerCase().trim(),
        };

        if (shelterName.val() === "" || shelterCity.val() === "" || dogName.val() === "" || dogBreed.val() === "") {
            $("#dog-error").empty();
            $("#dog-error").append($("<p>").text("All fields must have a value!"));
            setTimeout(function () {
                $("#dog-error").empty();
            }, 5000);
        } else {
            $.ajax("/api/shelterDogs", {
                type: "POST",
                data: dog
            }).then(function (res) {
                const id = res.id;
                if (res.id > 0) {
                    $.ajax("/api/shelters/" + id, {
                        type: "GET"
                    }).then(function (data) {
                        $("#title").empty();
                        $("#table-body").empty();


                        $("#title").append($("<h3>").addClass("cap").text(`${data.name} in ${data.city}`));
                        for (let i = 0; i < data.ShelterDogs.length; i++) {
                            $("#table-body").append($("<tr>")).append($("<td>").addClass("cap").text(data.ShelterDogs[i].dogName)).append($("<td>").addClass("cap").text(data.ShelterDogs[i].breed)).append($("<button>").text("Adopted").addClass("delete-btn"));
                        }

                        document.getElementById("dog-name").value = "";
                        document.getElementById("dog-breed").value = "";
                    });
                } else {
                    $("#dog-error").empty();
                    $("#dog-error").append($("<p>").text("Shelter not found, must create one first!"));
                    setTimeout(function () {
                        $("#dog-error").empty();
                    }, 5000);
                }
            });
        }
    });

    $(".delete-btn").on("click", function(e) {
        e.preventDefault();
        console.log("clicked")
    });

    // function firstLetCap(str) {
    //     let splitStr = str.split
    // }
});