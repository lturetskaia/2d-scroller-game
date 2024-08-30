class Platform {
  constructor(xPos, yPos, width) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = 20;
  }

  drawStone(x, y, w, h) {
    strokeWeight(1);
    stroke(0);
    fill(186, 170, 123);
    rect(x, y, w, h, 3);
  }

  drawPlatform() {
    var stoneWidth = 10;

    // Draw the platform using stones
    for (var i = this.xPos; i < this.xPos + this.width; i += stoneWidth) {
      this.drawStone(i, this.yPos, stoneWidth, this.height);
    }
  }

  checkContact(gameCharPosX, gameCharPosY) {
    var hasXContact = gameCharPosX > this.xPos && gameCharPosX < this.xPos + this.width;
    var yDistance = this.yPos - gameCharPosY;
    var hasYContact = yDistance >= 0 && yDistance <= 2;
    if (hasXContact && hasYContact) {
      return true;
    } else {
      return false;
    }
  }
}
