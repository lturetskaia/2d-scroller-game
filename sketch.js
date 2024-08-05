/*

The Game Project

Part 6 
Adding game mechanics

*/

// START (all the code was written without assistance)

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollingSpace;
var cameraPosX;

var bgrColoursDay;
var bgrColoursNight;
var currentBgrColour;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var collectables;
var canyons;

var trees_x;
var trees_y;

var clouds;
var mountains;

var game_score;

var flagpole;
var lives;
var lives_icon;

function setup() {
  createCanvas(1024, 576);
  angleMode(DEGREES);
  floorPos_y = (height * 3) / 4;
  lives = 3;
  lives_icon = loadImage("assets/lives_icon.png");

  startGame();
}

function draw() {
  cameraPosX = gameChar_x - width / 2;

  //DRAW THE SKY
  //iterate through bgrColoursDay, mapping from bgrColoursDay to bgrColoursNight
  //and updating currentBgrColour depending on the character's x position
  for (var [key, value] of Object.entries(bgrColoursDay)) {
    currentBgrColour[key] = map(
      gameChar_x,
      width / 2,
      scrollingSpace - width / 2,
      value,
      bgrColoursNight[key]
    );
  }

  // render the background color gradient
  for (var i = 0; i < height; i++) {
    var redValue = lerp(
      currentBgrColour.top_r,
      currentBgrColour.bottom_r,
      i / height
    );
    var greenValue = lerp(
      currentBgrColour.top_g,
      currentBgrColour.bottom_g,
      i / height
    );
    var blueValue = lerp(
      currentBgrColour.top_b,
      currentBgrColour.bottom_b,
      i / height
    );

    stroke(redValue, greenValue, blueValue);
    line(0, i, scrollingSpace, i);
  }

  //DRAW GREEN GROUND
  noStroke();
  fill(0, 155, 0);
  rect(0, floorPos_y, width, height - floorPos_y);

  push(); //start of game objects isolation

  translate(-cameraPosX, 0);

  //DRAW MOUNTAINS
  drawMountains();

  // DRAW CLOUDS + movement
  drawClouds();

  //DRAW TREES
  drawTrees();

  // DRAW CANYONS
  for (var i = 0; i < canyons.length; i++) {
    drawCanyon(canyons[i]);
  }

  //DRAW COLLECTABLES
  for (var i = 0; i < collectables.length; i++) {
    if (!collectables[i].isFound) {
      checkCollectable(collectables[i]);
      drawCollectable(collectables[i]);
    }
  }

  // DRAW A FLAGPOLE
  renderFlagpole();

  //DRAW THE GAME CHARACTER
  drawGameChar();

  pop(); //end of game objects isolation

  // -----------------------
  // game character info code
  // -----------------------
  //score
  textSize(18);
  stroke(0);
  strokeWeight(3);

  fill(255);
  text(`score: ${game_score}`, 20, 60);

  //lives remaining

  for (var i = 0; i < lives; i++) {
    image(lives_icon, 18 + i * 30, 10, 25, 25);
  }

  // system messages
  if (lives < 1) {
    displayMessage("GAME OVER");
    return;
  }

  if (flagpole.isReached) {
    displayMessage("LEVEL COMPLETE!");
    return;
  }

  // -----------------------
  // game logic code
  // -----------------------

  // walking left and right
  if (isLeft) {
    gameChar_x = max(gameChar_x - 7, width / 2);
  } else if (isRight) {
    gameChar_x = min(gameChar_x + 7, scrollingSpace - width / 2);
  }

  // jumping and falling facing frontwards

  if (gameChar_y < floorPos_y) {
    isFalling = true;
    gameChar_y = min(gameChar_y + 4, floorPos_y);
  } else {
    isFalling = false;
  }

  // detecting the char is over the canyon
  for (var i = 0; i < canyons.length; i++) {
    checkCanyon(canyons[i]);
  }

  // plummeting and positioning inside the canyon
  if (isPlummeting) {
    // gameChar_y = min(gameChar_y + 15, height - 6);
    gameChar_y += 20;
  }

  // checking if the flagpole is reached

  if (!flagpole.isReached) {
    checkFlagpole();
  }

  checkPlayerDie();
}

