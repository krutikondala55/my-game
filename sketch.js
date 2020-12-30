var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var girls,girl1,girl2,girl3,girl4;

var track, girl1img, girl2img, girl3img, girl4img;

function preload(){
  track = loadImage("images/track.jpg");
  girl1img = loadImage("images/girl1.png");
  girl2img = loadImage("images/girl2.png");
  girl3img = loadImage("images/girl3.png");
  girl4img = loadImage("images/girl4.png");
  ground = loadImage("images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}