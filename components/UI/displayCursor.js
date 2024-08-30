function displayCursor() {
  var buttonCentreX = soundButton.xPos + soundButton.size / 2;
  var buttonCentreY = soundButton.yPos + soundButton.size / 2;
  var distance = dist(mouseX, mouseY, buttonCentreX, buttonCentreY);
  var isButtonHover = distance <= soundButton.size / 2;

  if (isButtonHover) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
