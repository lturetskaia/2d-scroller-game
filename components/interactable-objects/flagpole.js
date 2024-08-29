class Flagpole {
  constructor(yPos) {
    this.xPos = 4400;
    this.yPos = yPos;
    this.yPosFlag = this.yPos - 50;
    this.isReached = false;
  }

  drawFlagpole() {
    push();
    strokeWeight(5);
    stroke(100);
    line(this.xPos, this.yPos, this.xPos, this.yPos - 200);
    fill(255, 0, 255);
    noStroke();
    rect(this.xPos, this.yPosFlag, 50, 50);
    pop();
  }

  raiseFlag() {
    if (this.isReached) {
      this.yPosFlag = max(this.yPosFlag -1, this.yPos - 200);
    }
  }

  checkFlagpole(gameCharPosX) {
    var d = abs(gameCharPosX - this.xPos);
    if (d < 15) {
      this.isReached = true;
    }
  }
}
