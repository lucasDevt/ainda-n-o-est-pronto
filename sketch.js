var PLAY = 1;
var END = 0;
var gameState = PLAY;

var nave, naveimg, nave_collided, checkpoint;
var fundo 
var ground
var obstaclesGroup, obstacle1
var score;
var gameOverImg,restartImg
var dieSound

function preload(){
  trex_running = loadAnimation("nave.gif");
  //nave_collided = loadAnimation("nave_collided.png");
  
  fundo = loadImage("fundo.png");
  
  
  
  obstacle1 = loadImage("meteoro.png");
  
  
  //restartImg = loadImage("restart.png")
  //gameOverImg = loadImage("gameOver.png")
  
  
  //dieSound = loadSound("die.mp3")
  //checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600,300);
  
  var message = "Esta é uma mensagem";
 console.log(message)
  

  ground=createSprite(200,180,800,20)
  ground.x=ground.width/2
  ground.velocityX=-1
  ground.addImage(fundo)
  ground.scale=1.4


  nave = createSprite(50,height-90,20,50);
  nave.scale = 0.3;
  
  //gameOver = createSprite(width/2,height/2);
  //gameOver.addImage(gameOverImg);
  
  //restart = createSprite(width/2,height/2+40);
  //restart.addImage(restartImg);
  
 
  //gameOver.scale = 0.5;
  //restart.scale = 0.5;
  
  
  
  //criar Grupos de Obstáculos e Nuvens
  obstaclesGroup = createGroup();
  

  
  //nave.setCollider("rectangle",0,0,trex.width,trex.height);
  //trex.debug = true
  
  score = 0;
  
}

function draw() {
  
  background(180);
  //exibir pontuação
  textSize(50)
  text("Pontuação: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){

    //gameOver.visible = false;
    //restart.visible = false;
    
    ground.velocityX=-2
    //pontuação
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       //checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //pular quando barra de espaço é pressionada
    if(keyDown("w")) {
        nave.velocityY = -3;
        //jumpSound.play();
        
    }
    
    
  
    
  
    //gerar obstáculos no chão
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(nave)){
        //trex.velocityY = -12;
        
       // gameState = END;
        //dieSound.play()
      
    }
  }
   else if (gameState === END) {
      //gameOver.visible = true;
      //restart.visible = true;
     
     //mudar a animação de trex
      nave.changeAnimation("collided", nave_collided);
    
     
     
      ground.velocityX = 0;
      nave.velocityY = 0
      
     
      //definir tempo de vida dos objetos do jogo para que eles nunca sejam destruídos
    obstaclesGroup.setLifetimeEach(-1);
    
     
     obstaclesGroup.setVelocityXEach(0);
      

     //if(mousePressedOver(restart)) {
      //reset();
   // }  
   }
  
 
  
  
  
  


  drawSprites();
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false
  restart.visible=false
  obstaclesGroup.destroyEach();
  nave.changeAnimation("running")
  score=0
  
}


function spawnObstacles(){
 if (frameCount % 20 === 0){
  var posy = Math.round(random(20,280));
   var obstacle = createSprite(600,posy,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //gerar obstáculos aleatórios
    var rand = Math.round(random(0,1));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      
      default: break;
    }
   
    //atribuir dimensão e tempo de vida ao obstáculo           
    obstacle.scale = 0.1;
    obstacle.rotation=180;
    obstacle.lifetime = 300;
   
   //acrescentar cada obstáculo ao grupo
    obstaclesGroup.add(obstacle);
 }
}

