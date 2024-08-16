function generateClouds() {
  var generatedClouds = [];

  for (var i = 0; i < 14; i++) {
    var xPos = round(random(50, 4900));
    var yPos = round(random(70, 200));
    var size = Number(random(0.5, 1).toFixed(2));
    if (i % 2 === 0) {
      var speed = Number(random(0.1, 0.5).toFixed(2));
    } else {
      var speed = -Number(random(0.1, 0.5).toFixed(2));
    }

    var cloud = new Cloud(xPos, yPos, size, speed);

    generatedClouds.push(cloud);
  }
  
  clouds = [...generatedClouds];
}
