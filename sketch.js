/*

The Game Project

Part 6 
Adding game mechanics

*/

// START (all the code was written without assistance)

var floorPos_y;
var scrollingSpace;
var cameraPosX;

var gameChar;

var sky;
var ground;

var collectables;
var canyons;
var trees;

var clouds;
var mountains;

var game_score;

var flagpole;
var lives_icon;

var systemMessage;
var gameStats;

function setup() {
  createCanvas(1024, 576);
  angleMode(DEGREES);
  floorPos_y = (height * 3) / 4;
  lives_icon = loadImage("assets/lives_icon.png");

  scrollingSpace = 5000;

  clouds = [];
  trees = [];
  mountains = [];
  canyons = [];
  collectables = [];

  gameChar = new GameCharacter(width / 2, floorPos_y);
  gameStats = new GameStats();

  startGame();
}

function draw() {
  cameraPosX = gameChar.xPos - width / 2;

  //DRAW THE SKY
  sky.drawSky(gameChar.xPos, scrollingSpace);

  //DRAW GREEN GROUND
  ground.drawGround(width, height, floorPos_y);

  push(); //start of game objects isolation

  translate(-cameraPosX, 0);

  //DRAW MOUNTAINS
  for (var i = 0; i < mountains.length; i++) {
    mountains[i].drawMountain();
  }

  // DRAW CLOUDS
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].drawCloud(scrollingSpace);
  }

  //DRAW TREES
  for (var i = 0; i < trees.length; i++) {
    trees[i].drawTree();
  }

  // DRAW CANYONS
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].drawCanyon();
    var charOverCanyon = canyons[i].checkCanyon(gameChar.xPos, gameChar.yPos);
    if (charOverCanyon === true) {
      gameChar.isPlummeting = true;
      gameChar.xPos = canyons[i].xPos + canyons[i].width / 2; // positioning inside the canyon
    }
  }

  //DRAW COLLECTABLES
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      collectables[i].drawCollectable();
      if (collectables[i].checkCollectable()) {
        gameStats.updateScore();
      }
    }
  }

  // DRAW A FLAGPOLE
  flagpole.drawFlagpole();

  //DRAW THE GAME CHARACTER
  gameChar.drawGameChar();

  pop(); //end of game objects isolation

  // -----------------------
  // game character info code
  // -----------------------
  
  gameStats.displayStats();
  
  // system messages

  if (gameChar.lives < 1) {
    systemMessage.setProps("GAME OVER!", "Press space to continue");
    systemMessage.displayMessage();
    return;
  }

  if (flagpole.isReached) {
    systemMessage.setProps("LEVEL COMPLETE!", "Press space to continue");
    systemMessage.displayMessage();
    return;
  }

  // -----------------------
  // game logic code
  // -----------------------
  gameChar.moveChar(scrollingSpace);

  // check if the char is falling
  gameChar.checkIsFalling();

  // char plummeting
  gameChar.checkIsPlummeting();

  // checking if the flagpole is reached

  if (!flagpole.isReached) {
    flagpole.checkFlagpole(gameChar.xPos);
  }

  if (gameChar.isAlive && gameChar.checkCharDie()) {
    gameStats.resetScore();
    startGame();
  }
}

function startGame() {
  gameChar.isAlive = true;
  gameChar.isPlummeting = false;
  gameChar.xPos = width / 2;
  gameChar.yPos = floorPos_y;

  ground = new Ground();
  console.log(ground);
  sky = new Sky();

  flagpole = new Flagpole(floorPos_y);

  generateCanyons();

  generateTrees();

  generateClouds();

  generateMountains();

  generateCollectables();

  cameraPosX = 0;

  // game_score = 0;

  systemMessage = new Message();
}

function keyPressed() {
  // control the animation of the character when keys are pressed
  // moving left: left arrow or A

  if ((keyCode == 65 || keyCode == 37) && !gameChar.isPlummeting) {
    //moving left: left arrow or A
    gameChar.isLeft = true;
  } else if ((keyCode == 68 || keyCode == 39) && !gameChar.isPlummeting) {
    //moving right: right arrow or D
    gameChar.isRight = true;
  } else if (
    // jumping: arrow up, spacebar or W
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    !gameChar.isPlummeting &&
    !flagpole.isReached
  ) {
    if (!gameChar.isFalling && !flagpole.isReached) {
      gameChar.yPos -= 100;
    }
  } else if (
    // start game when game character runs out of lives
    //more logic to be added // game over state
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    gameChar.lives < 1
  ) {
    gameChar.lives = 3;
    startGame();
  } else if (
    // start game when lvl complete
    //more logic to be added
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    flagpole.isReached
  ) {
    flagpole.isReached = false;
    gameStats.updateLevel();
    startGame();
  }
}

function keyReleased() {
  // change the animation of the character when keys are released.
  if (keyCode == 65 || keyCode == 37) {
    gameChar.isLeft = false;
  } else if (keyCode == 68 || keyCode == 39) {
    gameChar.isRight = false;
  }
}

// END
