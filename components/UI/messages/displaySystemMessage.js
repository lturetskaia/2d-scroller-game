function displaySystemMessage() {
  msgIsDisplayed = false;
  //welcome message
  if (game.isWelcomeScreen) {
    systemMessage.displayWelcome();
    msgIsDisplayed = true;
  }

  // system messages
  if (gameChar.isEnemyContact && gameChar.lives > 0) {
    systemMessage.setProps("You have been eaten!", "Press space to continue...");
    systemMessage.displayMessage();

    msgIsDisplayed = true;
  }

  if (game.isGameOver || (gameChar.isEnemyContact && gameChar.lives <= 0)) {
    systemMessage.setProps("GAME OVER!", "Press space to start a new game...");
    systemMessage.displayMessage();

    msgIsDisplayed = true;
  }

  if (game.isWin) {
    systemMessage.setProps(
      "YOU WIN!",
      `Your score is ${game.score}.
      
      Press space to start a new game...`
    );
    systemMessage.displayMessage();
  }
  if (flagpole.isReached && !game.isWin) {
    systemMessage.setProps("LEVEL COMPLETE!", "Press space to continue...");
    systemMessage.displayMessage();

    msgIsDisplayed = true;
  }

  return msgIsDisplayed;
}
