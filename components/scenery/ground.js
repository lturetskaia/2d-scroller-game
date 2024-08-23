class Ground {
  constructor() {
    this.grassColour = color(0, 155, 0);
    this.sandColour = color(217, 181, 108);
  }

  getColour(level) {
    if (level % 2 == 1) {
      return this.grassColour;
    } else {
      return this.sandColour;
    }
  }

  drawGround(width, height, floorPosY, level) {
    var colour = this.getColour(level);
    noStroke();
    fill(colour);
    rect(0, floorPosY, width, height - floorPosY);
  }
}
