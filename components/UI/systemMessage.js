class Message {
  constructor() {
    this.title = "";
    this.message = "";
  }

  setProps(title, message) {
    this.title = title;
    this.message = message;
  }

  displayMessage() {
    push();
    fill(100, 100, 100, 170);
    rectMode(CENTER);
    stroke(100);
    strokeWeight(2);
    rect(width / 2, height / 3, 400, 250, 10);
    textAlign(CENTER, CENTER);
    textSize(30);
    fill(0);
    textStyle(BOLD);
    text(this.title, width / 2, height / 3 - 30, 400, 250);
    textStyle(NORMAL);
    noStroke();
    textSize(22);
    text(this.message, width / 2, height / 3 + 20, 400, 250);
    pop();
  }
}
