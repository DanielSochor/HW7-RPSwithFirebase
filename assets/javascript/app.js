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


    var yourButtonChoice = "";
    var player1ChoiceDatabaseValue = "";
    var player2ChoiceDatabaseValue = "";
    var yourPlayerNumber = 0;

    $("#start").on("click", function () {

    });

    connectionsRef.on("value", function (snap) {
        // Display the viewer count in the html.
        // The number of online users is the number of children in the connections list.
        //$("#connected-players").text("There are " + snap.numChildren() + " connected players");
        if (snap.numChildren() == 2) {
            //console.log("there are enough people to play the game");
            $("#connected-players").text("There are " + snap.numChildren() + " connected players");
            gameSetUp();
        } else {
            //console.log("incorrect number of people to play");
            $("#connected-players").text(snap.numChildren() + " connected player, awaiting additional player");
            $("#buttons").empty();
        }
    });

    function gameSetUp() {
        database.ref("/player1Choice").set({
            player1Choice: "o"
        });
        database.ref("/player2Choice").set({
            player2Choice: "o"
        });
        database.ref("/winner").set({
            winner: "o"
        });
        $("#buttons").empty();
        createButtons();
        yourPlayerNumber = 0;
    }


    database.ref("/player1Choice").on("value", function (snap) {
        player1ChoiceDatabaseValue = snap.val().player1Choice;
        console.log("player1ChoiceDatabaseValue is: " + player1ChoiceDatabaseValue)
    });
    database.ref("/player2Choice").on("value", function (snap) {
        player2ChoiceDatabaseValue = snap.val().player2Choice;
        console.log("player2ChoiceDatabaseValue is: " + player2ChoiceDatabaseValue)
    });
    database.ref("/winner").on("value", function (snap) {
        if (snap.val().winner == 1){
            if (yourPlayerNumber == 1){
                $("#game-outcome").text("You Win!");
            } else {
                $("#game-outcome").text("You Lose!");
            }
        } else if (snap.val().winner == 2){
            if (yourPlayerNumber == 2){
                $("#game-outcome").text("You Win!");
            } else {
                $("#game-outcome").text("You Lose!");
            }
        } else if (snap.val().winner == 3) {
            $("#game-outcome").text("You Tie!");
        } else {

        }
    });


    $(document).on("click", ".gameButton", function () {
        event.preventDefault();
        yourButtonChoice = $(this).text();
        yourButtonChoice = yourButtonChoice.charAt(0);

        if (player1ChoiceDatabaseValue == "o") {
            database.ref("/player1Choice").set({
                player1Choice: yourButtonChoice
            });
            yourChoice = player1ChoiceDatabaseValue;
            yourPlayerNumber = 1;
        } else {
            database.ref("/player2Choice").set({
                player2Choice: yourButtonChoice
            });
            yourPlayerNumber = 2;
            compareSelections(yourButtonChoice, player1ChoiceDatabaseValue);
        }
    });

    function compareSelections(yourChoice, opponentChoice) {
        if ((yourChoice === "R" && opponentChoice === "S") ||
            (yourChoice === "S" && opponentChoice === "P") ||
            (yourChoice === "P" && opponentChoice === "R")) {
            if (yourPlayerNumber == 1){
                database.ref("/winner").set({
                    winner: 1
                });
            } else {
                database.ref("/winner").set({
                    winner: 2
                });
            }
        } else if (yourChoice === opponentChoice) {
            database.ref("/winner").set({
                winner: 3
            });
        } else {
            if (yourPlayerNumber == 1){
                database.ref("/winner").set({
                    winner: 2
                });
            } else {
                database.ref("/winner").set({
                    winner: 1
                });
            }
        }
    }



    connectedRef.on("value", function (snap) {
        // If they are connected add user to connection list
        if (snap.val()) {
            // Add user to the connections list.
            var con = connectionsRef.push(true);
            // Remove user from the connection list when they disconnect.
            con.onDisconnect().remove();
        }
    });


    function createButtons() {
        var buttonNames = ["Rock", "Paper", "Scissors"];
        for (var i = 0; i < buttonNames.length; i++) {
            var localButton = $("<button>");
            localButton.addClass("gameButton");
            localButton.text(buttonNames[i]);
            $("#buttons").append(localButton);
        }
        //console.log("buttons created");
    }

})