function generateMountains() {
  var generatedMountains = [];
  var colours;
  //generate colours for the mountains depending on the level
  if (game.level % 2 == 1) {
    colours = { top: color(255, 255, 255), bottom: color(61, 47, 6) };
  } else {
    colours = { top: color(96, 64, 31), bottom: color(115, 77, 38) };
  }

  for (var i = 0; i < 8; i++) {
    //generate mountains
    var mountainSize = Number(random(0.5, 0.9).toFixed(2));
    var mountainWidth = 260;
    var mountRightEdge = mountainWidth * mountainSize;
    var startXPos = 100;
    var endXPos = scrollingSpace - mountRightEdge;
    var mountainXpos = round(random(startXPos, endXPos));

    var mountain = new Mountain(mountainXpos, floorPosY, mountainSize, colours);
    generatedMountains.push(mountain);
  }

  mountains = [...generatedMountains];
}
