class Cloud {
  constructor(xPos, yPos, size, speed) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.speed = speed;
  }

  moveCloud(scrollingSpace) {
    var cloudLeftEdge = this.xPos - 60 * this.size;
    var cloudRightEdge = this.xPos + 120 * this.size + (80 * this.size) / 2;

    if (this.speed > 0) {
      if (cloudLeftEdge > scrollingSpace) {
        this.xPos = 0 - 120 * this.size - (80 * this.size) / 2;
        // when a cloud reaches the end of scrolling space it appears on the other side
      } else {
        //even number cloud objects float right
        this.xPos += this.speed;
      }
    } else {
      if (cloudRightEdge < 0) {
        this.xPos = scrollingSpace + (60 * this.size) / 2;
        // when a cloud reaches the beginning of scrolling space it appears on the other side
      } else {
        // odd number clouds float left
        this.xPos += this.speed;
      }
    }
  }

  changeCloudColour(scrollingSpace) {
    // clouds turn grey when gameChar_x increases
    fill(map(gameChar.xPos, width / 2, scrollingSpace - width / 2, 255, 150), 250);
  }

  drawCloud(scrollingSpace) {
    this.moveCloud(scrollingSpace);

    this.changeCloudColour(scrollingSpace);

    ellipse(this.xPos + this.speed, this.yPos, 60 * this.size, 60 * this.size);
    ellipse(this.xPos + 40 * this.size, this.yPos - 10 * this.size, 80 * this.size, 80 * this.size);
    ellipse(
      this.xPos + 120 * this.size,
      this.yPos - 10 * this.size,
      80 * this.size,
      80 * this.size
    );
    ellipse(
      this.xPos + 80 * this.size,
      this.yPos - 20 * this.size,
      100 * this.size,
      100 * this.size
    );
  }
}
