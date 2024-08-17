class SoundButton {
  constructor(xPos, yPos, size, image, altImage) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.image = image;
    this.toggleImage = altImage;
    this.isToggle = false;
  }

  drawButton() {
    if (this.isToggle === false) {
      image(this.image, this.xPos, this.yPos, this.size, this.size);
    } else {
      image(this.toggleImage, this.xPos, this.yPos, this.size, this.size);
    }
  }

  toggleButton() {
    if (this.isToggle === false) {
      this.isToggle = true;
    } else {
      this.isToggle = false;
    }
  }
}
