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

var game;
var systemMessage;
var sound;

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

  sky.drawSky(gameChar.xPos, scrollingSpace); // draw sky

  ground.drawGround(width, height, floorPosY, game.level); //darw ground

  push(); //start of game objects isolation

  translate(-cameraPosX, 0);

  //draw mountains
  for (var i = 0; i < mountains.length; i++) {
    mountains[i].drawMountain();
  }

  // draw clouds
  for (var i = 0; i < clouds.length; i++) {
    clouds[i].drawCloud(scrollingSpace);
  }

  //draw trees
  for (var i = 0; i < trees.length; i++) {
    trees[i].drawTree(game.level);
  }

  // draw canyons
  for (var i = 0; i < canyons.length; i++) {
    canyons[i].drawCanyon();
    var charOverCanyon = canyons[i].checkCanyon(gameChar.xPos, gameChar.yPos);
    if (charOverCanyon === true) {
      gameChar.isPlummeting = true;
      gameChar.xPos = canyons[i].xPos + canyons[i].width / 2; // positioning inside the canyon
    }
  }

  //draw platforms
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].drawPlatform();
  }

  //draw collectables
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      collectables[i].drawCollectable();
      if (collectables[i].checkCollectable()) {
        soundButton.isToggle ? sound.playSound("collectable") : null;
        game.updateScore();
      }
    }
  }

  flagpole.drawFlagpole(); // draw a flagpole

  gameChar.drawGameChar(); //draw the game character

  enemy.draw(); // draw enemy

  pop(); //end of game objects isolation

  // game character info
  game.displayStats();
  soundButton.drawButton();

  //return the character to the ground if flagpole/enemy has been contacted
  if (gameChar.isEnemyContact || flagpole.isReached) {
    gameChar.fall(floorPosY);
  }

  //display system messages
  if (displaySystemMessage()) {
    return;
  }

  // move characters
  gameChar.move(scrollingSpace);

  enemy.move();

  //check if character is jumping and jumping logic
  if (gameChar.isJumping) {
    var jumpBase;

    if (!gameChar.platformContact.state) {
      jumpBase = floorPosY;
    } else {
      // jumping on a platform
      jumpBase = platforms[gameChar.platformContact.platform].yPos;
    }

    gameChar.jump(jumpBase);
  }

  //check for falling and falling logic
  if (gameChar.isFalling) {
    if (!gameChar.platformContact.state) {
      //contact with a platform
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
      //falling over a platform
      var jumpBase = platforms[gameChar.platformContact.platform].yPos;
      gameChar.fall(jumpBase);
    }
  }

  //check game character is over the platform
  if (gameChar.platformContact.state) {
    gameChar.checkLeftPlatform(platforms);
  }

  // char plummeting
  gameChar.checkIsPlummeting();

  //loosing lives when contacting enemy/canyon
  charLooseLife();

  // check contact with enemy
  // if (gameChar.isAlive && gameChar.checkEnemyCollision(enemy) && gameChar.looseLife()) {
  //   soundButton.isToggle ? sound.playSound("fall") : null;

  //   if (gameChar.lives > 0) {
  //     gameChar.isEnemyContact = true;
  //     game.resetToPrevScore();
  //   } else {
  //     game.resetScore();
  //     game.isGameOver = true;
  //   }
  // }

  //   //check if the character looses lives or dies
  //   if (gameChar.isAlive && gameChar.looseLife()) {
  //     soundButton.isToggle ? sound.playSound("fall") : null;

  //     if (gameChar.lives > 0) {
  //       game.resetToPrevScore();
  //       startGame();
  //     } else {
  //       game.resetScore();
  //       game.isGameOver = true;
  //     }
  //   }

  // check if the flagpole is reached
  if (!flagpole.isReached) {
    flagpole.checkFlagpole(gameChar.xPos);
  }
}

function keyPressed() {
  // control the animation of the character when keys are pressed
  if (game.isWelcomeScreen) {
    game.isWelcomeScreen = false;
    startGame();
  } else if (
    // moving left: left arrow or A
    (keyCode == 65 || keyCode == 37) &&
    !gameChar.isPlummeting &&
    !flagpole.isReached &&
    !gameChar.isEnemyContact
  ) {
    gameChar.isLeft = true;
  } else if (
    //moving right: right arrow or D
    (keyCode == 68 || keyCode == 39) &&
    !gameChar.isPlummeting &&
    !flagpole.isReached &&
    !gameChar.isEnemyContact
  ) {
    gameChar.isRight = true;
  } else if (
    // jump: arrow up, spacebar or W
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
    // restart game when game character runs out of lives
    keyCode == 32 &&
    game.isGameOver
  ) {
    game.isGameOver = false;
    gameChar.lives = 3;
    game.level = 1;
    startGame();
  } else if (
    // continue game when character contacts enemy and lives > 0
    keyCode == 32 &&
    gameChar.isEnemyContact
  ) {
    game.resetToPrevScore();
    gameChar.isEnemyContact = false;
    startGame();
  } else if (
    // continue game when lvl complete
    keyCode == 32 &&
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
