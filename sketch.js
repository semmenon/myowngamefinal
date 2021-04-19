var PLAY = 1;
var END = 0;
var gameState = PLAY
var score = 1
var gameOver

function preload(){
backgroundImage = loadImage("images/background.png")
astronautImage = loadImage("images/astronaut.png")
asteroidsImage = loadImage("images/asteroids.png")
paddleImage = loadImage("images/paddle.png")
starsImage = loadAnimation("images/stars-0.png","images/stars-1.png","images/star-2.png","images/star-3.png","images/stars-4.png")
restartImage = loadImage("images/reset.png")
gameoverImage = loadImage ("images/gameover.png");
}

function setup(){
    createCanvas(2000,1100)
    astronaut = createSprite(1000,950,100,100)
    astronaut.addImage("astronaut",astronautImage)
    astronaut.scale = 0.25
    paddle = createSprite(1000,700, 100, 100)
    paddle.addImage("paddle",paddleImage)
    paddle.scale = 0.4
    restart = createSprite(1000,550)
    restart.addImage("restart",restartImage);
    paddle.addImage("paddle",paddleImage)
    starsGroup = createGroup();
    asteroidsGroup = createGroup();
    gameover = createSprite (1000,370)
    gameover.addImage("gameover",gameoverImage)
    gameover.scale = 0.5
    astronaut.setCollider("rectangle",0,0,900,900);
    paddle.debug = true

}

function draw(){
background(backgroundImage);
fill ("white")
textSize(25)
text("Score: "+ score, 100,100);
if (gameState === PLAY){
  restart.visible = false;
  gameover.visible = false;
  spawnStars()
  spawnAsteroids()
  if(keyDown("left")) {
    astronaut.x = astronaut.x-12;
  }
  if(keyDown("right")) {
    astronaut.x = astronaut.x+12;
  }

  if(keyDown("up")) {
    astronaut.y = astronaut.y-12;
  }
  if(keyDown("down")) {
    astronaut.y = astronaut.y+12;
  }
  
  if(keyDown("q")) {
    paddle.x = paddle.x-12;
  }
  if(keyDown("w")) {
    paddle.x = paddle.x+12;
  }

  if(asteroidsGroup.isTouching(astronaut)){
    score = score-1
    asteroidsGroup[0].destroy()
  }

  if(astronaut.isTouching(starsGroup)){
    score = score+1
    starsGroup[0].destroy()
  }

  if(asteroidsGroup.isTouching(paddle)){
    //asteroidsGroup[0].destroy()
    asteroidsGroup[0].bounceOff(paddle)
  }

  if(astronaut.isTouching(paddle)){
    astronaut.bounceOff(paddle)
  }

  if (score == 0){
    gameState = END
  }
}

if (gameState == END) {
restart.visible = true;
gameover.visible = true;

starsGroup.setLifetimeEach(-1);
asteroidsGroup.setLifetimeEach(-1);
starsGroup.setVelocityXEach(0);
asteroidsGroup.setVelocityXEach(0);

asteroidsGroup.destroyEach();
starsGroup.destroyEach();

if(mousePressedOver(restart)) {
  reset();
}
 
}


drawSprites()

}

function spawnStars() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
      var stars = createSprite(1000,900,40,10);
      stars.y = Math.round(random(80,1100));
      stars.x = Math.round(random(80,2000));
      stars.addAnimation("stars",starsImage);
      stars.scale = 0.4
      stars.velocityX = -3;
      
       //assign lifetime to the variable
      stars.lifetime = 200;
      
      //adjust the depth
      stars.depth = astronaut.depth;
      stars.depth = astronaut.depth + 1;
      
      //add each cloud to the group
      starsGroup.add(stars);
    }
  }

  function spawnAsteroids() {
    //write code here to spawn the clouds
    if (frameCount % 80 === 0) {
      var asteroids = createSprite(1000,900,40,10);
      asteroids.y = Math.round(random(0,1100));
      asteroids.x = Math.round(random(0,2000));
      asteroids.addImage("asteroids",asteroidsImage)
      asteroids.scale = 0.2
      asteroids.velocityY = 3;
      
       //assign lifetime to the variable
       asteroids.lifetime = 200;
      
      //adjust the depth
      asteroids.depth = astronaut.depth;
      asteroids.depth = astronaut.depth + 1;
      
      //add each cloud to the group
      asteroidsGroup.add(asteroids);
    }
  }

  function reset(){
    gameState = PLAY
    restart.visible = false;
    asteroidsGroup.destroyEach ()
    starsGroup.destroyEach()
    score = 1;
  
  }
  
  