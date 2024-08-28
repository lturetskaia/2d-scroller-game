function generatePlatforms() {
  var generatedPlatforms = [];

  labelGeneratePlatforms: while (generatedPlatforms.length < 5) {
    var xPos = round(random(800, 4000));
    var platformWidth = 120;

    //check for collision with other platforms
    for (var i = 0; i < generatedPlatforms.length; i++) {
      var leftEdgeCollision =
        xPos >= generatedPlatforms[i].xPos &&
        xPos <= generatedPlatforms[i].xPos + generatedPlatforms[i].width;
      var rightEdgeCollision =
        xPos + platformWidth >= generatedPlatforms[i].xPos &&
        xPos + platformWidth <= generatedPlatforms[i].xPos + generatedPlatforms[i].width;

      if (leftEdgeCollision || rightEdgeCollision) {
        continue labelGeneratePlatforms;
      }
    }

    var platform = new Platform(xPos, floorPosY - 100, platformWidth);
    generatedPlatforms.push(platform);
  }

  platforms = [...generatedPlatforms];
}
