class Tree {
  constructor(xPos, yPos, size, colour) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.flowerColour = colour;
  }

  renderOak() {
    fill(140, 100, 40);

    //trunk
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

  generateFlower(x, y) {
    //flower
    fill(this.flowerColour);

    ellipse(x, y, 10, 20);
    push();
    translate(x - 6, y + 3);
    rotate(140);
    ellipse(0, 0, 10, 20);
    pop();
    push();
    translate(x + 6, y + 3);
    rotate(50);
    ellipse(0, 0, 10, 20);
    pop();
  }

  renderCactus() {
    fill(9, 135, 70);

    //trunk
    rect(this.xPos, this.yPos - 200 * this.size, 30 * this.size, 210 * this.size, 15 * this.size);

    this.generateFlower(this.xPos + 62 * this.size, this.yPos - 175 * this.size);
    this.generateFlower(this.xPos - 35 * this.size, this.yPos - 147 * this.size);

    fill(9, 135, 70);
    //right arm
    beginShape();
    curveVertex(this.xPos + 30 * this.size, this.yPos - 100 * this.size);
    curveVertex(this.xPos + 30 * this.size, this.yPos - 100 * this.size);
    curveVertex(this.xPos + 60 * this.size, this.yPos - 110 * this.size);
    curveVertex(this.xPos + 70 * this.size, this.yPos - 120 * this.size);
    curveVertex(this.xPos + 75 * this.size, this.yPos - 160 * this.size);
    curveVertex(this.xPos + 60 * this.size, this.yPos - 170 * this.size);
    curveVertex(this.xPos + 50 * this.size, this.yPos - 160 * this.size);
    curveVertex(this.xPos + 45 * this.size, this.yPos - 130 * this.size);
    curveVertex(this.xPos + 30 * this.size, this.yPos - 120 * this.size);
    curveVertex(this.xPos + 60 * this.size, this.yPos - 110 * this.size);
    endShape();

    //left arm
    beginShape();
    curveVertex(this.xPos, this.yPos - 70 * this.size);
    curveVertex(this.xPos, this.yPos - 70 * this.size);
    curveVertex(this.xPos - 30 * this.size, this.yPos - 80 * this.size);
    curveVertex(this.xPos - 40 * this.size, this.yPos - 90 * this.size);
    curveVertex(this.xPos - 45 * this.size, this.yPos - 130 * this.size);
    curveVertex(this.xPos - 30 * this.size, this.yPos - 140 * this.size);
    curveVertex(this.xPos - 20 * this.size, this.yPos - 100 * this.size);
    curveVertex(this.xPos - 10 * this.size, this.yPos - 90 * this.size);
    curveVertex(this.xPos, this.yPos - 90 * this.size);
    curveVertex(this.xPos, this.yPos - 80 * this.size);
    endShape();

    noStroke();
  }

  drawTree(level) {
    if (level % 2 == 1) {
      this.renderOak();
    } else {
      this.renderCactus();
    }
  }
}
