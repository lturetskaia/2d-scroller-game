class Mountain {
  constructor(xPos, yPos, size, colours) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.mountColor = colours;
  }

  drawMountain() {
    fill(this.mountColor.bottom);

    triangle(
      //big
      this.xPos + 80 * this.size,
      this.yPos,
      this.xPos + 210 * this.size,
      this.yPos - 332 * this.size,
      this.xPos + 340 * this.size,
      this.yPos
    );
    triangle(
      //small
      this.xPos,
      this.yPos,
      this.xPos + 90 * this.size,
      this.yPos - 212 * this.size,
      this.xPos + 170 * this.size,
      this.yPos
    );

    // snow on top
    fill(this.mountColor.top);
    beginShape();
    vertex(this.xPos + 210 * this.size, this.yPos - 332 * this.size);
    vertex(this.xPos + 170 * this.size, this.yPos - 232 * this.size);
    vertex(this.xPos + 190 * this.size, this.yPos - 252 * this.size);
    vertex(this.xPos + 210 * this.size, this.yPos - 212 * this.size);
    vertex(this.xPos + 240 * this.size, this.yPos - 242 * this.size);
    vertex(this.xPos + 250 * this.size, this.yPos - 232 * this.size);
    endShape();
  }
}
