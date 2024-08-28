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
    // return;
    msgIsDisplayed = true;
  }

  if (game.isGameOver || (gameChar.isEnemyContact && gameChar.lives <= 0)) {
    systemMessage.setProps("GAME OVER!", "Press space to start a new game...");
    systemMessage.displayMessage();
    // return;
    msgIsDisplayed = true;
  }

  if (flagpole.isReached) {
    systemMessage.setProps("LEVEL COMPLETE!", "Press space to continue...");
    systemMessage.displayMessage();
    // return;
    msgIsDisplayed = true;
  }
  return msgIsDisplayed;
}
