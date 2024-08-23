function displayCursor() {

  var buttonCentreX = soundButton.xPos + soundButton.size / 2;
  var buttonCentreY = soundButton.yPos + soundButton.size / 2;
  var distance = dist(mouseX, mouseY, buttonCentreX, buttonCentreY);
  var buttonHover = distance <= soundButton.size / 2;

  if (buttonHover) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
}
