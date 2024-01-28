function setup() {
  createCanvas(1584, 396);
  noLoop();  // Draw only once
}

function draw() {
  drawGradientSky();
  drawWaterfront();
  drawBuildings();
}

function drawGradientSky() {
  let topColor = color(25, 25, 112); // Dark Blue for Night Sky
  let bottomColor = color(0, 0, 0); // Black for Night Sky Bottom
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(bottomColor, topColor, inter);
    stroke(c);
    line(0, y, width, y);
  }
  drawStars();
}

function drawStars() {
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height - 50); // Avoid drawing stars on the waterfront
    let size = random(1, 3);
    fill(255);
    noStroke();
    ellipse(x, y, size, size);
  }
}

function drawWaterfront() {
  fill(30, 75, 90); // Darker Blue for Water at Night
  rect(0, height - 50, width, 50); // Simple Rectangle for Waterfront
}

function drawBuildings() {
  let minBuildingWidth = 40;
  let maxBuildingWidth = 120;
  let minBuildingHeight = 100;
  let maxBuildingHeight = 250;
  let waterTowerBuilding = floor(random(0, 5)); // One in five buildings has a water tower
  let buildingCounter = 0;

  for (let x = 0; x < width; x += random(minBuildingWidth, maxBuildingWidth)) {
    let buildingWidth = random(minBuildingWidth, maxBuildingWidth);
    let buildingHeight = random(minBuildingHeight, maxBuildingHeight);
    fill(random(50, 150), random(50, 150), random(50, 150)); // Darker Colors for Night
    rect(x, height - 50 - buildingHeight, buildingWidth, buildingHeight); // Draw Building
    addWindows(x, height - 50 - buildingHeight, buildingWidth, buildingHeight);

    // Add radio tower or water tower
    if (buildingCounter === waterTowerBuilding) {
      drawWaterTower(x, height - 50 - buildingHeight, buildingWidth);
    } else if (random() < 0.2) { // 20% chance to have a radio tower
      drawRadioTower(x, height - 50 - buildingHeight, buildingWidth);
    }

    buildingCounter++;
  }
}

function addWindows(x, y, buildingWidth, buildingHeight) {
  let windowWidth = 5;
  let windowHeight = 10;
  let windowColor = color(255, 255, 0); // Yellow for Windows
  for (let wx = x + 5; wx < x + buildingWidth - 5; wx += 15) {
    for (let wy = y + 5; wy < y + buildingHeight - 5; wy += 20) {
      fill(windowColor);
      rect(wx, wy, windowWidth, windowHeight);
    }
  }
}

function drawRadioTower(buildingX, buildingY, buildingWidth) {
  let towerHeight = 50;
  let towerWidth = 5;
  let towerX = buildingX + buildingWidth / 2;
  let towerY = buildingY - towerHeight;

  // Draw the tower
  fill(150);
  triangle(towerX, towerY, towerX - towerWidth, buildingY, towerX + towerWidth, buildingY);

  // Add red lights
  let lightSpacing = 10;
  let lightDiameter = 2;
  for (let y = towerY; y < buildingY; y += lightSpacing) {
    fill(255, 0, 0);
    ellipse(towerX, y, lightDiameter, lightDiameter);
  }
}

function drawWaterTower(buildingX, buildingY, buildingWidth) {
  let waterTowerWidth = 30;
  let waterTowerHeight = 15;
  let towerX = buildingX + buildingWidth / 2 - waterTowerWidth / 2;
  let towerY = buildingY - waterTowerHeight;

  // Draw the water tower
  fill(150);
  rect(towerX, towerY, waterTowerWidth, waterTowerHeight / 2);
  triangle(towerX, towerY, towerX + waterTowerWidth / 2, towerY - waterTowerHeight / 2, towerX + waterTowerWidth, towerY);

  // Draw the water drainage pipe
  let pipeWidth = 5;
  let pipeHeight = buildingY - height + 50;
  rect(towerX - pipeWidth / 2, buildingY, pipeWidth, -pipeHeight);
}
