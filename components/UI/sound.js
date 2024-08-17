class Sound {
  constructor() {
    this.bgrSound = loadSound("assets/sounds/birds.mp3");
    this.jumpingSound = loadSound("assets/sounds/jump.mp3");
    this.collectableSound = loadSound("assets/sounds/collectable.mp3");
    this.runningSound = loadSound("assets/sounds/running.mp3");
    this.fallingSound = loadSound("assets/sounds/falling.mp3");
  }

  playSound(type) {
    if (type === "bgr") {
      this.bgrSound.loop();
    } else if (type === "run") {
      this.runningSound.play();
    } else if (type === "jump") {
      this.jumpingSound.play();
    } else if (type === "fall") {
      this.fallingSound.play();
    } else if (type === "collectable") {
      this.collectableSound.play();
    }
  }

  muteSound(type) {
    if (type === "bgr") {
      this.bgrSound.stop();
    }
  }
}