function startGame() {
  gameChar_x = width / 2;
  gameChar_y = floorPos_y;

  bgrColoursDay = {
    top_r: 52,
    top_g: 168,
    top_b: 235,
    bottom_r: 212,
    bottom_g: 232,
    bottom_b: 250,
  };

  bgrColoursNight = {
    top_r: 46,
    top_g: 3,
    top_b: 66,
    bottom_r: 247,
    bottom_g: 116,
    bottom_b: 79,
  };

  currentBgrColour = { ...bgrColoursDay };

  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;

  collectables = [
    { x_pos: 850, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 1500, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 2500, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 3200, y_pos: floorPos_y, size: 50, isFound: false },
    { x_pos: 4000, y_pos: floorPos_y, size: 50, isFound: false },
  ];

  canyons = [
    { x_pos: 700, width: 80 },
    { x_pos: 2200, width: 100 },
    { x_pos: 4200, width: 120 },
  ];

  trees_x = [600, 900, 1400, 2000, 2350, 2800, 3200, 3500, 3700, 4000, 4500];
  trees_y = floorPos_y;

  mountains = [
    { x_pos: 100, y_pos: 432, size: 1.5 },
    { x_pos: 1000, y_pos: 432, size: 0.5 },
    { x_pos: 1600, y_pos: 432, size: 1 },
    { x_pos: 2600, y_pos: 432, size: 0.7 },
    { x_pos: 4640, y_pos: 432, size: 1.5 },
  ];
  clouds = [
    { x_pos: 50, y_pos: 150, size: 1, speed: 1 },
    { x_pos: 600, y_pos: 80, size: 0.7, speed: 0 },
    { x_pos: 1000, y_pos: 200, size: 0.9, speed: 0 },
    { x_pos: 1600, y_pos: 140, size: 0.5, speed: 0 },
    { x_pos: 1800, y_pos: 110, size: 1, speed: 0 },
    { x_pos: 2200, y_pos: 140, size: 0.7, speed: 0 },
    { x_pos: 2900, y_pos: 130, size: 0.8, speed: 0 },
    { x_pos: 3300, y_pos: 180, size: 0.5, speed: 0 },
    { x_pos: 3800, y_pos: 70, size: 1, speed: 0 },
    { x_pos: 4500, y_pos: 100, size: 0.6, speed: 0 },
  ];

  for (var i = 0; i < clouds.length; i++) {
    clouds[i].speed = Math.random() * 0.8 + 0.1;
  } // generate random cloud speed [0.1, 0.9]

  flagpole = { x_pos: 4400, isReached: false };

  scrollingSpace = 5000;
  cameraPosX = 0;
  game_score = 0;
}

function keyPressed() {
  // control the animation of the character when keys are pressed
  // moving left: left arrow or A

  if ((keyCode == 65 || keyCode == 37) && !isPlummeting) {
    //moving left: left arrow or A
    isLeft = true;
  } else if ((keyCode == 68 || keyCode == 39) && !isPlummeting) {
    //moving right: right arrow or D
    isRight = true;
  } else if (
    // jumping: arrow up, spacebar or W
    (keyCode == 87 || keyCode == 32 || keyCode == 38) &&
    !isPlummeting
  ) {
    if (!isFalling && !flagpole.isReached) {
      gameChar_y -= 100;
    }
  }
}

function keyReleased() {
  // change the animation of the character when keys are released.
  if (keyCode == 65 || keyCode == 37) {
    isLeft = false;
  } else if (keyCode == 68 || keyCode == 39) {
    isRight = false;
  }
}

// -----------------------
// Draw character function
// -----------------------

