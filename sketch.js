var canvas;

var gameState = 0;
var runnerCount;
var allPlayers;
var distance = 0;
var database;
var finishedRunners =0;
var form, runner, game;
var runners, runner1, runner2, runner3;

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();//get gameState 
  game.start();//if gameState is 0, then game starts in function start 
}

function draw(){
  background("pink");

  if(runnerCount === 3 && finishedRunners === 0){
    game.update(1);
  }
  
  if(gameState === 1){
    clear();
    game.play();
  }
  
}

function keyPressed() {
  if (keyCode === 13 && gameState !== 1) {
    form.enter();    
  }
}
