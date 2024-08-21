function generateCanyons() {
  var generateCanyons = [];
  currentXPos = 700;

  while (currentXPos <= 4200){
    var dist = round(random(900, 1200 ));
    var canyonWidth = round(random(80, 100 ));
    var canyon = new Canyon(currentXPos, floorPos_y, canyonWidth, height);
    currentXPos += dist;
    generateCanyons.push(canyon);
  }
  
  canyons = [...generateCanyons];
}