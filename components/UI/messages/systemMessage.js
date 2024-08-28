class Message {
  constructor() {
    this.title = "";
    this.message = "";
    this.welcome = {
      title: "Welcome to Acorn Hunt!",
      message: `Collect as many acorns as you can avoiding deep canyons and poisonous slugs.


      GOOD LUCK!`,
      keys: `Move left/right:  \u2190  \u2192  or A/D           Jump:  SPACE / W /  \u2191           Start game:  any key`,
    };
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

  displayWelcome() {
    push();
    fill(27, 120, 191, 200);

    rectMode(CENTER);
    stroke(100);
    strokeWeight(2);
    rect(width / 2, height / 2, width, height);

    textAlign(CENTER, CENTER);
    textSize(40);
    fill(0);
    textStyle(BOLD);
    text(this.welcome.title, width / 2, height / 5, 800, 500);

    textStyle(BOLD);
    noStroke();
    textSize(26);
    text(this.welcome.message, width / 2, height / 2, 600, 250);
    
    textSize(20);
    textStyle(NORMAL)
    text(this.welcome.keys, width / 2, height - 30, 800, 250);
    pop();
  }
}
