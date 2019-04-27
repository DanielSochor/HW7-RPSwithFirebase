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

    // Create a variable to reference the database.
    var database = firebase.database();
    var connectionsRef = database.ref("/connections"); //connections stored in this directory
    //var pressRef = database.ref("/buttonPressed");
    var connectedRef = database.ref(".info/connected"); //boolean value for connected

    //database.ref().push(buttonPressed);
    //var gameStarted = true;
    var player1Choice = "";
    var player2Choice = "";
    var gameStarted = false;
    var yourChoice = "";
    var opponentChoice = "";
    var connections = 0;


    $("#start").on("click", function () {
        //gameStarted = false;
        // database.ref("/player1Choice").set({
        //     player1Choice:"o"
        // });
        // database.ref("/player2Choice").set({
        //     player2Choice:"o"
        // });
        $("#buttons").empty();
        createButtons();
    });

    database.ref("/player1Choice").on("value", function (snap) {
        if (snap.child("player1Choice") != "o") {
            console.log("first selection already made")
            player1Choice = snap.val().player1Choice;
            gameStarted = true;
        //console.log("game started is " + gameStarted);
        } else {
            //console.log("this is the first selection")
        }
    });

    connectionsRef.on("value", function (snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        //$("#connected-players").text("There are " + snap.numChildren() + " connected players");
        if(snap.numChildren() == 2){
            console.log("there are enough people to play the game");
            $("#connected-players").text("There are " + snap.numChildren() + " connected players");
            gameSetUp();
        } else {
            console.log("incorrect number of people to play");
            $("#connected-players").text(snap.numChildren() + " connected player, awaiting additional player");
        }
    });

    function gameSetUp(){
        database.ref("/player1Choice").set({
            player1Choice:"o"
        });
        database.ref("/player2Choice").set({
            player2Choice:"o"
        });
    }

   

    $(document).on("click", ".gameButton", function () {
        console.log("game started is: " + gameStarted);
        event.preventDefault();
        yourChoice = $(this).text();
        yourChoice = yourChoice.charAt(0);
        console.log("selected button: " + yourChoice);

        if (gameStarted == false) {
            player1Choice = yourChoice;
            database.ref("/player1Choice").set({
                player1Choice:yourChoice
            })
            //gameStarted = true;
        } else {
            player2Choice = yourChoice;
            database.ref("/player2Choice").set({
                player2Choice:yourChoice
            })
            opponentChoice = database.ref("/player1Choice");
            console.log("you selected: " + yourChoice);
            console.log("opponent selected: " + opponentChoice);
            compareSelections(yourChoice, opponentChoice);
        }
    });

    connectedRef.on("value", function (snap) {
        // If they are connected add user to connection list
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });

    function compareSelections(yourChoice, opponentChoice) {
        //if (yourChoice) {
        if ((yourChoice === "R" && opponentChoice === "S") ||
            (yourChoice === "S" && opponentChoice === "P") ||
            (yourChoice === "P" && opponentChoice === "R")) {
            $("#game-outcome").text("You Win!");
        } else if (yourChoice === opponentChoice) {
            $("#game-outcome").text("You Tie!");
        } else {
            $("#game-outcome").text("You Lose!");
        }
        //}
        

    }




    // pressRef.on("value", function (snap) {
    //     if (snap.child("buttonPressed").val() > buttonPressed) {
    //         buttonPress = snap.val().buttonPress;
    //     }
    //     console.log("buttons pressed value: " + buttonPressed);
    // });

    function createButtons() {
        var buttonNames = ["Rock", "Paper", "Scissors"];
        for (var i = 0; i < buttonNames.length; i++) {
            var localButton = $("<button>");
            localButton.addClass("gameButton");
            localButton.text(buttonNames[i]);
            $("#buttons").append(localButton);
        }
        console.log("buttons created");
    }


        //buttonPressed = snap.val().pressRef;
        // buttonPressed++;
        // database.ref("/buttonPressed").set(buttonPressed);

        //console.log("buttons pressed local: " + buttonPressed);






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