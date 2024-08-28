class Collectable {
  constructor(xPos, yPos) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = 50;
    this.isFound = false;
  }

  drawCollectable() {
    if (!this.isFound) {
      stroke(117, 79, 45);
      strokeWeight(1);
      fill(217, 190, 82);
      ellipse(this.xPos, this.yPos - 20, this.size * 0.7, this.size * 0.8);
      fill(209, 144, 84);
      ellipse(this.xPos, this.yPos - 20 - this.size * 0.24, this.size * 0.8, this.size * 0.4);

      push();
      fill(145, 113, 57);
      translate(this.xPos - 3, this.yPos - 20 - this.size * 0.44);
      rectMode(CENTER);
      rotate(-30);
      rect(0, 0, this.size * 0.12, this.size * 0.32, this.size * 0.04);
      pop();
    }
  }

  checkCollectable() {
    if (dist(gameChar.xPos, gameChar.yPos, this.xPos, this.yPos) < 20) {
      this.isFound = true;
      return true;
    }
  }
}
