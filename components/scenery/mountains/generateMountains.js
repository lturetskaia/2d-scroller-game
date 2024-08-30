function generateMountains() {
  var generatedMountains = [];
  var colours;
  //generate colours for the mountains depending on the level
  if (game.level % 2 == 1) {
    colours = { top: color(255, 255, 255), bottom: color(61, 47, 6) };
  } else {
    colours = { top: color(96, 64, 31), bottom: color(115, 77, 38) };
  }

    labelGenerateMountains: while (generatedMountains.length < 8) {
    //generate mountains
    var mountainSize = Number(random(0.5, 0.9).toFixed(2));
    var mountainWidth = 340;
    var mountRightEdge = mountainWidth * mountainSize;
    var startXPos = 100;
    var endXPos = scrollingSpace - mountRightEdge;
    var mountainXpos = round(random(startXPos, endXPos));

    //check for collision with canyons
    var mountainCentre = mountainXpos + (mountainWidth * mountainSize) / 2;
    for (var j = 0; j < canyons.length; j++) {
      var canyonCentre = canyons[j].xPos + canyons[j].width / 2;
      var dist = abs(mountainCentre - canyonCentre);
      var isOverlap = dist < canyons[j].width / 2 + (mountainWidth * mountainSize) / 2;
      if (isOverlap) {
        console.log(`Overlap`);
        continue labelGenerateMountains;
      }
    }

    var mountain = new Mountain(mountainXpos, floorPosY, mountainSize, colours);
    generatedMountains.push(mountain);
  }

  mountains = [...generatedMountains];
  console.log(mountains);
}
