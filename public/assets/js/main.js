$(function() {
    $("#goAdopt").on("click", function(e) {
        e.preventDefault();
        $.ajax("/quiz", {
            type: "GET"
        }).then(function() {
            location.assign("/quiz");
        });
        // location.href="/api/type1";
        
    });

    $("#helpShelter").on("click", function(e) {
        e.preventDefault();
        location.href="/shelterHelper/home";
    });

    $("#addShelter").on("click", function(e) {
        e.preventDefault();
        location.href="/add";
    });
});