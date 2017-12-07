var topics = ["Horse", "Shark", "Dog", "Lion", "Chupacabra", "Bigfoot"];
var $; //this is for the editor to stop complaining that $ is not defined.
// displayAnimalInfo function re-renders the HTML to display the appropriate content
function displayAnimalInfo() {

    var animal = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + ///this one works
        animal + "&api_key=EPNL0fmQ03cBpafrYKYrYpOOISnkN8j0&limit=10";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
        console.log(response);
        // Creating a div to hold animal gif
        var animalDiv = $("<div class='animal'>");

        var animalGif = response.data;
        for (var i = 0; i < animalGif.length; i++) {

            // Retrieving the URL for the image

            // Creating an element to hold the image

            //naming the states of the still and animated gifs. when clicked animate does not work.
            var image = $("<img>").attr("src", animalGif[i].images.original_still.url);
            image.attr("data-still", animalGif[i].images.original_still.url);
            image.attr("data-animate", animalGif[i].images.preview.mp4);
            image.attr("data-state", "still");
            // image.attr("data-state", "animate");
            image.addClass("gif");

            // Appending the image
            animalDiv.append(image);



            $("#animals-view").prepend(animalDiv);

            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pOne = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            animalDiv.append(pOne);


            $(".gif").on("click", function(event) {
                event.preventDefault();
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {

                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        }

    });

}

// Function for displaying movie data
function renderButtons() {

    // Deleting the animals prior to adding new animals
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal to our button
        a.addClass("animal btn btn-primary");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function(event) {
    event.preventDefault();

    var animal = $("#animal-input").val().trim();

    topics.push(animal);

    // Calling renderButtons which handles the processing of our animal array
    renderButtons();
});


// Adding a click event listener to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();