function generateCanyons() {
  var generateCanyons = [];
  currentXPos = 700;
  var colour;
  if (game.level % 2 == 1) {
    colour = color(77, 232, 227);
  } else {
    colour =  color(69, 52, 18);
  }

  while (currentXPos <= 4200){
    var dist = round(random(900, 1200 ));
    var canyonWidth = round(random(80, 100 ));
    var canyon = new Canyon(currentXPos, floorPosY, canyonWidth, height, colour);
    currentXPos += dist;
    generateCanyons.push(canyon);
  }
  
  canyons = [...generateCanyons];
}