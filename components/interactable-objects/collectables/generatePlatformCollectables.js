function generatePlatformCollectables() {
  //collectables spawn on ~30% of the platforms
  var collectableAmount = Math.round(platforms.length * 0.3); 

  // generate collectables on ~30% of the platforms
  for (var i = 0; i < collectableAmount; i++) {
    var collectableXPos = platforms[i].xPos + platforms[i].width / 2;
    var collectable = new Collectable(collectableXPos, platforms[i].yPos);
    collectables.push(collectable);
  }
}