function drawGameChar() {
  if (isLeft && isFalling) {
    // jumping-left
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x - 5, gameChar_y - 24, 30, 60, 120, 60, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x - 12, gameChar_y - 29, 16, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x - 5, gameChar_y - 3, 24, 14, 140, 40, CHORD); //left rear paw
    arc(gameChar_x, gameChar_y - 25, 12, 16, 300, 250); //left front paw

    arc(gameChar_x + 6, gameChar_y - 62, 23, 25, 210, 130); //right ear
    ellipse(gameChar_x - 5, gameChar_y - 60, 30, 30); // head
    arc(gameChar_x + 10, gameChar_y - 60, 23, 25, 210, 130); //left ear
    fill(238, 152, 101);
    arc(gameChar_x + 10, gameChar_y - 60, 13, 15, 210, 130); //left inner ear
    stroke(0);
    strokeWeight(4);
    point(gameChar_x - 5, gameChar_y - 62); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(gameChar_x + 6, gameChar_y);
    curveVertex(gameChar_x + 6, gameChar_y);
    curveVertex(gameChar_x + 18, gameChar_y - 3);
    curveVertex(gameChar_x + 23, gameChar_y - 15);
    curveVertex(gameChar_x + 18, gameChar_y - 34);
    curveVertex(gameChar_x + 24, gameChar_y - 45);
    curveVertex(gameChar_x + 24, gameChar_y - 45);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(gameChar_x - 14, gameChar_y - 55, gameChar_x + 5, gameChar_y - 50); // left whiskers
    line(gameChar_x - 14, gameChar_y - 55, gameChar_x + 5, gameChar_y - 54); // left whiskers
    line(gameChar_x - 14, gameChar_y - 55, gameChar_x + 5, gameChar_y - 45); // left whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x - 16,
      gameChar_y - 57,
      gameChar_x - 20,
      gameChar_y - 57,
      gameChar_x - 18,
      gameChar_y - 53
    );
  } else if (isRight && isFalling) {
    // jumping-right
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x + 5, gameChar_y - 24, 30, 60, 120, 60, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x + 12, gameChar_y - 29, 16, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x + 5, gameChar_y - 3, 24, 14, 140, 40, CHORD); //left rear paw
    arc(gameChar_x, gameChar_y - 25, 12, 16, 300, 250); //left front paw

    arc(gameChar_x - 6, gameChar_y - 62, 23, 25, 40, 330); //left ear
    ellipse(gameChar_x + 5, gameChar_y - 60, 30, 30); // head
    arc(gameChar_x - 10, gameChar_y - 60, 23, 25, 40, 330); //right ear
    fill(238, 152, 101);
    arc(gameChar_x - 10, gameChar_y - 60, 13, 15, 40, 330); //right inner ear
    stroke(0);
    strokeWeight(4);
    point(gameChar_x + 5, gameChar_y - 62); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(gameChar_x - 6, gameChar_y);
    curveVertex(gameChar_x - 6, gameChar_y);
    curveVertex(gameChar_x - 18, gameChar_y - 3);
    curveVertex(gameChar_x - 23, gameChar_y - 15);
    curveVertex(gameChar_x - 18, gameChar_y - 34);
    curveVertex(gameChar_x - 24, gameChar_y - 45);
    curveVertex(gameChar_x - 24, gameChar_y - 45);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(gameChar_x + 14, gameChar_y - 55, gameChar_x - 5, gameChar_y - 50); // right whiskers
    line(gameChar_x + 14, gameChar_y - 55, gameChar_x - 5, gameChar_y - 54); // right whiskers
    line(gameChar_x + 14, gameChar_y - 55, gameChar_x - 5, gameChar_y - 45); // right whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x + 16,
      gameChar_y - 57,
      gameChar_x + 20,
      gameChar_y - 57,
      gameChar_x + 18,
      gameChar_y - 53
    );
  } else if (isLeft) {
    // walking left
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x - 5, gameChar_y - 12, 30, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x - 12, gameChar_y - 17, 16, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x - 2, gameChar_y, 20, 14, 180, 0, CHORD); //left rear paw
    arc(gameChar_x, gameChar_y - 23, 16, 10, 30, 0); //left front paw

    arc(gameChar_x + 1, gameChar_y - 60, 23, 25, 180, 90); //right ear
    ellipse(gameChar_x - 5, gameChar_y - 48, 30, 30); // head
    arc(gameChar_x + 5, gameChar_y - 58, 23, 25, 180, 90); //left ear
    fill(238, 152, 101);
    arc(gameChar_x + 5, gameChar_y - 58, 13, 15, 180, 90); //left inner ear
    stroke(0);
    strokeWeight(4);
    point(gameChar_x - 5, gameChar_y - 50); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(gameChar_x + 9, gameChar_y);
    curveVertex(gameChar_x + 9, gameChar_y);
    curveVertex(gameChar_x + 20, gameChar_y - 12);
    curveVertex(gameChar_x + 16, gameChar_y - 33);
    curveVertex(gameChar_x + 24, gameChar_y - 48);
    curveVertex(gameChar_x + 24, gameChar_y - 48);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(gameChar_x - 14, gameChar_y - 43, gameChar_x + 5, gameChar_y - 43); // left whiskers
    line(gameChar_x - 14, gameChar_y - 43, gameChar_x + 5, gameChar_y - 47); // left whiskers
    line(gameChar_x - 14, gameChar_y - 43, gameChar_x + 5, gameChar_y - 39); // left whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x - 16,
      gameChar_y - 45,
      gameChar_x - 20,
      gameChar_y - 45,
      gameChar_x - 18,
      gameChar_y - 41
    );
  } else if (isRight) {
    // walking right
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x + 5, gameChar_y - 12, 30, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x + 12, gameChar_y - 17, 16, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x + 2, gameChar_y, 20, 14, 180, 0, CHORD); //left rear paw
    arc(gameChar_x, gameChar_y - 23, 16, 10, 180, 150); //left front paw

    arc(gameChar_x - 1, gameChar_y - 60, 23, 25, 90, 360); //left ear
    ellipse(gameChar_x + 5, gameChar_y - 48, 30, 30); // head
    arc(gameChar_x - 5, gameChar_y - 58, 23, 25, 90, 360); //right ear
    fill(238, 152, 101);
    arc(gameChar_x - 5, gameChar_y - 58, 13, 15, 90, 360); //right inner ear
    stroke(0);
    strokeWeight(4);
    point(gameChar_x + 5, gameChar_y - 50); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(gameChar_x - 9, gameChar_y);
    curveVertex(gameChar_x - 9, gameChar_y);
    curveVertex(gameChar_x - 20, gameChar_y - 11);
    curveVertex(gameChar_x - 16, gameChar_y - 33);
    curveVertex(gameChar_x - 24, gameChar_y - 48);
    curveVertex(gameChar_x - 24, gameChar_y - 48);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(gameChar_x + 14, gameChar_y - 43, gameChar_x - 5, gameChar_y - 43); // right whiskers
    line(gameChar_x + 14, gameChar_y - 43, gameChar_x - 5, gameChar_y - 47); // right whiskers
    line(gameChar_x + 14, gameChar_y - 43, gameChar_x - 5, gameChar_y - 39); // right whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x + 16,
      gameChar_y - 45,
      gameChar_x + 20,
      gameChar_y - 45,
      gameChar_x + 18,
      gameChar_y - 41
    );
  } else if (isFalling || isPlummeting) {
    // jumping facing forwards

    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x, gameChar_y - 21, 40, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x, gameChar_y - 25, 20, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x - 10, gameChar_y - 5, 14, 14, 120, 60, CHORD); //left rear paw
    arc(gameChar_x + 10, gameChar_y - 5, 14, 14, 120, 60, CHORD); // right rear paw
    arc(gameChar_x - 14, gameChar_y - 25, 10, 14, 300, 250); //left front paw
    arc(gameChar_x + 14, gameChar_y - 25, 10, 14, 300, 250); // right front paw

    ellipse(gameChar_x - 12, gameChar_y - 64, 23, 25); //left ear
    ellipse(gameChar_x + 12, gameChar_y - 64, 23, 25); //right ear

    fill(238, 152, 101);
    ellipse(gameChar_x - 12, gameChar_y - 64, 13, 15); //left inner ear
    ellipse(gameChar_x + 12, gameChar_y - 64, 13, 15); //right inner ear

    fill(160, 176, 175);
    ellipse(gameChar_x, gameChar_y - 55, 30, 30); //head
    strokeWeight(4);
    point(gameChar_x - 7, gameChar_y - 57); //left eye
    point(gameChar_x + 7, gameChar_y - 57); //right eye

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x,
      gameChar_y - 48,
      gameChar_x - 3,
      gameChar_y - 3 - 48,
      gameChar_x + 3,
      gameChar_y - 3 - 48
    );

    stroke(0);
    strokeWeight(0.5);
    line(gameChar_x, gameChar_y - 48, gameChar_x - 3, gameChar_y - 48 + 3); // muzzle
    line(gameChar_x, gameChar_y - 48, gameChar_x + 3, gameChar_y - 48 + 3); // muzzle
    line(gameChar_x - 5, gameChar_y - 48, gameChar_x - 22, gameChar_y - 40); // left whiskers
    line(gameChar_x - 5, gameChar_y - 48, gameChar_x - 22, gameChar_y - 46); // left whiskers
    line(gameChar_x + 5, gameChar_y - 48, gameChar_x + 22, gameChar_y - 40); // right whiskers
    line(gameChar_x + 5, gameChar_y - 48, gameChar_x + 22, gameChar_y - 46); // right whiskers
  } else {
    // character standing facing frontwards

    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(gameChar_x, gameChar_y - 15, 40, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(gameChar_x, gameChar_y - 15, 20, 28); //belly

    fill(160, 176, 175);
    arc(gameChar_x - 10, gameChar_y - 1, 14, 14, 180, 0, CHORD); //left rear paw
    arc(gameChar_x + 10, gameChar_y - 1, 14, 14, 180, 0, CHORD); // right rear paw
    arc(gameChar_x - 10, gameChar_y - 24, 14, 10, 180, 150); //left front paw
    arc(gameChar_x + 10, gameChar_y - 24, 14, 10, 30, 360); // right front paw

    ellipse(gameChar_x - 12, gameChar_y - 64, 23, 25); //left ear
    ellipse(gameChar_x + 12, gameChar_y - 64, 23, 25); //right ear

    fill(238, 152, 101);
    ellipse(gameChar_x - 12, gameChar_y - 64, 13, 15); //left inner ear
    ellipse(gameChar_x + 12, gameChar_y - 64, 13, 15); //right inner ear

    fill(160, 176, 175);
    ellipse(gameChar_x, gameChar_y - 49, 30, 30); //head
    strokeWeight(4);
    point(gameChar_x - 7, gameChar_y - 51); //left eye
    point(gameChar_x + 7, gameChar_y - 51); //right eye

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      gameChar_x,
      gameChar_y - 42,
      gameChar_x - 3,
      gameChar_y - 3 - 42,
      gameChar_x + 3,
      gameChar_y - 3 - 42
    );

    stroke(0);
    strokeWeight(0.5);
    line(gameChar_x, gameChar_y - 42, gameChar_x - 3, gameChar_y - 42 + 3); // muzzle
    line(gameChar_x, gameChar_y - 42, gameChar_x + 3, gameChar_y - 42 + 3); // muzzle
    line(gameChar_x - 5, gameChar_y - 42, gameChar_x - 22, gameChar_y - 44); // left whiskers
    line(gameChar_x - 5, gameChar_y - 42, gameChar_x - 22, gameChar_y - 40); // left whiskers
    line(gameChar_x + 5, gameChar_y - 42, gameChar_x + 22, gameChar_y - 44); // right whiskers
    line(gameChar_x + 5, gameChar_y - 42, gameChar_x + 22, gameChar_y - 40); // right whiskers
  }
}

