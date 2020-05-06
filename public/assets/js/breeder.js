const breedList = [];
const cityList = [];

const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
const result = words.filter(word => word.length > 6);

$(function(){

    $("#city").css("display", "none");
    $("#breed").css("display", "none");

    // SHOW BREED DIV ON CLICK //
    $("#byBreed").on("click", function(event){
        event.preventDefault();
        $("#breed").css("display", "block");
        $("#city").css("display", "none");
    });

    // SHOW CITY DIV ON CLICK //
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
        $.ajax("/breeds/" + newBreed, {
            type: "GET"
        }).then(
            function(data) {
            console.log(data)
            $("#breedTable").empty();
            for(i=0; i<data.length; i++) {
                console.log(data[i].city)
                $("#breedTable").append($("<tr>").append($("<td>").text(data[i].city)));
            }
            // location.reload();
            }
        );
    });

    // SHOW LOCATION SELECTED BY USER // 
    $("#searchCity").on("click", function(event) {
        event.preventDefault();
        var newCity = $("#pickCity").val();
        $.ajax("/location/" + newCity, {
            type: "GET"
        }).then(
            function(data) {
            console.log(data)
            $("#cityTable").empty();
            for(i=0; i<data.length; i++) {
                console.log(data[i].breed)
                $("#cityTable").append($("<tr>").append($("<td>").text(data[i].breed)));
            }
            // location.reload();
            }
        );
    });

}); 