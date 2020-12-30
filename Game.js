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

  async start()
  {
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    girl1 = createSprite(100,200);
    girl1.addImage("girl1",girl1img);
    girl2 = createSprite(300,200);
    girl2.addImage("girl2",girl2img);
    girl3 = createSprite(500,200);
    girl3.addImage("girl3",girl3img);
    girl4 = createSprite(700,200);
    girl4.addImage("girl4",girl4img);
    girls = [girl1, girl2, girl3, girl4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getgameAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      var index = 0;

     
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
       
        index = index + 1 ;

       
        x = x + 200;
        
        y = displayHeight - allPlayers[plr].distance;
        girls[index-1].x = x;
        girls[index-1].y = y;
       
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          girls[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = girls[index-1].y;
        }
       
        
       
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updategameAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}