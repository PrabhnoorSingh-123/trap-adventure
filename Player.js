class Player{
 constructor(){
     this.body=createSprite(100,200,20,50)
     this.body.shapeColor="red"
 }

jump(){
this.body.velocityY=-10

}
display(){
  this.body.velocityY=this.body.velocityY+0.5
  //this.body.collide(ground.body)
}


}