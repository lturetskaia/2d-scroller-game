class Tree {
  constructor(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
  }

  drawTree() {
    fill(140, 100, 40);
    rect(this.xPos, this.yPos - 144 * this.size, 20 * this.size, 144 * this.size);

    //leaves
    fill(9, 135, 70);
    ellipse(
      this.xPos + 10 * this.size,
      this.yPos - 191 * this.size,
      120 * this.size,
      180 * this.size
    );
    ellipse(
      this.xPos - 30 * this.size,
      this.yPos - 160 * this.size,
      80 * this.size,
      80 * this.size
    );
    ellipse(
      this.xPos - 30 * this.size,
      this.yPos - 220 * this.size,
      80 * this.size,
      80 * this.size
    );
    ellipse(
      this.xPos + 50 * this.size,
      this.yPos - 220 * this.size,
      80 * this.size,
      80 * this.size
    );
    ellipse(
      this.xPos + 50 * this.size,
      this.yPos - 160 * this.size,
      80 * this.size,
      80 * this.size
    );

    //branches
    fill(140, 100, 4);
    triangle(
      this.xPos + 20 * this.size,
      this.yPos - 182 * this.size,
      this.xPos + 40 * this.size,
      this.yPos - 222 * this.size,
      this.xPos + 20 * this.size,
      this.yPos - 162 * this.size
    );
    triangle(
      this.xPos,
      this.yPos - 152 * this.size,
      this.xPos - 20 * this.size,
      this.yPos - 202 * this.size,
      this.xPos,
      this.yPos - 122 * this.size
    );
  }
}