function startGame() {
    // clouds = [];
    // trees = [];
    // mountains = [];
    // canyons = [];
    // platforms = [];
    // collectables = [];
  
    gameChar.reset(width, floorPosY);
  
    ground = new Ground();
    sky = new Sky();
  
    flagpole = new Flagpole(floorPosY);
  
    generateCanyons();
  
    generatePlatforms();

    generateEnemies();
  
    generateTrees();
  
    generateClouds();
  
    generateMountains();
  
    generateGroundCollectables();

    generatePlatformCollectables();
  
    cameraPosX = 0;
  
    systemMessage = new Message();
  }