const breedPick = $(".dogType");

$(function(){

    $("#city").css("display", "none");
    // $("#city-table").css("display", "none");
    $("#breed").css("display", "none");
    // $("#breed-table").css("display", "none");

    // SHOW BREED DIV //
    $("#byBreed").on("click", function(event){
        event.preventDefault();
        $("#breed").css("display", "block");
        $("#city").css("display", "none");
    });

    // SHOW CITY DIV //
    $("#byCity").on("click", function(event){
        event.preventDefault();
        $("#city").css("display", "block");
        $("#breed").css("display", "none");
    });

    // SHOW ALL BREED DATA FROM API ROUTE //
    $(".select-breed").on("click", function(event) {
        event.preventDefault();

        $.ajax("/shelterHelper/breeds", {
            type: "GET"
        }).then(
            function() {
            console.log("Success!");
            location.reload();
            }
        );
    });

    // SHOW ALL LOCATION DATA FROM API ROUTE //
    $(".select-location").on("click", function(event) {
        event.preventDefault();

        $.ajax("/shelterHelper/location", {
            type: "GET"
        }).then(
            function() {
            console.log("Success!");
            location.reload();
            }
        );
    });

    // SHOW BREED SELECTED BY USER // 
    $("#searchBreed").on("click", function(event) {
        event.preventDefault();
        var newBreed = $("#pickBreed").val();
        console.log(newBreed)
        $.ajax("/breeds/" + newBreed, {
            type: "GET"
        }).then(
            function() {
            location.reload();
            }
        );
    });

}); 