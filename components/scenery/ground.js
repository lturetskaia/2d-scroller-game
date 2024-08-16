class Ground {
  constructor() {
    this.colour = color(0, 155, 0);
  }

  drawGround(width, height, floorPosY) {
    noStroke();
    fill(this.colour);
    rect(0, floorPosY, width, height - floorPosY);
  }
}
