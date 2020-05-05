$("#searchBreed").on("click", function(event){
    event.preventDefault();
})
// SHOWING BREED DATA FROM API ROUTE //
$(".select-breed").on("click", function(event) {
    event.preventDefault();

    $.ajax("/breeds", {
        type: "GET"
    }).then(
        function() {
        console.log("Success!");
        location.reload();
        }
    );
});

// SHOWING LOCATION DATA FROM API ROUTE //
$(".select-location").on("click", function(event) {
    event.preventDefault();

    $.ajax("/location", {
        type: "GET"
    }).then(
        function() {
        console.log("Success!");
        location.reload();
        }
    );
});