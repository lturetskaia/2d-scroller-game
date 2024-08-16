class Sky {
  constructor() {
    this.bgrColoursDay = {
      top_r: 52,
      top_g: 168,
      top_b: 235,
      bottom_r: 212,
      bottom_g: 232,
      bottom_b: 250,
    };
    this.bgrColoursNight = {
      top_r: 46,
      top_g: 3,
      top_b: 66,
      bottom_r: 247,
      bottom_g: 116,
      bottom_b: 79,
    };
    this.currentBgrColour = {
      top_r: 52,
      top_g: 168,
      top_b: 235,
      bottom_r: 212,
      bottom_g: 232,
      bottom_b: 250,
    };
  }

  updateSkyColour(gameCharPosX, scrollingSpace) {
    //iterate through bgrColoursDay, mapping from bgrColoursDay to bgrColoursNight
    //and updating currentBgrColour depending on the character's x position
    for (var [key, value] of Object.entries(this.bgrColoursDay)) {
      this.currentBgrColour[key] = map(
        gameCharPosX,
        width / 2,
        scrollingSpace - width / 2,
        value,
        this.bgrColoursNight[key]
      );
    }
  }

  drawSky(gameCharPosX,scrollingSpace) {
    this.updateSkyColour(gameCharPosX, scrollingSpace);

    // render the background color gradient
    for (var i = 0; i < height; i++) {
      var redValue = lerp(this.currentBgrColour.top_r, this.currentBgrColour.bottom_r, i / height);
      var greenValue = lerp(
        this.currentBgrColour.top_g,
        this.currentBgrColour.bottom_g,
        i / height
      );
      var blueValue = lerp(this.currentBgrColour.top_b, this.currentBgrColour.bottom_b, i / height);

      stroke(redValue, greenValue, blueValue);
      line(0, i, scrollingSpace, i);
    }
  }
}
