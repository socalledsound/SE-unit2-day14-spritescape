//Creating sprite using sprite sheets for animation
const TILE_SIZE = 70;
const CANVAS_WIDTH = TILE_SIZE * 9;
const CANVAS_HEIGHT = TILE_SIZE * 6;
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
  for (var x = 0; x < CANVAS_WIDTH; x += TILE_SIZE) {
    tile_sprite_sheet.drawFrame('snow.png', x, CANVAS_HEIGHT - TILE_SIZE);
  }

  // Draw the sign tiles
  tile_sprite_sheet.drawFrame('signExit.png', CANVAS_WIDTH - TILE_SIZE, CANVAS_HEIGHT - TILE_SIZE * 2);
  tile_sprite_sheet.drawFrame('signRight.png', 0, CANVAS_HEIGHT - TILE_SIZE * 2);


  //draw some more stuff
  tile_sprite_sheet.drawFrame('boxCoin.png', TILE_SIZE, TILE_SIZE);
  tile_sprite_sheet.drawFrame('boxCoinAlt.png', TILE_SIZE * 2, TILE_SIZE);
}