function generateCollectables() {
  var generatedCollectables = [];

  labelGenerateCollectables: while (generatedCollectables.length < 6) {
    var xPos = round(random(600, 4000));
    for (var i = 0; i < canyons.length; i++) {
      var collisionWithCanyon =
        xPos >= canyons[i].xPos && xPos <= canyons[i].xPos + canyons[i].width;

      if (collisionWithCanyon) {
        continue labelGenerateCollectables;
      }
    }

    for (var i = 0; i < generatedCollectables.length; i++) {
      var distToCollectable = abs(xPos - generatedCollectables[i].xPos);
      var collisionWithCollectable = distToCollectable < 200;

      if (collisionWithCollectable) {
        continue labelGenerateCollectables;
      }
    }
    var collectable = new Collectable(xPos, floorPos_y);
    generatedCollectables.push(collectable);
  }
  collectables = [...generatedCollectables];
}
