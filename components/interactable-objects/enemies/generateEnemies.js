function generateEnemies() {
  var startLocX = canyons[1].xPos + canyons[1].width + 50;
  var endLocX = canyons[2].xPos - 50;
  var spawnPosX = round(random(startLocX, endLocX));
  enemy = new Enemy(spawnPosX, floorPosY, startLocX, endLocX);
}