// -----------------------
// Draw scenery functions
// -----------------------

function drawClouds() {
  for (var i = 0; i < clouds.length; i++) {
    if (i % 2 === 0) {
      if (clouds[i].x_pos - 60 * clouds[i].size > scrollingSpace) {
        clouds[i].x_pos = 0 - 120 * clouds[i].size - (80 * clouds[i].size) / 2;
        // when a cloud reaches the end of scrolling space it appears on the other side
      } else {
        //even number cloud objects float right
        clouds[i].x_pos += clouds[i].speed;
      }
    } else {
      if (
        clouds[i].x_pos + 120 * clouds[i].size + (80 * clouds[i].size) / 2 <
        0
      ) {
        clouds[i].x_pos = scrollingSpace + (60 * clouds[i].size) / 2;
        // when a cloud reaches the beginning of scrolling space it appears on the other side
      } else {
        // odd number clouds float left
        clouds[i].x_pos -= clouds[i].speed;
      }
    }

    // clouds turn grey when gameChar_x increases
    fill(map(gameChar_x, width / 2, scrollingSpace - width / 2, 255, 150), 250);
    ellipse(
      clouds[i].x_pos + clouds[i].speed,
      clouds[i].y_pos,
      60 * clouds[i].size,
      60 * clouds[i].size
    );
    ellipse(
      clouds[i].x_pos + 40 * clouds[i].size,
      clouds[i].y_pos - 10 * clouds[i].size,
      80 * clouds[i].size,
      80 * clouds[i].size
    );
    ellipse(
      clouds[i].x_pos + 120 * clouds[i].size,
      clouds[i].y_pos - 10 * clouds[i].size,
      80 * clouds[i].size,
      80 * clouds[i].size
    );
    ellipse(
      clouds[i].x_pos + 80 * clouds[i].size,
      clouds[i].y_pos - 20 * clouds[i].size,
      100 * clouds[i].size,
      100 * clouds[i].size
    );
  }
}

