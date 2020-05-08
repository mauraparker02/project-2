$(function () {
    const shelterName = $("#shelter-name");
    const shelterCity = $("#city-name");
    const dogName = $("#dog-name");
    const dogBreed = $("#dog-breed");
    const shelterError = $("#shelter-error");
    const dogError = $("#dog-error");
    const title = $("#title");
    const tbody = $("#table-body");

    $("#find-add").on("click", function (e) {
        e.preventDefault();
        const shelter = {
            name: shelterName.val().toLowerCase().trim(),
            city: shelterCity.val().toLowerCase().trim(),
        };
        if (shelterName.val() === "" || shelterCity.val() === "") {
            shelterError.empty();
            shelterError.append($("<p>").addClass("error").text("Shelter name and city cannot be blank!"));
            setTimeout(function () {
                shelterError.empty();
            }, 5000);
        } else {
            $.ajax("/api/shelters", {
                type: "POST",
                data: shelter
            }).then(function (res) {
                const id = res.id;
                renderPage(id);
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
            dogError.empty();
            dogError.append($("<p>").addClass("error").text("All fields must have a value!"));
            setTimeout(function () {
                dogError.empty();
            }, 5000);
        } else {
            $.ajax("/api/shelterDogs", {
                type: "POST",
                data: dog
            }).then(function (res) {
                const id = res.id;
                if (res.id > 0) {
                    renderPage(id);
                } else {
                    dogError.empty();
                    dogError.append($("<p>").addClass("error").text("Shelter not found, must create one first!"));
                    setTimeout(function () {
                        dogError.empty();
                    }, 5000);
                }
            });
        }
    });

    $(document).on("click", ".delete-btn", function(e) {
        e.preventDefault();
        const id = $(this)[0].dataset.petId;
        const shelterId = $(this)[0].dataset.shelterId;

        $.ajax("/api/shelterDogs/" + id, {
            type: "DELETE"
        }).then(function(res) {
            renderPage(shelterId);
        });
    });

    function renderPage(id) {
        $.ajax("/api/shelters/" + id, {
            type: "GET"
        }).then(function (data) {
            title.empty();
            tbody.empty();


            title.append($("<h3>").addClass("cap").text(`${data.name} in ${data.city}`));
            for (let i = 0; i < data.ShelterDogs.length; i++) {
                tbody.append($("<tr>")).append($("<td>").addClass("cap").text(data.ShelterDogs[i].dogName)).append($("<td>").addClass("cap").text(data.ShelterDogs[i].breed)).append($("<button>").text("Adopted").addClass("delete-btn").attr("data-pet-id", data.ShelterDogs[i].id).attr("data-shelter-id", data.ShelterDogs[i].ShelterId));
            }

            document.getElementById("dog-name").value = "";
            document.getElementById("dog-breed").value = "";
        });
    }
});