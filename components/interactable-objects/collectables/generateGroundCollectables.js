function generateGroundCollectables() {
  var generatedCollectables = [];

  labelGenerateCollectables: while (generatedCollectables.length < 6) {
    var xPos = round(random(200, 4200));
    // check for collision with the canyons
    for (var i = 0; i < canyons.length; i++) {
      var collisionWithCanyon =
        xPos >= canyons[i].xPos && xPos <= canyons[i].xPos + canyons[i].width;

      if (collisionWithCanyon) {
        continue labelGenerateCollectables;
      }
    }

    //check for collision with other colletables
    for (var i = 0; i < generatedCollectables.length; i++) {
      var distToCollectable = abs(xPos - generatedCollectables[i].xPos);
      var collisionWithCollectable = distToCollectable < 200;

      if (collisionWithCollectable) {
        continue labelGenerateCollectables;
      }
    }
    //generate a collectable on the ground
    var collectable = new Collectable(xPos, floorPosY);
    generatedCollectables.push(collectable);
  }
  collectables = [...generatedCollectables];
}
