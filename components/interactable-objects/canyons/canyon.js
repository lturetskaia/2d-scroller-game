class Canyon {
  constructor(xPos, yPos, width, depth) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.depth = depth;
  }

  drawCanyon() {
    fill(77, 232, 227);
    beginShape();
    vertex(this.xPos, this.yPos);
    vertex(this.xPos + 25, this.depth);
    vertex(this.xPos + this.width - 25, this.depth);
    vertex(this.xPos + this.width, this.yPos);
    endShape();

    //bottom
    fill(196, 171, 128);
    beginShape();
    vertex(this.xPos + 23, 564);
    vertex(this.xPos + 27 + this.width - 50, this.depth - 12);
    vertex(this.xPos + 25 + this.width - 50, this.depth);
    vertex(this.xPos + 25, this.depth);
    vertex(this.xPos + 23, this.depth - 12);
    endShape();
  }

  checkCanyon(gameCharPosX, gameCharPosY) {
    if (
      gameCharPosX > this.xPos &&
      gameCharPosX < this.xPos + this.width &&
      gameCharPosY >= this.yPos
    ) {
      return true;
    }
  }
}
