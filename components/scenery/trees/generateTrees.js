function generateTrees() {
  var generatedTrees = [];
  var minDist = 100;
  var maxDist = 250;
  var trunkWidth = 20;
  var startXPos = width / 2;
  var endXPos = scrollingSpace - 500;
  var currentXPos = startXPos;

  while (currentXPos < endXPos) {
    var dist = round(random(minDist, maxDist));
    var size = Number(random(0.6, 1).toFixed(2));

    for (var i = 0; i < canyons.length; i++) {
      //check for collision with canyons
      if (
        currentXPos + trunkWidth * size >= canyons[i].xPos &&
        currentXPos <= canyons[i].xPos + canyons[i].width
      ) {
        currentXPos += dist;
        continue;
      }
    }

    var tree = new Tree(currentXPos, floorPos_y, size);
    currentXPos += dist;
    generatedTrees.push(tree);
  }
  trees = [...generatedTrees];
}