function drawMountains() {
  for (var i = 0; i < mountains.length; i++) {
    fill(61, 47, 6);
    triangle(
      mountains[i].x_pos,
      mountains[i].y_pos,
      mountains[i].x_pos + 130 * mountains[i].size,
      mountains[i].y_pos - 332 * mountains[i].size,
      mountains[i].x_pos + 260 * mountains[i].size,
      mountains[i].y_pos
    );
    triangle(
      mountains[i].x_pos - 80 * mountains[i].size,
      mountains[i].y_pos,
      mountains[i].x_pos + 10 * mountains[i].size,
      mountains[i].y_pos - 212 * mountains[i].size,
      mountains[i].x_pos + 80 * mountains[i].size,
      mountains[i].y_pos
    );

    // snow on top
    fill(255, 255, 255);
    beginShape();
    vertex(
      mountains[i].x_pos + 130 * mountains[i].size,
      mountains[i].y_pos - 332 * mountains[i].size
    );
    vertex(
      mountains[i].x_pos + 90 * mountains[i].size,
      mountains[i].y_pos - 232 * mountains[i].size
    );
    vertex(
      mountains[i].x_pos + 110 * mountains[i].size,
      mountains[i].y_pos - 252 * mountains[i].size
    );
    vertex(
      mountains[i].x_pos + 130 * mountains[i].size,
      mountains[i].y_pos - 212 * mountains[i].size
    );
    vertex(
      mountains[i].x_pos + 160 * mountains[i].size,
      mountains[i].y_pos - 242 * mountains[i].size
    );
    vertex(
      mountains[i].x_pos + 170 * mountains[i].size,
      mountains[i].y_pos - 232 * mountains[i].size
    );
    endShape();
  }
}

