var warrior,corona;
var obsacle1;
var invisibleground, coronagroup;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var score = 0;

function preload()
{
backgroundimg = loadImage("background.png");
warrior1img = loadAnimation("warrior1.png","warrior2.png","warrior3.png","warrior4.png","warrior5.png")	;
coronaimg = loadAnimation("corona1.png","corona2.png","corona3.png","corona4.png","corona5.png");
warriorstop = loadAnimation("warrior5.png");
coronastop = loadAnimation("corona5.png");
gameoverimg  = loadImage("gameover.jpg");
retryimg  = loadImage ("retry.png");
}

function setup()
 {
	createCanvas(windowWidth,windowHeight);


  bg = createSprite(500,280,1000,450);
  bg.addImage(backgroundimg)
  bg.scale = 0.8;  

  warrior = createSprite(100,450,30,40);
  warrior.addAnimation("runwarrior",warrior1img);
  warrior.addAnimation("stopwarrior",warriorstop);
  warrior .scale = 0.4;

  invisibleground = createSprite(100,520,500,20);
  invisibleground .visible= false	;
  
  gameover = createSprite(width/2,220,50,50);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.2;
  gameover.visible  =false;
  
  retry = createSprite(width/2, 350,50,50);
  retry.addImage(retryimg);
  retry.scale = 0.4;
  retry.visible = false;
  
  coronagroup = new Group();
 // warrior.debug  =true
  warrior.setCollider("circle",0,100,130);

}
function draw() {
  background(0);

  warrior.collide(invisibleground);

if (gamestate === PLAY)
  {
      bg.velocityX = -3;
    
    if (bg.x<420)
    {
      bg.x= 700;
    }
    if(keyDown("space")&& warrior.y>410)
    {
      warrior.velocityY = -20;
    }
    score = score + Math.round(getFrameRate()/60)
    
    warrior.velocityY = warrior.velocityY + 0.8;
    
    spawncorona();
    
    if(warrior.isTouching(coronagroup))
    {
      corona.changeAnimation("coronastop",coronastop)
      gamestate = END;

    }
}

  else if(gamestate === END) 
  {
    bg.velocityX = 0;
    coronagroup.setVelocityXEach(0)
    warrior.changeAnimation("stopwarrior",warriorstop);
    corona.changeAnimation("coronastop",coronastop)
    gameover.visible = true;
    warrior.velocityY = 0
    retry.visible = true;
    if(mousePressedOver(retry)) {
      restart();
    }
  
  }

  drawSprites();
  textSize(20)
 text("Score "+score,width-150,60)

}
function restart()
{
  gamestate = PLAY;
  coronagroup.destroyEach()
  gameover.visible = false
  retry.visible = false
  warrior.changeAnimation("runwarrior",warrior1img);
score  = 0
}
function spawncorona()
{
  if(frameCount % 150 === 0)
  {
    corona = createSprite (1020,450);
    corona.velocityX = -(5+3*score/500);
    corona.addAnimation("corona",coronaimg);
    corona.addAnimation("coronastop",coronastop)
//corona.debug = true
    corona.scale = 0.5;
    corona.lifeTime = 300;
    coronagroup.add(corona);

  }
}




