//Creating sprite using sprite sheets for animation
const TILE_SIZE = 70;
const TOTAL_COLUMNS = 9;
const TOTAL_ROWS = 6;
const CANVAS_WIDTH = TILE_SIZE * TOTAL_COLUMNS;
const CANVAS_HEIGHT = TILE_SIZE * TOTAL_ROWS;

let tile_sprite_sheet;


function preload() {
  // Load the json for the tiles sprite sheet
  loadJSON('tiles.json', function(tile_frames) {
    // Load tiles sprite sheet from frames array once frames array is ready
    tile_sprite_sheet = loadSpriteSheet('tiles_spritesheet.png', tile_frames);
  });
}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  clear();
  background(0);

  // Draw the ground tiles
  for (var x = 0; x < TOTAL_COLUMNS; x++) {
    drawTile('snow.png', x, TOTAL_ROWS - 1)
  }

  // Draw the sign tiles
  drawTile('signRight.png', 0, TOTAL_ROWS - 2);
  drawTile('signExit.png', 0, 0);
  
  //draw some more stuff
  drawTile('dirtCliffLeft.png', 1, 1);
  drawTile('dirtCliffRight.png', 2, 1);
  // drawTile('boxCoinAlt.png', 3, 1);
  drawTile('boxCoinAlt.png', 4, 1);

  drawTile('grassCliffLeft.png', 4, 3);
  drawTile('grassCliffRight.png', 5, 3);
}

function drawTile(tilename, gridX, gridY){
    tile_sprite_sheet.drawFrame(tilename, TILE_SIZE * gridX, TILE_SIZE * gridY);
}