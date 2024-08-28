function charLooseLife() {
    // check contact with enemy
if (gameChar.isAlive && gameChar.checkEnemyCollision(enemy) && gameChar.looseLife()) {
    soundButton.isToggle ? sound.playSound("fall") : null;

    if (gameChar.lives > 0) {
      gameChar.isEnemyContact = true;
      game.resetToPrevScore();
    } else {
      game.resetScore();
      game.isGameOver = true;
    }
}

    //check if the character looses lives or dies
    if (gameChar.isAlive && gameChar.looseLife()) {
      soundButton.isToggle ? sound.playSound("fall") : null;

      if (gameChar.lives > 0) {
        game.resetToPrevScore();
        startGame();
      } else {
        game.resetScore();
        game.isGameOver = true;
      }
    }
}

