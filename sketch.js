var backImage,backgr;
var monkey, monkey_running,monkey_collided;
var ground, ground_img;
var banana_img, obstaceImage;
var FoodGroup, ObstaclesGroup;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload()
{
  backImage = loadImage("jungle.jpg");

  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_collided = loadImage("Monkey_03.png");

  banana_img = loadImage("banana.png"); 
  obstaceImage = loadImage("stone.png");
}

function setup() 
{
  createCanvas(800,400);
  
  backgr = createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale= 1.5;
  backgr.x = backgr.width/5;
  backgr.velocityX = -5;
  
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("Running",monkey_running);
  monkey.addAnimation("Collided",monkey_collided);
  monkey.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible = false;

  FoodGroup = new Group ();
  ObstaclesGroup = new Group ();
}

function draw() 
{ 
  background(0);

  if(gameState===PLAY)
  {
  
  if(backgr.x < 100)
  {
    backgr.x = backgr.width/2;
  }
  
    if(keyDown("space")) 
    {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);
  } 
  
  if (gameState === PLAY) 
  { 
    if (ground.x < 0)
  {
      ground.x = ground.width/2;
  }
  
  if (keyDown("space")) 
    {
      monkey.velocityY = -12;
    }
  // gravity
  monkey.velocityY = monkey.velocityY + 0.8;
    
    if (FoodGroup.isTouching(monkey))
      {
        FoodGroup.destroyEach();
      }
  
    spawnFood();
    spawnRock();
    
    if (ObstaclesGroup.isTouching(monkey))
      {
        gameState = END;
      }
  }
    
    if (gameState === END)
      {
        ground.velocityX = 0;
        monkey.collide(ground);
        
        monkey.changeAnimation("Collided",monkey_collided);
        ObstaclesGroup.setLifetimeEach (-1);
        ObstaclesGroup.setVelocityXEach (0);
        FoodGroup.setLifetimeEach (-1);
        FoodGroup.destroyEach ();
        ObstaclesGroup.destroyEach ();
      }
  drawSprites();
}
 

  function spawnFood() 
{
  //write code here to spawn the clouds
  if (frameCount % 80 === 0) 
  {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(banana_img);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}
 
   function spawnRock() 
{
  //write code here to spawn the clouds
  if (frameCount % 100 === 0) 
  {
    var rock = createSprite(350,329,40,10);
    rock.addImage(obstaceImage);
    rock.scale = 0.2;
    rock.velocityX = -3;
    
    rock.lifetime = 200;
    ObstaclesGroup.add(rock);
  }
}