//Creating sprite using sprite sheets for animation
const TILE_SIZE = 70;
const TOTAL_COLUMNS = 9;
const TOTAL_ROWS = 6;
const CANVAS_WIDTH = TILE_SIZE * TOTAL_COLUMNS;
const CANVAS_HEIGHT = TILE_SIZE * TOTAL_ROWS;
const rows = Array.from({length: TOTAL_ROWS});
rows.forEach((row, i) => {
  rows[i] = Array.from({ length: TOTAL_COLUMNS}, e => null);
})

const colliders = Array.from({length: TOTAL_ROWS});
colliders.forEach((row, i) => {
  colliders[i] = Array.from({ length: TOTAL_COLUMNS}, e => null);
})


let player_sprite_sheet;
let tile_sprite_sheet;
//we don't have to put this in a json file if we don't want to, we can do it like this
const player_frames = [
  {'name':'player_walk01', 'frame':{'x':0, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk02', 'frame':{'x':71, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk03', 'frame':{'x':142, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk04', 'frame':{'x':0, 'y': 95, 'width': 70, 'height': 94}},
  {'name':'player_walk05', 'frame':{'x':71, 'y': 95, 'width': 70, 'height': 94}},
  {'name':'player_walk06', 'frame':{'x':142, 'y': 95, 'width': 70, 'height': 94}},
  {'name':'player_walk07', 'frame':{'x':213, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk08', 'frame':{'x':284, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk09', 'frame':{'x':213, 'y': 95, 'width': 70, 'height': 94}},
  {'name':'player_walk10', 'frame':{'x':355, 'y': 0, 'width': 70, 'height': 94}},
  {'name':'player_walk11', 'frame':{'x':284, 'y': 95, 'width': 70, 'height': 94}}
];

let mouse_moved = false;
let touch_started = false;
let eventX;
let jumping = false;
let tile_sprites;
let snowImage;
let landscape;

function preload() {
  // Load the json for the tiles sprite sheet

  tiledata = loadJSON('tiles.json');
  tile_sprite_sheet = loadSpriteSheet('tiles_spritesheet.png', tiledata);
  // loadJSON('tiles.json', function(tile_frames) {
  //   // Load tiles sprite sheet from frames array once frames array is ready
    
  // });

   tile_sprites = loadImage('tiles_spritesheet.png');

  player_sprite_sheet = loadSpriteSheet('player_spritesheet.png', player_frames);

  player_walk = loadAnimation(player_sprite_sheet);

  // An animation with a single frame for standing
  player_stand = loadAnimation(new SpriteSheet('player_spritesheet.png',
    [{'name':'player_stand', 'frame':{'x':284, 'y': 95, 'width': 70, 'height': 94}}]));

  player_jump = loadAnimation('ghost_standing0001.png', 'ghost_standing0007.png');


}

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(0);


  landscape = new Group();
  // Create the Player sprite and add it's animations
  player_sprite = createSprite(140, 300, 40, 10);
  player_sprite.addAnimation('walk', player_walk);
  player_sprite.addAnimation('stand', player_stand);
  player_sprite.addAnimation('jump', player_jump);

  


  // Draw the ground tiles
  for (var x = 0; x < TOTAL_COLUMNS; x++) {
    // drawTile('snow.png', x, TOTAL_ROWS - 1);
    setCollider('snow.png', x, TOTAL_ROWS - 1)
    // rows[TOTAL_ROWS - 1][x] = 'snow.png';
  }

  // Draw the sign tiles
    //setCollider('signRight.png', 0, TOTAL_ROWS - 2);
    drawTile('signRight.png', 0, TOTAL_ROWS - 2);
  // rows[TOTAL_ROWS - 2][0] = 'signRight.png';
  //setCollider('signExit.png', 0,0);
  // drawTile('signExit.png', 0, 0);
  // rows[0][0] = 'signExit.png';
  


  //draw some more stuff
 // setCollider(dirtCliffLeftImage, 1, 1);
 // drawTile('dirtCliffLeft.png', 1, 1);
  // rows[1][1] = 'dirtCliffLeft.png';
  //setCollider(dirtCliffRightImage, 2, 2);
  //drawTile('dirtCliffRight.png', 2, 1);
  // rows[1][2] = 'dirtCliffRight.png';

  // drawTile('boxCoinAlt.png', 3, 1);
  // drawTile('boxCoinAlt.png', 4, 1);
  // rows[1][4] = 'boxCoinAlt.png';
  //setCollider(grassCliffLeftImage, 4, 3);
 // drawTile('grassCliffLeft.png', 4, 3);
  // rows[3][4] = 'grassCliffLeft.png';
  //setCollider(grassCliffRightImage, 5, 3);
  //drawTile('grassCliffRight.png', 5, 3);
  // rows[3][5] = 'grassCliffRight.png';

//   console.log(rows);
// console.log(landscape);
 

}

function draw() { 
  clear();
  background(0);

  drawLevel();
  drawSprites(landscape);
  touchScreen();
  gravity();
  movePlayer();
  player_sprite.collide(landscape);
  drawSprites();
  drawSprites(landscape);


}

function drawTile(tilename, gridX, gridY){
    tile_sprite_sheet.drawFrame(tilename, TILE_SIZE * gridX, TILE_SIZE * gridY);
  //  const thisAnimation = loadAnimation( new SpriteSheet('tile_spritesheet.png',
  //  [{'name': tilename}]));
    rows[gridY][gridX] = {tilename, gridX, gridY};
}

function setCollider(tilename, gridX, gridY){

  const image = getImage(tilename);

  const offset = TILE_SIZE/2;
  let newSnow = createSprite(TILE_SIZE * gridX + offset, TILE_SIZE * gridY + offset);
  newSnow.addImage(image); 
  // newSnow.setCollider('rectangle', TILE_SIZE * gridX, TILE_SIZE * gridY, TILE_SIZE, TILE_SIZE);
  landscape.add(newSnow);
  
}


function getImage(tilename){  
  const data = tiledata.images.filter(item => item.name === tilename);
  console.log(data);
  if(data != undefined && data.length > 0){
      const {x, y, width, height } = data[0].frame;
      snowImage = tile_sprites.get(x, y, width, height);
      return snowImage
  }
  

}



function drawLevel(){
  rows.forEach((row, j) => {
    row.forEach((item, i) => {
      if(item != null){
        drawTile(item, i, j);
      }
    })
  })

  // for(let i = 0; i < TOTAL_ROWS; i++){
  //   for(let j = 0; j < TOTAL_COLUMNS; j++){
  //     if(rows[i][j] != null){
  //       drawTile(rows[i][j], j, i);
  //     } 
  //   }
  // }

}

function movePlayer(){

    //if mouse is to the left
    if(eventX < player_sprite.position.x - 10) {
      if(!jumping){
        player_sprite.changeAnimation('walk');
      }
      
      // flip horizontally
      player_sprite.mirrorX(-1);
      // move left
      player_sprite.velocity.x = -2;
    }
    else if(eventX > player_sprite.position.x + 10) {
      if(!jumping){
      player_sprite.changeAnimation('walk');
      }
      // flip horizontally
      player_sprite.mirrorX(1);
      // move right
      player_sprite.velocity.x = 2;
    }
    else {
      if(!jumping){
      player_sprite.changeAnimation('stand');
      }
      //if close to the mouse, don't move
      player_sprite.velocity.x = 0;
    }
}


function mouseMoved() {
  mouse_moved = true;
}

function touchScreen(){
    // Mobile friendly controls

    if (isTouch()) {
      eventX = touchX;
    } else {
      eventX = mouseX;
    }
}

function touchStarted() {
  touch_started = true;
}



function isTouch() {
  return touch_started && !mouse_moved;
}


function jump(){
  jumping = true;
  player_sprite.velocity.y = -2;
  player_sprite.changeAnimation('jump');
  console.log('jumping');
  setTimeout(resetJump, 500);
}

function resetJump(){
  player_sprite.velocity.y = 0;
  jumping = false;
}

function keyPressed(){
  if (keyCode === 32){
   jump();
  }
}

function gravity(){
  if(!jumping){
    player_sprite.velocity.y = 1;
  }
  
}