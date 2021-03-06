//Javascript

var games = ["Metal Gear Solid", "Doom", "Star Craft", "Call of Duty"];

//adds on click event listener to the buttons
var theGame;
var gifDiv;
var personImage;
/*
function alertGameName() {
        var gameName = $(this).attr("data-name");

        alert(gameName);
      } 
*/
function giphyCall() {
    //function to generate Buttons
    function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < games.length; i++) {
            //tag = games[i];
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("gamey");

            // Adding a data-attribute
            a.attr("data-name", games[i]);
            theGame = ("data-name");
            // Providing the initial button text
            a.text(games[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);



        };

    }
    renderButtons();

    //function to to show Gifs and Rating
    function displayGameInfo() {
        $("button").on("click", function() {

            // In this case, the "this" keyword refers to the button that was clicked
            var game = $(this).attr(theGame)
            
            // Constructing a URL to search Giphy for the game
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                game + "&api_key=dc6zaTOxFJmzC&limit=10";

            // Performing our AJAX GET request
            $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                // After the data comes back from the API
                .done(function(response) {
                    // Storing an array of results in the results variable
                    var results = response.data;
                    console.log(response)
                    // Looping over every result item
                    for (var i = 0; i < results.length; i++) {

                        // Only taking action if the photo has an appropriate rating
                        //if (results[i].rating !== "g" && results[i].rating !== "pg-13") {
                        // Creating a div with the class "item"
                        gifDiv = $("<div>");
                        gifDiv.addClass("gifness")

                        var im = results[i].images;

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);
                        p.addClass("words")
                        // Creating an image tag
                        personImage = $("<img>");
                        personImage.addClass("still");
                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        personImage.attr({ "src": im.fixed_width_still.url, "data-url": im.fixed_width.url });

                        // Appending the paragraph and personImage we created to the "gifDiv" div we created
                        
                        gifDiv.append(personImage);
                        gifDiv.append(p);





                        // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                        $("#gifs-appear-here").prepend(gifDiv);


                        //}
                    }
                })
        })
    };

    //function to input new game to the button area at top
    $("#add-game").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var gameInput = $("#game-input").val().trim();

        // Adding game from the textbox to our array
        games.push(gameInput);

        // Calling renderButtons which handles the processing of our games array
        renderButtons();
    });

    $(document).on("click", ".gamey", displayGameInfo);

    renderButtons()
}
giphyCall();


$(document).on("click", ".still", function() {
    
    var tempImage = $(this).attr("src");
    $(this).attr("src", $(this).attr("data-url"));
    console.log(this)
    $(this).attr("data-url", tempImage);



});







