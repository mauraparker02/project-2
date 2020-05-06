$(function() {
    const shelterName = $("#shelter-name");
    const shelterCity = $("#city-name");
    const dogName = $("#dog-name");
    const dogBreed = $("#dog-breed");



    $("#find-add").on("click", function(e) {
        e.preventDefault();
        const shelter = {
            name: shelterName.val().trim(),
            city: shelterCity.val().trim(),
        };
        // console.log(shelterName);
        // console.log(shelter);

        $.ajax("/api/shelters", {
            type: "POST",
            data: shelter
        }).then(function(res) {
            console.log(res);

            const id = res.id;

            $.ajax("/api/shelters/" + id, {
                type: "GET"
            }).then(function(data) {
                // location.reload();
                console.log("showing table");
                console.log(data);
                
                $("#title").append($("<h3>").text(`${data.name} in ${data.city}`));
                for (let i = 0; i < data.ShelterDogs.length; i++) {
                    // const $row = $("<tr>");
                    $("#table-body").append($("<tr>").append($("<td>").text(data.ShelterDogs[i].dogName)).append($("<td>").text(data.ShelterDogs[i].breed)));
                }
            });
        });
    });

    $("#add-dog").on("click", function(e) {
        e.preventDefault();
        const dog = {
            name: shelterName.val().trim(),
            city: shelterCity.val().trim(),
            dogName: dogName.val().trim(),
            breed: dogBreed.val().trim(),
        };

        $.ajax("/api/shelterDogs", {
            type: "POST",
            data: dog
        }).then(function(res) {
            // location.reload();
            dogName.empty();
            dogBreed.empty();
            res.end();
        });
    });
});