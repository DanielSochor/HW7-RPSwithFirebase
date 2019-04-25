$(document).ready(function () {

    $("#start").on("click", function () {
        $("#buttons").empty();
        createButtons();
        //alert firebase
    });

    function createButtons() {
        var buttonNames = ["Rock", "Paper", "Seven"];
        for (var i = 0; i < buttonNames.length; i++) {
            var localButton = $("<button>");
            localButton.addClass("button");
            localButton.text(buttonNames[i]);
            $("#buttons").append(localButton);
        }
    }


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB_P7ESlumLbYuFJryACvJBKkIpzRT6rkU",
        authDomain: "daniel-database.firebaseapp.com",
        databaseURL: "https://daniel-database.firebaseio.com",
        projectId: "daniel-database",
        storageBucket: "daniel-database.appspot.com",
        messagingSenderId: "772832539382"
    };

    firebase.initializeApp(config);
    var database = firebase.database();
    var connectionsRef = database.ref("/connections");
    database.ref().remove();

    $("button").on("click", function () {
        var yourChoice = $(this).text();
        yourChoice = yourChoice.charAt(0);
        console.log(yourChoice);
        yourChoice = {
            yourSelection: yourChoice
        }
        database.ref().push(yourChoice);
        //compareSelections(yourChoice);
    });

    // Add ourselves to presence list when online.
    var connectedRef = database.ref(".info/connected");
    connectedRef.on("value", function (snap) {
        // If they are connected..
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    var opponentChoice;

    function compareSelections(yourChoice) {
        if (yourChoice) {
            if ((yourChoice === "R" && opponentChoice === "S") ||
                (yourChoice === "S" && opponentChoice === "P") ||
                (yourChoice === "P" && opponentChoice === "R")) {
                $("#game-outcome").text("You Win!");
            } else if (yourChoice === opponentChoice) {
                $("#game-outcome").text("You Tie!");
            } else {
                $("#game-outcome").text("You Lose!");
            }
        }

    }













    //     var gifArray = ["Chicago", "Austin", "Las Angeles", "Las Vegas"];
    //     var numberOfGifsToDisplay = 10;
    //     var results;

    //     createGifButtons();

    //     function createGifButtons() {
    //         $("#buttons-appear-here").empty();
    //         for (var i = 0; i < gifArray.length; i++) {
    //             var localButton = $("<button>");
    //             localButton.addClass("gif-button");
    //             localButton.attr("button-title", gifArray[i]);
    //             localButton.text(gifArray[i]);
    //             $("#buttons-appear-here").append(localButton);
    //         }
    //         //console.log(gifArray);
    //     }

    //     $(document).on("click", "#clear-gifs", function () {
    //         event.preventDefault();
    //         $("#gifs-appear-here").empty();
    //     });

    //     $("#add-button").on("click", function (event) {
    //         event.preventDefault();
    //         var newButtonText = $("#text-input").val().trim();
    //         gifArray.push(newButtonText);
    //         $("#text-input").val("");
    //         createGifButtons();
    //     });

    //     $(document).on("click", ".gif-button", getAndDisplayGifs);
    //     createGifButtons();

    //     function getAndDisplayGifs() {
    //         $("#gifs-appear-here").empty();
    //         var textToSearchFor = $(this).attr("button-title");
    //         console.log(textToSearchFor);
    //         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //             textToSearchFor + "&api_key=AlyafWwXDhMSFvBu5VaS8eH3vslwmZ3z&limit=" + numberOfGifsToDisplay;

    //         $.ajax({
    //             url: queryURL,
    //             method: "GET"
    //         }).then(function (response) {
    //             results = response.data;
    //             console.log(response);
    //             for (var i = 0; i < results.length; i++) {
    //                 var gifDiv = $("<div>");
    //                 var rating = results[i].rating;
    //                 var p = $("<p>").text("The GIF above has a rating of: " + rating);
    //                 var gifImage = $("<img>");
    //                 gifImage.attr("class", "gif");
    //                 gifImage.attr("data-state", "still");
    //                 gifImage.attr("data-to-do", i);
    //                 gifImage.attr("src", results[i].images.fixed_height_still.url);
    //                 gifDiv.prepend(p);
    //                 gifDiv.prepend(gifImage);
    //                 $("#gifs-appear-here").prepend(gifDiv);
    //             }
    //         });
    //     }

    //     $(document).on("click", ".gif", function () {
    //         var state = $(this).attr("data-state");
    //         var specificGif = $(this);
    //         if (state == "still") {
    //             animateGif(specificGif);
    //         } else {
    //             stopGifAnimation(specificGif);
    //         }
    //     });

    //     $("#animate-gifs, #stop-gifs").on("click", function (event) {
    //         event.preventDefault();
    //         var buttonTitle = $(this).text();
    //         toggleGifAnimation(buttonTitle);
    //     });

    //     function toggleGifAnimation(buttonTitle) {
    //         if (buttonTitle == "Animate All Gifs") {
    //             $(".gif").each(function () {
    //                 var state = $(this).attr("data-state");
    //                 var specificGif = $(this);
    //                 if (state == "still") {
    //                     animateGif(specificGif);
    //                 }
    //             });
    //         } else {
    //             $(".gif").each(function () {
    //                 var state = $(this).attr("data-state");
    //                 var specificGif = $(this);
    //                 if (state == "animate") {
    //                     stopGifAnimation(specificGif);
    //                 }
    //             });
    //         }
    //     }

    //     function animateGif(that) {
    //         var imageNumber = that.attr("data-to-do");
    //         that.attr("src", results[imageNumber].images.fixed_height.url);
    //         that.attr("data-state", "animate");
    //     }

    //     function stopGifAnimation(that) {
    //         var imageNumber = that.attr("data-to-do");
    //         that.attr("src", results[imageNumber].images.fixed_height_still.url);
    //         that.attr("data-state", "still");
    //     }

})