$(function () {
    const shelterName = $("#shelter-name");
    const shelterCity = $("#city-name");
    const dogName = $("#dog-name");
    const dogBreed = $("#dog-breed");



    $("#find-add").on("click", function (e) {
        e.preventDefault();
        const shelter = {
            name: shelterName.val().trim(),
            city: shelterCity.val().trim(),
        };
        // console.log(shelterName);
        // console.log(shelter);
        if (shelterName.val() === "" || shelterCity.val() === "") {
            // console.log('cant do that')
            $("#shelter-error").append($("<p>").text("Shelter name and city cannot be blank!"));
            setTimeout(function () {
                $("#shelter-error").empty();
            }, 3000);
        } else {
            $.ajax("/api/shelters", {
                type: "POST",
                data: shelter
            }).then(function (res) {
                // console.log(res);

                const id = res.id;

                $.ajax("/api/shelters/" + id, {
                    type: "GET"
                }).then(function (data) {
                    $("#title").empty();
                    $("#table-body").empty();

                    $("#title").append($("<h3>").text(`${data.name} in ${data.city}`));
                    for (let i = 0; i < data.ShelterDogs.length; i++) {
                        $("#table-body").append($("<tr>").append($("<td>").text(data.ShelterDogs[i].dogName)).append($("<td>").text(data.ShelterDogs[i].breed)));
                    }
                });
            });
        }
    });

    $("#add-dog").on("click", function (e) {
        e.preventDefault();
        const dog = {
            name: shelterName.val().trim(),
            city: shelterCity.val().trim(),
            dogName: dogName.val().trim(),
            breed: dogBreed.val().trim(),
        };

        if (shelterName.val() === "" || shelterCity.val() === "" || dogName.val() === "" || dogBreed.val() === "") {
            $("#dog-error").append($("<p>").text("All fields must have a value!"));
            setTimeout(function () {
                $("#dog-error").empty();
            }, 3000);
        } else {
            $.ajax("/api/shelterDogs", {
                type: "POST",
                data: dog
            }).then(function (res) {
                // location.reload();
                const id = res.id;
                // console.log(res);
                if (res.id > 0) {
                    $.ajax("/api/shelters/" + id, {
                        type: "GET"
                    }).then(function (data) {
                        // dogName.val().empty();
                        // dogBreed.val().empty();
                        // dogName.reset();
                        // dogBreed.val() = "";
                        $("#title").empty();
                        $("#table-body").empty();

                        $("#title").append($("<h3>").text(`${data.name} in ${data.city}`));
                        for (let i = 0; i < data.ShelterDogs.length; i++) {
                            $("#table-body").append($("<tr>").append($("<td>").text(data.ShelterDogs[i].dogName)).append($("<td>").text(data.ShelterDogs[i].breed)));
                        }
                    });
                } else {
                    $("#dog-error").append($("<p>").text("Shelter not found, must create one first!"));
                    setTimeout(function () {
                        $("#dog-error").empty();
                    }, 3000);
                }
            });
        }
    });
});