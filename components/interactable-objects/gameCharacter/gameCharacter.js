class GameCharacter {
  constructor(xPos, yPos) {
    this.lives = 3;
    this.xPos = xPos;
    this.yPos = yPos;
    this.isLeft = false;
    this.isRight = false;
    this.isFalling = false;
    this.isJumping = false;
    this.isPlummeting = false;
    this.isAlive = true;
    this.platformContact = {
      state: false,
      platform: null,
    };
    this.isEnemyContact = false;
  }

  renderPosFaceForward() {
    // character standing facing frontwards

    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos, this.yPos - 15, 40, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos, this.yPos - 15, 20, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos - 10, this.yPos - 1, 14, 14, 180, 0, CHORD); //left rear paw
    arc(this.xPos + 10, this.yPos - 1, 14, 14, 180, 0, CHORD); // right rear paw
    arc(this.xPos - 10, this.yPos - 24, 14, 10, 180, 150); //left front paw
    arc(this.xPos + 10, this.yPos - 24, 14, 10, 30, 360); // right front paw

    ellipse(this.xPos - 12, this.yPos - 64, 23, 25); //left ear
    ellipse(this.xPos + 12, this.yPos - 64, 23, 25); //right ear

    fill(238, 152, 101);
    ellipse(this.xPos - 12, this.yPos - 64, 13, 15); //left inner ear
    ellipse(this.xPos + 12, this.yPos - 64, 13, 15); //right inner ear

    fill(160, 176, 175);
    ellipse(this.xPos, this.yPos - 49, 30, 30); //head
    strokeWeight(4);
    point(this.xPos - 7, this.yPos - 51); //left eye
    point(this.xPos + 7, this.yPos - 51); //right eye

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos,
      this.yPos - 42,
      this.xPos - 3,
      this.yPos - 3 - 42,
      this.xPos + 3,
      this.yPos - 3 - 42
    );

    stroke(0);
    strokeWeight(0.5);
    line(this.xPos, this.yPos - 42, this.xPos - 3, this.yPos - 42 + 3); // muzzle
    line(this.xPos, this.yPos - 42, this.xPos + 3, this.yPos - 42 + 3); // muzzle
    line(this.xPos - 5, this.yPos - 42, this.xPos - 22, this.yPos - 44); // left whiskers
    line(this.xPos - 5, this.yPos - 42, this.xPos - 22, this.yPos - 40); // left whiskers
    line(this.xPos + 5, this.yPos - 42, this.xPos + 22, this.yPos - 44); // right whiskers
    line(this.xPos + 5, this.yPos - 42, this.xPos + 22, this.yPos - 40); // right whiskers
  }

  renderPosTurnRight() {
    // walking right
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos + 5, this.yPos - 12, 30, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos + 12, this.yPos - 17, 16, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos + 2, this.yPos, 20, 14, 180, 0, CHORD); //left rear paw
    arc(this.xPos, this.yPos - 23, 16, 10, 180, 150); //left front paw

    arc(this.xPos - 1, this.yPos - 60, 23, 25, 90, 360); //left ear
    ellipse(this.xPos + 5, this.yPos - 48, 30, 30); // head
    arc(this.xPos - 5, this.yPos - 58, 23, 25, 90, 360); //right ear
    fill(238, 152, 101);
    arc(this.xPos - 5, this.yPos - 58, 13, 15, 90, 360); //right inner ear
    stroke(0);
    strokeWeight(4);
    point(this.xPos + 5, this.yPos - 50); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(this.xPos - 9, this.yPos);
    curveVertex(this.xPos - 9, this.yPos);
    curveVertex(this.xPos - 20, this.yPos - 11);
    curveVertex(this.xPos - 16, this.yPos - 33);
    curveVertex(this.xPos - 24, this.yPos - 48);
    curveVertex(this.xPos - 24, this.yPos - 48);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(this.xPos + 14, this.yPos - 43, this.xPos - 5, this.yPos - 43); // right whiskers
    line(this.xPos + 14, this.yPos - 43, this.xPos - 5, this.yPos - 47); // right whiskers
    line(this.xPos + 14, this.yPos - 43, this.xPos - 5, this.yPos - 39); // right whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos + 16,
      this.yPos - 45,
      this.xPos + 20,
      this.yPos - 45,
      this.xPos + 18,
      this.yPos - 41
    );
  }

  renderPosTurnLeft() {
    // walking left
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos - 5, this.yPos - 12, 30, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos - 12, this.yPos - 17, 16, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos - 2, this.yPos, 20, 14, 180, 0, CHORD); //left rear paw
    arc(this.xPos, this.yPos - 23, 16, 10, 30, 0); //left front paw

    arc(this.xPos + 1, this.yPos - 60, 23, 25, 180, 90); //right ear
    ellipse(this.xPos - 5, this.yPos - 48, 30, 30); // head
    arc(this.xPos + 5, this.yPos - 58, 23, 25, 180, 90); //left ear
    fill(238, 152, 101);
    arc(this.xPos + 5, this.yPos - 58, 13, 15, 180, 90); //left inner ear
    stroke(0);
    strokeWeight(4);
    point(this.xPos - 5, this.yPos - 50); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(this.xPos + 9, this.yPos);
    curveVertex(this.xPos + 9, this.yPos);
    curveVertex(this.xPos + 20, this.yPos - 12);
    curveVertex(this.xPos + 16, this.yPos - 33);
    curveVertex(this.xPos + 24, this.yPos - 48);
    curveVertex(this.xPos + 24, this.yPos - 48);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(this.xPos - 14, this.yPos - 43, this.xPos + 5, this.yPos - 43); // left whiskers
    line(this.xPos - 14, this.yPos - 43, this.xPos + 5, this.yPos - 47); // left whiskers
    line(this.xPos - 14, this.yPos - 43, this.xPos + 5, this.yPos - 39); // left whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos - 16,
      this.yPos - 45,
      this.xPos - 20,
      this.yPos - 45,
      this.xPos - 18,
      this.yPos - 41
    );
  }

  renderPosJumpForward() {
    // jumping facing forwards

    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos, this.yPos - 21, 40, 60, 140, 40, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos, this.yPos - 25, 20, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos - 10, this.yPos - 5, 14, 14, 120, 60, CHORD); //left rear paw
    arc(this.xPos + 10, this.yPos - 5, 14, 14, 120, 60, CHORD); // right rear paw
    arc(this.xPos - 14, this.yPos - 25, 10, 14, 300, 250); //left front paw
    arc(this.xPos + 14, this.yPos - 25, 10, 14, 300, 250); // right front paw

    ellipse(this.xPos - 12, this.yPos - 64, 23, 25); //left ear
    ellipse(this.xPos + 12, this.yPos - 64, 23, 25); //right ear

    fill(238, 152, 101);
    ellipse(this.xPos - 12, this.yPos - 64, 13, 15); //left inner ear
    ellipse(this.xPos + 12, this.yPos - 64, 13, 15); //right inner ear

    fill(160, 176, 175);
    ellipse(this.xPos, this.yPos - 55, 30, 30); //head
    strokeWeight(4);
    point(this.xPos - 7, this.yPos - 57); //left eye
    point(this.xPos + 7, this.yPos - 57); //right eye

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos,
      this.yPos - 48,
      this.xPos - 3,
      this.yPos - 3 - 48,
      this.xPos + 3,
      this.yPos - 3 - 48
    );

    stroke(0);
    strokeWeight(0.5);
    line(this.xPos, this.yPos - 48, this.xPos - 3, this.yPos - 48 + 3); // muzzle
    line(this.xPos, this.yPos - 48, this.xPos + 3, this.yPos - 48 + 3); // muzzle
    line(this.xPos - 5, this.yPos - 48, this.xPos - 22, this.yPos - 40); // left whiskers
    line(this.xPos - 5, this.yPos - 48, this.xPos - 22, this.yPos - 46); // left whiskers
    line(this.xPos + 5, this.yPos - 48, this.xPos + 22, this.yPos - 40); // right whiskers
    line(this.xPos + 5, this.yPos - 48, this.xPos + 22, this.yPos - 46); // right whiskers
  }

  renderPosJumpRight() {
    // jumping-right
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos + 5, this.yPos - 24, 30, 60, 120, 60, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos + 12, this.yPos - 29, 16, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos + 5, this.yPos - 3, 24, 14, 140, 40, CHORD); //left rear paw
    arc(this.xPos, this.yPos - 25, 12, 16, 300, 250); //left front paw

    arc(this.xPos - 6, this.yPos - 62, 23, 25, 40, 330); //left ear
    ellipse(this.xPos + 5, this.yPos - 60, 30, 30); // head
    arc(this.xPos - 10, this.yPos - 60, 23, 25, 40, 330); //right ear
    fill(238, 152, 101);
    arc(this.xPos - 10, this.yPos - 60, 13, 15, 40, 330); //right inner ear
    stroke(0);
    strokeWeight(4);
    point(this.xPos + 5, this.yPos - 62); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(this.xPos - 6, this.yPos);
    curveVertex(this.xPos - 6, this.yPos);
    curveVertex(this.xPos - 18, this.yPos - 3);
    curveVertex(this.xPos - 23, this.yPos - 15);
    curveVertex(this.xPos - 18, this.yPos - 34);
    curveVertex(this.xPos - 24, this.yPos - 45);
    curveVertex(this.xPos - 24, this.yPos - 45);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(this.xPos + 14, this.yPos - 55, this.xPos - 5, this.yPos - 50); // right whiskers
    line(this.xPos + 14, this.yPos - 55, this.xPos - 5, this.yPos - 54); // right whiskers
    line(this.xPos + 14, this.yPos - 55, this.xPos - 5, this.yPos - 45); // right whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos + 16,
      this.yPos - 57,
      this.xPos + 20,
      this.yPos - 57,
      this.xPos + 18,
      this.yPos - 53
    );
  }

  renderPosJumpLeft() {
    // jumping-left
    stroke(0);
    strokeWeight(0.5);
    fill(160, 176, 175);
    arc(this.xPos - 5, this.yPos - 24, 30, 60, 120, 60, CHORD); //body
    fill(253, 201, 143);
    ellipse(this.xPos - 12, this.yPos - 29, 16, 28); //belly

    fill(160, 176, 175);
    arc(this.xPos - 5, this.yPos - 3, 24, 14, 140, 40, CHORD); //left rear paw
    arc(this.xPos, this.yPos - 25, 12, 16, 300, 250); //left front paw

    arc(this.xPos + 6, this.yPos - 62, 23, 25, 210, 130); //right ear
    ellipse(this.xPos - 5, this.yPos - 60, 30, 30); // head
    arc(this.xPos + 10, this.yPos - 60, 23, 25, 210, 130); //left ear
    fill(238, 152, 101);
    arc(this.xPos + 10, this.yPos - 60, 13, 15, 210, 130); //left inner ear
    stroke(0);
    strokeWeight(4);
    point(this.xPos - 5, this.yPos - 62); // left eye

    strokeWeight(1.5);
    noFill();
    beginShape(); //tail start
    curveVertex(this.xPos + 6, this.yPos);
    curveVertex(this.xPos + 6, this.yPos);
    curveVertex(this.xPos + 18, this.yPos - 3);
    curveVertex(this.xPos + 23, this.yPos - 15);
    curveVertex(this.xPos + 18, this.yPos - 34);
    curveVertex(this.xPos + 24, this.yPos - 45);
    curveVertex(this.xPos + 24, this.yPos - 45);
    curveVertex();
    endShape(); //tail end

    strokeWeight(0.5);
    line(this.xPos - 14, this.yPos - 55, this.xPos + 5, this.yPos - 50); // left whiskers
    line(this.xPos - 14, this.yPos - 55, this.xPos + 5, this.yPos - 54); // left whiskers
    line(this.xPos - 14, this.yPos - 55, this.xPos + 5, this.yPos - 45); // left whiskers

    //nose
    fill(173, 41, 68);
    strokeWeight(0);
    triangle(
      this.xPos - 16,
      this.yPos - 57,
      this.xPos - 20,
      this.yPos - 57,
      this.xPos - 18,
      this.yPos - 53
    );
  }

  drawGameChar() {
    if (this.isLeft && (this.isFalling || this.isJumping)) {
      this.renderPosJumpLeft();
    } else if (this.isRight && (this.isFalling || this.isJumping)) {
      this.renderPosJumpRight();
    } else if (this.isLeft) {
      this.renderPosTurnLeft();
    } else if (this.isRight) {
      this.renderPosTurnRight();
    } else if (this.isFalling || this.isPlummeting || this.isJumping) {
      this.renderPosJumpForward();
    } else {
      this.renderPosFaceForward();
    }
  }

  move(scrollingSpace) {
    if (this.isLeft) {
      this.xPos = max(this.xPos - 7, 30);
    } else if (this.isRight) {
      this.xPos = min(this.xPos + 7, scrollingSpace);
    }
  }

  fall(floorPosY) {
    this.yPos = min(this.yPos + 4, floorPosY);
    if (this.yPos === floorPosY) {
      this.isJumping = false;
      this.isFalling = false;
    }
  }

  jump(floorPosY) {
    this.yPos = max(this.yPos - 14, floorPosY - 120);
    if (this.yPos === floorPosY - 120) {
      this.isJumping = false;
      this.isFalling = true;
    }
  }

  checkIsPlummeting() {
    if (this.isPlummeting) {
      this.yPos += 20;
    }
  }

  looseLife() {
    if ((this.yPos > 640 && this.lives > 0) || (this.isEnemyContact && this.lives > 0)) {
      this.lives -= 1;
      this.isAlive = false;
      if (this.lives === 0) {
        this.isAlive = false;
      }
      return true;
    }
    return false;
  }

  checkLeftPlatform(platforms) {
    var platformStart = platforms[this.platformContact.platform].xPos;
    var platformEnd =
      platforms[this.platformContact.platform].xPos +
      platforms[this.platformContact.platform].width;

    var charLeftPlatform = this.xPos < platformStart || this.xPos > platformEnd;
    if (charLeftPlatform) {
      this.platformContact.state = false;
      this.platformContact.platform = null;
      this.isFalling = true;
    }
  }

  checkEnemyCollision(enemy) {
    var distance = dist(this.xPos, this.yPos, enemy.xPos, enemy.yPos);
    var collisionWithEnemy = distance < 60;

    if (collisionWithEnemy) {
      this.isEnemyContact = true;
      return true;
    }
    return false;
  }

  reset(width, floorPosY) {
    this.isAlive = true;
    this.isPlummeting = false;
    this.isEnemyContact = false;
    this.xPos = width / 2;
    this.yPos = floorPosY;
  }
}
