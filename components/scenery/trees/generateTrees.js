function generateTrees() {
  var generatedTrees = [];
  var minDist = 150;
  var maxDist = 400;
  var trunkWidth = 20;
  var startXPos = width / 2;
  var endXPos = scrollingSpace - 500;
  var currentXPos = startXPos;

  var colours = [
    "violet",
    "pink",
    "NavajoWhite",
    "Orchid",
    "BlanchedAlmond",
    "CornflowerBlue",
  ];

  while (currentXPos < endXPos) {
    var dist = round(random(minDist, maxDist));
    var size = Number(random(0.6, 1).toFixed(2));
    var colour = colours[round(random(0, colours.length - 1))];

    for (var i = 0; i < canyons.length; i++) {
      //check for contact with canyons
      if (
        currentXPos + trunkWidth * size >= canyons[i].xPos &&
        currentXPos <= canyons[i].xPos + canyons[i].width
      ) {
        currentXPos += dist;
        continue;
      }
    }

    var tree = new Tree(currentXPos, floorPosY, size, colour);
    currentXPos += dist;
    generatedTrees.push(tree);
  }
  trees = [...generatedTrees];
}
