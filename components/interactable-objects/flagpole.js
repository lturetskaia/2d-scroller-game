class Flagpole {
  constructor(yPos) {
    this.xPos = 4400;
    this.yPos = yPos;
    this.isReached = false;
  }

  drawFlagpole() {
    push();
    strokeWeight(5);
    stroke(100);
    line(this.xPos, this.yPos, this.xPos, this.yPos - 200);
    fill(255, 0, 255);
    noStroke();

    if (!this.isReached) {
      rect(this.xPos, this.yPos - 200, 50, 50);
    } else {
      rect(this.xPos, this.yPos - 50, 50, 50);
    }

    pop();
  }

  checkFlagpole(gameCharPosX) {
    var d = abs(gameCharPosX - this.xPos);
    if (d < 15) {
      this.isReached = true;
    }
  }
}
