function startGame() {
  gameChar.reset(width, floorPosY);

  ground = new Ground();
  sky = new Sky();
  flagpole = new Flagpole(floorPosY);
  systemMessage = new Message();

  cameraPosX = 0;

  generateCanyons();

  generatePlatforms();

  generateEnemies();

  generateTrees();

  generateClouds();

  generateMountains();

  generateGroundCollectables();

  generatePlatformCollectables();
}
