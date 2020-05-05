$(function() {
    $("#add-shelter").on("click", function(e) {
        e.preventDefault();
        $.ajax("/add", {
            type: "GET"
        }).then(function() {
            location.assign("/add");
        });
    });
});