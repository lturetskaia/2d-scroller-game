/*

The Game Project

Part 6 
Adding game mechanics

*/

// START (all the code was written without assistance)

var floorPosY;
var scrollingSpace;
var cameraPosX;

var gameChar;
var enemy;

var sky;
var ground;

var collectables;
var canyons;
var trees;

var clouds;
var mountains;
var platforms;

var flagpole;
var livesIcon;

var systemMessage;
var game;

var sound;
var soundOnIcon;
var soundOffIcon;
var soundButton;

function preload() {
  sound = new Sound();
}

function setup() {
  createCanvas(1024, 576);
  angleMode(DEGREES);
  floorPosY = (height * 3) / 4;
  livesIcon = loadImage("assets/icons/lives_icon.png");
  soundOnIcon = loadImage("assets/icons/sound_icon.png");
  soundOffIcon = loadImage("assets/icons/sound_off_icon.png");

  scrollingSpace = 5000;

  game = new Game();
  gameChar = new GameCharacter(width / 2, floorPosY);

  soundButton = new SoundButton(950, 10, 50, soundOffIcon, soundOnIcon);

  startGame();
}

function draw() {
  cameraPosX = gameChar.xPos - width / 2;
  displayCursor();

  //DRAW THE SKY
  sky.drawSky(gameChar.xPos, scrollingSpace);

  //DRAW GREEN GROUND
  ground.drawGround(width, height, floorPosY, game.level);

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
    trees[i].drawTree(game.level);
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

  //DRAW PLATFORMS
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].drawPlatform();
  }

  //DRAW COLLECTABLES
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      collectables[i].drawCollectable();
      if (collectables[i].checkCollectable()) {
        soundButton.isToggle ? sound.playSound("collectable") : null;
        game.updateScore();
      }
    }
  }

  // DRAW A FLAGPOLE
  flagpole.drawFlagpole();

  //DRAW THE GAME CHARACTER
  gameChar.drawGameChar();

  // DRAW ENEMY
  enemy.draw();

  // DRAW ENEMY

  pop(); //end of game objects isolation

  // -----------------------
  // game character info code
  // -----------------------

  game.displayStats();

  soundButton.drawButton();

  // system messages

  if (gameChar.isEnemyContact && gameChar.lives > 0) {
    systemMessage.setProps("You have been eaten!", "Press space to continue...");
    systemMessage.displayMessage();
    return;
  }

  if (game.isGameOver || gameChar.isEnemyContact && gameChar.lives <= 0) {
    systemMessage.setProps("GAME OVER!", "Press space to start a new game...");
    systemMessage.displayMessage();
    return;
  }

  if (flagpole.isReached) {
    systemMessage.setProps("LEVEL COMPLETE!", "Press space to continue...");
    systemMessage.displayMessage();
    return;
  }

  // -----------------------
  // game logic code
  // -----------------------
  gameChar.move(scrollingSpace);

  enemy.move();

  //check for jumping
  if (gameChar.isJumping) {
    var jumpBase;

    if (!gameChar.platformContact.state) {
      jumpBase = floorPosY;
    } else {
      jumpBase = platforms[gameChar.platformContact.platform].yPos;
    }

    gameChar.jump(jumpBase);
  }

  //check for falling and falling logic

  if (gameChar.isFalling) {
    if (!gameChar.platformContact.state) {
      for (var i = 0; i < platforms.length; i++) {
        if (platforms[i].checkContact(gameChar.xPos, gameChar.yPos)) {
          gameChar.platformContact.state = true;
          gameChar.platformContact.platform = i;
          gameChar.isFalling = false;
          gameChar.yPos = platforms[i].yPos - 4;
          break;
        }
      }
      gameChar.fall(floorPosY);
    } else {
      jumpBase = platforms[gameChar.platformContact.platform].yPos;
      gameChar.fall(jumpBase);
    }
  }

  //check game character is over the platform

  if (gameChar.platformContact.state) {
    gameChar.checkLeftPlatform(platforms);
  }

  // char plummeting
  gameChar.checkIsPlummeting();

  //check collision with enemy

  if (gameChar.checkEnemyCollision(enemy)) {
    gameChar.looseLife();
  }

  // check if the flagpole is reached
  if (!flagpole.isReached) {
    flagpole.checkFlagpole(gameChar.xPos);
  }

  //check if the character looses lives or dies
  if (gameChar.isAlive && gameChar.looseLife()) {
    soundButton.isToggle ? sound.playSound("fall") : null;
    game.resetScore();

    if (gameChar.lives > 0) {
      game.resetToPrevScore();
      startGame();
    } else {
      game.isGameOver = true;
    }
  }
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
    !gameChar.isFalling &&
    !gameChar.isJumping &&
    !gameChar.isPlummeting &&
    !flagpole.isReached &&
    !gameChar.isEnemyContact
  ) {
    soundButton.isToggle ? sound.playSound("jump") : null;
    gameChar.isJumping = true;
  } else if (
    // start game when game character runs out of lives
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    game.isGameOver
  ) {
    game.isGameOver = false;
    gameChar.lives = 3;
    game.level = 1;
    startGame();
  } else if (
    // start game when game character runs out of lives
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    gameChar.isEnemyContact
  ) {
    game.resetToPrevScore();
    gameChar.isEnemyContact = false;
    startGame();
  } else if (
    // start game when lvl complete
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    flagpole.isReached
  ) {
    flagpole.isReached = false;
    game.updateLevel();
    game.prevScore = game.score;
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

function mousePressed() {
  //toggle on and off the sound button
  var buttonCentreX = soundButton.xPos + soundButton.size / 2;
  var buttonCentreY = soundButton.yPos + soundButton.size / 2;
  var distance = dist(mouseX, mouseY, buttonCentreX, buttonCentreY);
  var buttonClicked = distance <= soundButton.size / 2;

  if (buttonClicked) {
    soundButton.toggleButton();
    soundButton.isToggle ? sound.playSound("bgr") : sound.muteSound();
  }
}

// END
