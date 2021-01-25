var ground
var player,playerAnimation
var score = 0
var platForm
var lives = 3
var gamestate = "play"
var restart
function preload(){
playerAnimation = loadAnimation("frame0.png","frame_1.png","frame_2.png","frame_3.png")
//playerAnimation = loadAnimation("frame0.png")
backgroundImage = loadImage("background.png")

}


function setup() {
  createCanvas(1200,800);
  //createSprite(200,200,20,20)
player=new Player();
player.body.addAnimation("running",playerAnimation)
player.body.scale=0.2
player.body.debug = true
player.body.setCollider ("rectangle",0,0,50,300)
ground=new Ground();
 obstacleGroup = createGroup()
 trapGroup = createGroup()
 coinGroup = createGroup()
platForm = createSprite(100,500,200,20)
restart = createSprite(600,250,20,20)
restart.visible=false
}
function draw() {
 background(backgroundImage);
 textSize(25) 
 fill("white") 
 text("score"+score,100,100)
  text("lives :"+lives,100,130)
 if(gamestate==="play"){
  //score = World.frameCount
  spawnObstacles()
  spawnTraps()
  if(player.body.x>1200||player.body.x<0){
  player.body.x=100
  player.body.y=100
  }
  
  if(keyDown("UP_ARROW")&&player.body.y>200){
    player.jump()
    if(platForm){
      platForm.destroy()
    }
  }
  if(platForm){
    player.body.collide(platForm)
  }
  if(keyDown("LEFT_ARROW")){
    player.body.x=player.body.x-10
    if(platForm){
      platForm.destroy()
    }
  }
  if(keyDown("RIGHT_ARROW")){
    player.body.x=player.body.x+10
    if(platForm){
      platForm.destroy()
    }
  }
  if(lives===0){
    gamestate="end"
  }
  for (var i=0;i<trapGroup.length;i++){
    if (trapGroup.get(i).isTouching(player.body)){
      player.body.x=100
      player.body.y=100
       trapGroup.get(i).destroy()
       platForm = createSprite(100,500,200,20)
      lives=lives-1
    }
  }
  for (var i=0;i<coinGroup.length;i++){
    if (coinGroup.get(i).isTouching(player.body)){     
       coinGroup.get(i).destroy()
       score = score+100
    }
  }
  if(player.body.isTouching(ground.body)){
    player.body.x=100
    player.body.y=100
   // player.get(i).destroy()
    lives=lives-1
    platForm = createSprite(100,500,200,20)
  }
 }
 else if(gamestate==="end"){
 obstacleGroup.setVelocityYEach(0)
 trapGroup.setVelocityYEach(0)
 restart.visible=true
 if(mousePressedOver(restart)){
  reset()

 }
 }
  
  player.display()
  

player.body.collide(obstacleGroup)

  drawSprites();

}
function reset(){
gamestate ="play"
restart.visible=false
obstacleGroup.destroyEach()
trapGroup.destroyEach()
lives = 3
score = 0
platForm = createSprite(100,500,200,20)
player.body.y=100
}
function spawnObstacles() {
 
 if (frameCount%40===0){
  var rand = random(100,1200)
  var obstacle = createSprite (rand,800,80,10)
  obstacle.velocityY = -(5+score/100)
  obstacleGroup.add(obstacle)
  
   var coin = createSprite (rand-30,800-10,10,10)
   coin.velocityY = -(5+score/100)
   coin.shapeColor = "yellow"
   coinGroup.add(coin)
 }

}
function spawnTraps() {
 
  if (frameCount%100===0){
   var rand = random(100,1200)
   var trap = createSprite (rand,800,80,10)
   trap.velocityY = -(5+score/100)
   trap.shapeColor = "red"
   trapGroup.add(trap)
  }
 
 }

