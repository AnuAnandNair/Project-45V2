class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      runner = new Runner();
      var runnerCountRef = await database.ref('runnerCount').once("value");
      if(runnerCountRef.exists()){
        runnerCount = runnerCountRef.val();
        runner.getCount();
      }
      form = new Form()
      form.display();
    }
    runner1 = createSprite(100,200,50,50);      
    runner2 = createSprite(300,200,50,50);    
    runner3 = createSprite(500,200,50,50);    
    //runner4 = createSprite(700,200,50,50);      

    runners = [runner1, runner2, runner3 /*,runner4*/];    
  }

  play(){
    form.hide();
    
    Runner.getRunnerInfo();
    runner.getFinishedRunners();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));//for ground
            
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 230;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        runners[index-1].x = x;
        runners[index-1].y = y;
              
        if (index === runner.index){
          stroke(10);
          runners[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = runners[index-1].y;
        }
       
        textAlign(CENTER);//to display the name of players along with their cars, y should be down so y+75
        textSize(20);
        fill("red")
        text(allPlayers[plr].name, runners[index - 1].x, runners[index - 1].y + 75);
      }
    }

    if(keyIsDown(UP_ARROW) && runner.index !== null){//passedFinish===false if the user didnt finished playing   
      runner.distance +=10;//adjust speed of car 
      runner.update();
    }    
    
    if(runner.distance >  1500){  //player has reached destination
      gameState=2;
      Runner.updateFinishedRunners();///update the finished player number as one more player has finished playing
      runner.rank= finishedRunners;//current players rank is the number of finished players which is given by updateFinishedPlayers()
      runner.update();//updates player.rank in database //player.rank in program is already updated in the previous line
      console.log("Game Ended");
      console.log(runner.rank);
      alert("You reached destination!!!!! Congratulations. Rank is "+runner.rank);//window.alert("player Wins");
      fill("black");
      var rankdisp = createElement('h2');
      rankdisp.html("You have reached destination\n Your Rank is :"+ runner.rank);
      rankdisp.position(displayWidth/2 - 50, 20);     
    }   
    drawSprites();
  } 
}
