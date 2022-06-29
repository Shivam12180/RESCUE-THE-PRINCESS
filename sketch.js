var bg,bgImg;
var king,kingImg;
var bomb,bombImg,bombGroup;
var fruit,fruitImg,fruitGroup;
var invisibleGround;
var score=0;
var life=3;
var gameover,gameoverImg;
var restart,restartImg;
var princess,princessImg;

function preload(){
  bgImg = loadImage("bg1.jpg");
  kingImg = loadAnimation("k1.png","k2.png","k3.png","k4.png","k5.png","k6.png");
  bombImg = loadImage("bomb.png");
  fruitImg = loadImage("fruit.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png"); 
  princessImg = loadImage("princess.png");
}

function setup(){
  createCanvas (windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,width+600,height);
  bg.addImage("bgImg",bgImg);
  bg.scale = 2.5;
  bg.velocityX = -2;


  invisibleGround = createSprite(600,670,1200,10);
  invisibleGround.shapeColor = "red";
  //invisibleGround.visible = false;

  king = createSprite(150,height-50,100,200);
  king.scale = 0.65;
  king.addAnimation("kingImg",kingImg);
  king.addAnimation("princess",princessImg);
  king.changeAnimation(kingImg);
  
  gameover = createSprite(width/2,height/2-100,100,100);
  gameover.addImage("gameoverImg",gameoverImg);
  gameover.scale = 0.75;
  gameover.visible = false;

  restart =createSprite(width/2,height/2+100,100,100);
  restart.addImage("restartImg",restartImg);
  restart.scale = 0.3;
  restart.visible = false;

  bombGroup = new Group();

  fruitGroup = new Group();
}

function draw(){
background (bgImg);

 if(bg.x <600){
   bg.x = bg.width/2+400;
 }


 bg.velocityX=-(6+3*score/100);

if (keyDown("space") && king.y>=430){
  king.velocityY = -10;
}

king.velocityY = king.velocityY + 0.8;


king.collide(invisibleGround);
spawnBomb();
spawnFruit();

if (bombGroup.isTouching(king)){
  for (var i = 0 ;i<bombGroup.length;i++){
    if (bombGroup[i].isTouching(king)){
      bombGroup[i].destroy();
      life--;
    }
  }
}

if (fruitGroup.isTouching(king)){
  for (var i = 0 ;i<fruitGroup.length;i++){
    if (fruitGroup[i].isTouching(king)){
      fruitGroup[i].destroy();
      score = score+5;
    }
  }
  
}

if (life<=0){
  bg.velocityX=0;
  bombGroup.setVelocityXEach(0);
  fruitGroup.setVelocityXEach(0);

 gameover.visible = true;
 restart.visible = true;

 fruitGroup.setLifetimeEach(-1);
 bombGroup.setLifetimeEach(-1);
 king.changeAnimation("princess",princessImg);
  
}

if (mousePressedOver(restart)){
  reset();
}

drawSprites();
textSize(20);
stroke("black");
fill("black");
text("score : "+score,1100,50);

text("life : "+life,1100,80);





}


function spawnBomb(){
  if (frameCount % 90===0){
    bomb = createSprite (1100,600,10,10);
    bomb.addImage(bombImg);
    bomb.scale = 0.05;
    bomb.velocityX = -4;
    bombGroup.add (bomb);
    bomb.lifetime = 300;
    bomb.depth = king.depth;


  }
}


function spawnFruit(){
  if (frameCount % 180===0){
    fruit = createSprite (1000,600,10,10);
    fruit.addImage(fruitImg);
    fruit.scale = 0.2;
    fruit.velocityX = -4;
    fruit.lifetime = 300;
    fruit.depth = king.depth;
    fruitGroup.add(fruit)
  }
}


function reset(){
  score = 0;
  life = 3;
  gameover.visible = false;
  restart.visible = false;
  fruitGroup.destroyEach();
  bombGroup.destroyEach();
  king.changeAnimation("kingImg",kingImg);
}

