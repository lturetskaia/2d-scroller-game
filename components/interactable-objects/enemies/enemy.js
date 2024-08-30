class Enemy {
  constructor(xPos, yPos, startLocX, endLocX) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.isRight = true;
    this.isLeft = false;
    this.speed = 1;
    this.startLocX = startLocX;
    this.endLocX = endLocX;
  }

  renderPosTurnLeft() {

    stroke(0);
    strokeWeight(0.5);
    fill(252, 127, 3);
    beginShape(); //body
    curveVertex(this.xPos - 25, this.yPos - 30);
    curveVertex(this.xPos - 25, this.yPos - 30);
    curveVertex(this.xPos - 25, this.yPos - 10);
    curveVertex(this.xPos - 15, this.yPos);
    curveVertex(this.xPos + 35, this.yPos);
    curveVertex(this.xPos + 55, this.yPos - 15);
    curveVertex(this.xPos + 47, this.yPos - 19);
    curveVertex(this.xPos + 35, this.yPos - 18);
    curveVertex(this.xPos + 30, this.yPos - 20);
    curveVertex(this.xPos + 25, this.yPos - 23);
    curveVertex(this.xPos + 15, this.yPos - 27);
    curveVertex(this.xPos + 5, this.yPos - 33);
    curveVertex(this.xPos - 5, this.yPos - 39);
    curveVertex(this.xPos - 15, this.yPos - 45);
    curveVertex(this.xPos - 15, this.yPos - 45);
    endShape();

    fill(255, 255, 255);
    triangle(
      this.xPos - 35,
      this.yPos - 20,
      this.xPos - 30,
      this.yPos,
      this.xPos - 25,
      this.yPos - 20
    );
    triangle(
      this.xPos - 31,
      this.yPos - 20,
      this.xPos - 26,
      this.yPos,
      this.xPos - 21,
      this.yPos - 20
    );

    fill(252, 127, 3);
    arc(this.xPos - 15, this.yPos - 25, 40, 40, 30, 330); //head
    fill(255, 255, 255);
    ellipse(this.xPos - 21, this.yPos - 25, 10, 15); // eyes
    fill(0);
    ellipse(this.xPos - 21, this.yPos - 25, 5, 7);
    strokeWeight(5);
    line(this.xPos - 31, this.yPos - 28, this.xPos - 21, this.yPos - 38);
    stroke(237, 222, 14);
    strokeWeight(10);

    beginShape(POINTS); // spots
    vertex(this.xPos -5, this.yPos - 23);
    vertex(this.xPos + 35, this.yPos - 12);
    vertex(this.xPos -5, this.yPos - 20);
    vertex(this.xPos + 15, this.yPos - 4);
    endShape();
  }

  renderPosTurnRight() {

    stroke(0);
    strokeWeight(0.5);
    fill(252, 127, 3);
    beginShape(); //body
    curveVertex(this.xPos + 25, this.yPos - 30);
    curveVertex(this.xPos + 25, this.yPos - 30);
    curveVertex(this.xPos + 25, this.yPos - 10);
    curveVertex(this.xPos + 15, this.yPos);
    curveVertex(this.xPos - 35, this.yPos);
    curveVertex(this.xPos - 55, this.yPos - 15);
    curveVertex(this.xPos - 47, this.yPos - 19);
    curveVertex(this.xPos - 35, this.yPos - 18);
    curveVertex(this.xPos - 30, this.yPos - 20);
    curveVertex(this.xPos - 25, this.yPos - 23);
    curveVertex(this.xPos - 15, this.yPos - 27);
    curveVertex(this.xPos - 5, this.yPos - 33);
    curveVertex(this.xPos + 5, this.yPos - 39);
    curveVertex(this.xPos + 15, this.yPos - 45);
    curveVertex(this.xPos + 15, this.yPos - 45);
    endShape();

    fill(255, 255, 255); //teeth
    triangle(
      this.xPos + 35,
      this.yPos - 20,
      this.xPos + 30,
      this.yPos,
      this.xPos + 25,
      this.yPos - 20
    );
    triangle(
      this.xPos + 31,
      this.yPos - 20,
      this.xPos + 26,
      this.yPos,
      this.xPos + 21,
      this.yPos - 20
    );

    fill(252, 127, 3);
    arc(this.xPos + 15, this.yPos - 25, 40, 40, 210, 140); //head
    fill(255, 255, 255);
    ellipse(this.xPos + 21, this.yPos - 25, 10, 15); // eyes
    fill(0);
    ellipse(this.xPos + 21, this.yPos - 25, 5, 7);
    strokeWeight(5);
    line(this.xPos + 31, this.yPos - 28, this.xPos + 21, this.yPos - 38);
    stroke(237, 222, 14);
    strokeWeight(10);

    beginShape(POINTS); // spots
    vertex(this.xPos +5, this.yPos - 23);
    vertex(this.xPos - 35, this.yPos - 12);
    vertex(this.xPos +5, this.yPos - 20);
    vertex(this.xPos - 15, this.yPos - 4);
    endShape();
  }

  draw() {
    if (this.isRight) {
      this.renderPosTurnRight();
    } else {
      this.renderPosTurnLeft();
    }
  }

  changeDirection() {
    if (this.isRight) {
      this.isRight = false;
      this.isLeft = true;
    } else {
      this.isLeft = false;
      this.isRight = true;
    }
  }

  move() {
    if (this.isRight) {
      this.xPos >= this.endLocX ? this.changeDirection() : (this.xPos += 0.5);
    } else {
      this.xPos <= this.startLocX ? this.changeDirection() : (this.xPos -= 0.5);
    }
  }
}
