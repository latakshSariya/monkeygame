var monkey, monkey_running, monkeyGroup;
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground, sun, gameover, restart, sunImage, gameoverImage, restartImage;
var gamestate = "play";
var END;
var survivalTime = 0;
var bananaScore=0

function preload() {

 monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  restartImage = loadImage("restart.png")
  sunImage = loadImage("sun.png");
  cloudImage = loadImage("cloud.png");
  gameoverImage = loadImage("gameOver.png")
}

function setup() {
  createCanvas(400, 400);
  monkey = createSprite(20, 150, 10, 10);
  monkey.addAnimation("monkey", monkey_running)
  ground = createSprite(300, 350, 900, 10);
  ground.shapeColor = "black";
  sun = createSprite(380, 20);
  sun.addImage("sun", sunImage);
  sun.scale = 0.2
  gameover = createSprite(200, 200, 10, 10);
  gameover.addImage("gameover", gameoverImage);
  restart = createSprite(200, 250);
  restart.addImage("restart", restartImage);
  restart.scale = 0.09;
  FoodGroup = new Group();
  obstacleGroup = new Group();  
  monkeyGroup = new Group();
}


function draw() {
  background("skyblue");
  drawSprites();
  if (mousePressedOver(restart) && gamestate === "end") {
    reset();
  }
  fill("red")
  textSize(20)
  text("survival Time: " + survivalTime, 150, 50);
  text("Bananas Collected: " + bananaScore, 120, 90);
  monkey.collide(ground);
  monkey.scale = 0.1;
  if (gamestate === "play") {
    Banana();
    ground.velocityX = ground.velocityX - (survivalTime / 100) * 10;
    obstacleGroup.velocityX = obstacleGroup.velocityX - (survivalTime / 100) *10;
    FoodGroup.velocityX = FoodGroup.velocityX - (survivalTime / 100) * 10;
    
    FoodGroup.setLifetimeEach = 100;
    gameover.visible = false;
    restart.visible = false;
    Obstacle();
    obstacleGroup.setLifetimeEach = 100;
    ground.velocityX = -10;
    survivalTime = survivalTime + Math.round(frameRate() / 30);
    monkey.velocityY = monkey.velocityY + 0.8;
    if (ground.x < 0) {
      ground.x = ground.x / 2;
    }
    if (keyDown("Space") && monkey.y > 314) {
      monkey.velocityY = -15
    }
    if(monkey.isTouching(FoodGroup)){
      bananaScore=bananaScore+1;
      FoodGroup.destroyEach(); 
    }
    if (obstacleGroup.isTouching(monkey)) {
      gamestate = "end";
      END()
    }
  }

}

function Banana() {
  if (frameCount % 80 === 0) {
    var randomposition;
    randomposition = random(150, 200)
    banana = createSprite(500, randomposition, 10, 10);
    banana.addImage("image", bananaImage);
    banana.velocityX = -10
    banana.scale = 0.1;
    banana.velocityX = -10;
    FoodGroup.add(banana);
  }
}

function Obstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(500, 310, 10, 10);
    obstacle.addImage("obstacle", obstaceImage);
    obstacle.velocityX = -10
    obstacle.scale = 0.2;
    obstacleGroup.add(obstacle);
  }
}

function END() {
  ground.velocityX = 0;
  banana.velocityX = 0;
  monkey.velocityY=0;
  obstacle.velocityX = 0;
  gameover.visible = true;
  restart.visible = true;
}

function reset() {
  gamestate = "play";
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  survivalTime = 0


}