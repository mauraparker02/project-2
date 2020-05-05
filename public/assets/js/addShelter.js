$(function() {
    let shelterName = $("#shelter-name");
    const shelterCity = $("#city-name");
    const dogName = $("#dog-name");
    const dogBreed = $("#dog-breed");




    $("#add-submit").on("click", function(e) {
        e.preventDefault();
        let shelter = {
            name: shelterName.val(),
            city: shelterCity.val()
        };
        // console.log(shelterName);
        // console.log(shelter);

        $.ajax("/api/shelters", {
            type: "POST",
            data: shelter
        }).then(function() {
            location.reload();
        });
    });
});