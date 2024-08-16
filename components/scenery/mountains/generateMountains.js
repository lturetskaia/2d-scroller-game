function generateMountains() {
  var generatedMountains = [];

  for (var i = 0; i < 8; i++) {
    // create mountains to mark the beginning and end of level
    if (i === 0) {
      var firstMountain = new Mountain(100, floorPos_y, 1.5);
      var lastMountain = new Mountain(4640, floorPos_y, 1.5);
      generatedMountains.push(firstMountain, lastMountain);
    }

    var mountainSize = Number(random(0.5, 0.9).toFixed(2));
    
    var mountRightEdge = 260 * mountainSize;
    var startXPos = 400;
    var endXPos = scrollingSpace - 400 - mountRightEdge;
    
    var mountainXpos = round(random(startXPos, endXPos));

    var mountain = new Mountain(mountainXpos, floorPos_y, mountainSize);
    generatedMountains.push(mountain);
  }

  mountains = [...generatedMountains];
}
