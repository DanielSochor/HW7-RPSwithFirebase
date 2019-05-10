# Rock Paper Scissors Game using Firebase

This is an online two player Rock Paper Scissors game. How’s how the game works:

•	Both players pick either `rock`, `paper` or `scissors`. The game logs each choice to Firebase and also logs who selected first. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other. 

•	The game will track each player's wins and losses.

•	During the game each player can chat with the other in the chat window at the bottom of the page.

The game works by include utilizing the components:

•	It creates a Firebase connection

•	Logs to Firebase the number of connections and waits until two and only two people are connected

•	The game initialization includes resetting each player’s choice, the winner, and the chat window

•	When a selection is made the game logs the first letter of rock, paper, or scissors to Firebase to their position as player 1 or 2

•	Once two selections are made the game checks who won or if there was a tie and it logs this to Firebase

•	When a winner is defined the game informs both players and offers them the option to play again 

We hope you enjoy this game!

