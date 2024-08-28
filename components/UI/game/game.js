class Game {
  constructor() {
    this.level = 1;
    this.prevScore = 0;
    this.score = 0;
    this.isGameOver = false;
    this.isWelcomeScreen = true;
  }

  updateScore() {
    this.score += 1;
  }

  updateLevel() {
    this.level += 1;
  }
  resetToPrevScore() {
    this.score = this.prevScore;
  }

  resetScore() {
    this.score = 0;
  }

  displayStats() {
    textSize(18);
    stroke(0);
    strokeWeight(3);
    fill(255);
    text(`Level ${this.level}`, 20, 28);

    for (var i = 0; i < gameChar.lives; i++) {
      image(livesIcon, 100 + i * 30, 10, 25, 25);
    }

    text(`score: ${this.score}`, 20, 60);
  }
}