function drawTrees() {
  for (var i = 0; i < trees_x.length; i++) {
    fill(140, 100, 40);
    rect(trees_x[i], trees_y - 144, 20, 144);

    //leaves
    fill(9, 135, 70);
    ellipse(trees_x[i] + 10, trees_y - 191, 120, 180);
    ellipse(trees_x[i] - 30, trees_y - 160, 80, 80);
    ellipse(trees_x[i] - 30, trees_y - 220, 80, 80);
    ellipse(trees_x[i] + 50, trees_y - 220, 80, 80);
    ellipse(trees_x[i] + 50, trees_y - 160, 80, 80);

    //branches
    fill(140, 100, 4);
    triangle(
      trees_x[i] + 20,
      trees_y - 182,
      trees_x[i] + 40,
      trees_y - 222,
      trees_x[i] + 20,
      trees_y - 162
    );
    triangle(
      trees_x[i],
      trees_y - 152,
      trees_x[i] - 20,
      trees_y - 202,
      trees_x[i],
      trees_y - 122
    );
  }
}

// ----------------------
// Collectable functions
// ----------------------

function drawCollectable(t_collectable) {
  if (!t_collectable.isFound) {
    stroke(117, 79, 45);
    strokeWeight(1);
    fill(217, 190, 82);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos - 20,
      t_collectable.size * 0.7,
      t_collectable.size * 0.8
    );
    fill(209, 144, 84);
    ellipse(
      t_collectable.x_pos,
      t_collectable.y_pos - 20 - t_collectable.size * 0.24,
      t_collectable.size * 0.8,
      t_collectable.size * 0.4
    );

    push();
    fill(145, 113, 57);
    translate(
      t_collectable.x_pos - 3,
      t_collectable.y_pos - 20 - t_collectable.size * 0.44
    );
    rectMode(CENTER);
    rotate(-30);
    rect(
      0,
      0,
      t_collectable.size * 0.12,
      t_collectable.size * 0.32,
      t_collectable.size * 0.04
    );
    pop();
  }
}

