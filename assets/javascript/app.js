$(document).ready(function () {
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
    var pressRef = database.ref("/press");
    //database.ref().push(buttonPressed);
    //var buttonPressed = 0;

    $("#start").on("click", function () {
        $("#buttons").empty();
        createButtons();
    });
    connectionsRef.on("value", function (snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        $("#connected-players").text("There are " + snap.numChildren() + " connected players");
    });
    pressRef.on("value", function (snap) {
        //buttonPressed ++;
        console.log("buttons pressed value: " + buttonPressed);
    });


    function createButtons() {
        var buttonNames = ["Rock", "Paper", "Seven"];
        for (var i = 0; i < buttonNames.length; i++) {
            var localButton = $("<button>");
            localButton.addClass("gameButton");
            localButton.text(buttonNames[i]);
            $("#buttons").append(localButton);
        }
        console.log("buttons created");
    }

    $(document).on("click", ".gameButton", function () {
        event.preventDefault();
        var yourChoice = $(this).text();
        yourChoice = yourChoice.charAt(0);
        console.log("selected button: " + yourChoice);
        //yourChoice = {
        //    yourSelection: yourChoice
        //}
        //database.ref().push(yourChoice);

        buttonPressed++;
        database.ref("/press").set(buttonPressed);

        console.log("buttons pressed local: " + buttonPressed);
        if (buttonPressed == 1) {
            var player1Choice = yourChoice;
        } else if (buttonPressed == 2) {
            var player2Choice = yourChoice;
            compareSelections(player1Choice, player2Choice);
        }
    });

    //database.ref("/buttonPressed").on("value", function(snapshot) {

    //});

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

    function compareSelections(player1Choice, player2Choice) {
        //if (yourChoice) {
        if ((player1Choice === "R" && player2Choice === "S") ||
            (player1Choice === "S" && player2Choice === "P") ||
            (player1Choice === "P" && player2Choice === "R")) {
            $("#game-outcome").text("You Win!");
        } else if (player1Choice === player2Choice) {
            $("#game-outcome").text("You Tie!");
        } else {
            $("#game-outcome").text("You Lose!");
        }
        //}

    }

    function restart() {
        database.ref().remove();
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