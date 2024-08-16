class Mountain {
  constructor(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
  }
  drawMountain() {
    fill(61, 47, 6);
    triangle(
      this.xPos,
      this.yPos,
      this.xPos + 130 * this.size,
      this.yPos - 332 * this.size,
      this.xPos + 260 * this.size,
      this.yPos
    );
    triangle(
      this.xPos - 80 * this.size,
      this.yPos,
      this.xPos + 10 * this.size,
      this.yPos - 212 * this.size,
      this.xPos + 80 * this.size,
      this.yPos
    );

    // snow on top
    fill(255, 255, 255);
    beginShape();
    vertex(this.xPos + 130 * this.size, this.yPos - 332 * this.size);
    vertex(this.xPos + 90 * this.size, this.yPos - 232 * this.size);
    vertex(this.xPos + 110 * this.size, this.yPos - 252 * this.size);
    vertex(this.xPos + 130 * this.size, this.yPos - 212 * this.size);
    vertex(this.xPos + 160 * this.size, this.yPos - 242 * this.size);
    vertex(this.xPos + 170 * this.size, this.yPos - 232 * this.size);
    endShape();
  }
}