function checkCollectable(t_collectable) {
  if (
    dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20
  ) {
    t_collectable.isFound = true;
    game_score += 1;
    console.log(game_score);
  }
}

// -----------------
// Canyon functions
// -----------------

function drawCanyon(t_canyon) {
  fill(77, 232, 227);
  beginShape();
  vertex(t_canyon.x_pos, 432);
  vertex(t_canyon.x_pos + 25, 576);
  vertex(t_canyon.x_pos + t_canyon.width - 25, 576);
  vertex(t_canyon.x_pos + t_canyon.width, 432);
  endShape();

  //bottom
  fill(196, 171, 128);
  beginShape();
  vertex(t_canyon.x_pos + 23, 564);
  vertex(t_canyon.x_pos + 27 + t_canyon.width - 50, 564);
  vertex(t_canyon.x_pos + 25 + t_canyon.width - 50, 576);
  vertex(t_canyon.x_pos + 25, 576);
  vertex(t_canyon.x_pos + 23, 564);
  endShape();
  //to be changed to stones
}

function checkCanyon(t_canyon) {
  if (
    gameChar_x > t_canyon.x_pos &&
    gameChar_x < t_canyon.x_pos + t_canyon.width &&
    gameChar_y >= floorPos_y
  ) {
    isPlummeting = true;
    gameChar_x = t_canyon.x_pos + t_canyon.width / 2; // positioning inside the canyon
  }
}

// ------------------
// Flagpole functions
// ------------------

function renderFlagpole() {
  push();
  strokeWeight(5);
  stroke(100);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 200);
  fill(255, 0, 255);
  noStroke();
  if (!flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 200, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }
  pop();
}

function checkFlagpole() {
  var d = abs(gameChar_x - flagpole.x_pos);
  if (d < 15) {
    flagpole.isReached = true;
  }
}

// ------------------
// Status and messages
// ------------------


function checkPlayerDie() {
  if (gameChar_y > 640 && lives > 0) {
    lives -= 1;
    if (lives === 0) {
      return;
    }
    startGame();
  }
}

function displayMessage(message) {
  push();
  fill(100, 100, 100, 170);
  rectMode(CENTER);
  stroke(100);
  strokeWeight(2);
  rect(width / 2, height / 3, 400, 250, 10);
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  textStyle(BOLD);
  text(message, width / 2, height / 3 - 30, 400, 250);
  textStyle(NORMAL);
  noStroke();
  textSize(22);
  text("Press space to continue ...", width / 2, height / 3 + 20, 400, 250);
  pop();
}

// END
