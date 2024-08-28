class Canyon {
  constructor(xPos, yPos, width, depth, colour) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.depth = depth;
    this.colour = colour;
  }

  drawCanyon() {
    fill(this.colour);
    beginShape();
    vertex(this.xPos, this.yPos);
    vertex(this.xPos + 25, this.depth);
    vertex(this.xPos + this.width - 25, this.depth);
    vertex(this.xPos + this.width, this.yPos);
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
