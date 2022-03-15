var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop()
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()


  ghost= createSprite(130,150)
  ghost.addImage("ghost", ghostImg)
  ghost.scale = 0.3
}

function draw() {
  background(200);
  
  if(gameState === "play"){

    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 2
    
    }

    if(keyDown("right_arrow")){
      ghost.x = ghost.x +2
    
    }

    if(keyDown("space")){
      ghost.velocityY = -5
    
    }

    ghost.velocityY= ghost.velocityY+ 0.8

    drawSprites()

  if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors()

   
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0
    }

    if(ghost.isTouching(invisibleBlockGroup)|| ghost.y>600){
      ghost.destroy()
      gameState = "end"
    }



  }

  if(gameState ==="end" ){
    fill("yellow")
    textSize(30)
    text("gameOver", 230,250)
    spookySound.stop()
  }

  

}

function spawnDoors(){
  if(frameCount % 240 ===0){
    var door =  createSprite(250,-50)
    door.addImage("door", doorImg)

    var climber =  createSprite(250,100)
    climber.addImage("climber", climberImg)

    var invisibleBlock = createSprite(250,100)
    invisibleBlock.width=climber.width
    invisibleBlock.height=2
   


    door.x= Math.round(random(100,500))
    climber.x = door.x
    climber.y= door.y+50

    invisibleBlock.x = door.x
    invisibleBlock.y = door.y+50

    door.velocityY= 1
    climber.velocityY= 1
    invisibleBlock.velocityY= 1



    door.depth=ghost.depth
    ghost.depth= ghost.depth+1


    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.debug=true
  }
}
