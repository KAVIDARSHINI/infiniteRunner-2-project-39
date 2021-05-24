var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var jungle,jungleImage;
var monkey , monkey_running,monkey_stand;
var banana ,bananaImage, rock, rockImage;
var FoodGroup, obstacleGroup;
var score;
var way;
var score = 0;
var survivalTime = 0;
var gameover,gameoverImage;

function preload(){
  
    jungleImage = loadImage("jungle.jpg");
    
    monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");

    monkey_stand = loadAnimation("monkey.png");

    bananaImage = loadImage("banana-1.png");
    rockImage = loadImage("obstacle.png");
  
    gameoverImage = loadImage("gameOver.png");

}

function setup() {
      createCanvas(displayWidth,displayHeight);
   
        jungle = createSprite(0,200);
        jungle.addImage(jungleImage);
        jungle.scale = 3;
  
        monkey = createSprite(52,339,20,30);
        monkey.addAnimation("jumping",monkey_running);
        monkey.addAnimation("still",monkey_stand);
        monkey.scale = 0.2; 

        way = createSprite(300,700,599,70);
        

        foodGroup = new Group();
        obstacleGroup = createGroup();
  
        monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
        monkey.debug = false;  
      }
                                   
function draw() {

  camera.position.y = monkey.position.y;
      
      if(gameState === PLAY){

        jungle.velocityX = - 4;
       // jungle.x = jungle.width/2;

           if(jungle.x < 0){
              jungle.x = jungle.width/2;
              }

        if(keyDown("space") && monkey.y >= 333){
         monkey.velocityY = -20;
         }
      monkey.velocityY = monkey.velocityY + 0.8;

        if(monkey.isTouching(foodGroup)){
         foodGroup.destroyEach();
         score = score + 1;
         monkey.scale = 0.3; 
        }

        obstacles();
        food();

        survivalTime = Math.ceil(frameCount/frameRate());
        
        way.visible = false;
       
        if(monkey.isTouching(obstacleGroup) || score === 10){
           monkey.scale = 0.2;
           monkey.y = 700;
           gameState = END;
           }

         }else if(gameState === END){
           
           gameover = createSprite(displayWidth/2,displayHeight/2,30,40);
           gameover.addImage(gameoverImage);
           gameover.scale = 0.3;
           
           jungle.velocityX = 0;
           foodGroup.setVelocityXEach(0);
           obstacleGroup.setVelocityXEach(0);
           
           obstacleGroup.setLifetimeEach(-1);
           foodGroup.setLifetimeEach(-1);  
        
           monkey.changeAnimation("still",monkey_stand);
           console.log("you got 10 bananas or you hit the stone");
           }
  
            monkey.collide(way)

      drawSprites();
  fill("black");
  stroke("yellow");
  strokeWeight(2);
  textFont("algerian"); 
      textSize(20);
      text("Score :" + score,450,50);

        text("Survival Time :"+ survivalTime,100,50);

    }

function obstacles(){
  
    if(frameCount % 300 === 0){
      rock = createSprite(599,645,20,30);
      rock.addImage(rockImage);
      rock.scale = 0.1;
      rock.velocityX = -5;
      rock.lifetime = 125;
      obstacleGroup.add(rock);
      }
  }

function food(){
  
    if(frameCount % 80 === 0){
       banana = createSprite(599,200,20,25);
       banana.addImage(bananaImage);
       banana.scale = 0.1;
       banana.velocityX = -6;
       banana.y = Math.round(random(300,400));
       banana.lifetime = 100;
       foodGroup.add(banana); 
        }
  }