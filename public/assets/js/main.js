$(function() {
    $("#goAdopt").on("click", function(e) {
        e.preventDefault();
        $.ajax("/adopt", {
            type: "GET"
        }).then(function() {
            location.assign("/adopt");
        });
    });

    $("#helpShelter").on("click", function(e) {
        e.preventDefault();
        location.href="/shelterHelper/home";
    });
});