function Compass(x,y){
  this.angle = 0.0;
  this.position = createVector(x,y);
  this.target = createVector(x,y);

  var that = this;

  this.update = function(x,y){
    if(that.angle>PI) that.angle-=TWO_PI;
    if(that.angle<-PI) that.angle+=TWO_PI;

    if(x&&y) that.target = createVector(x,y);
    var targetAngle = atan2(that.position.y-that.target.y,that.position.x-that.target.x);
    that.angle += atan2(sin(targetAngle-that.angle), cos(targetAngle-that.angle))*0.1;
  }

  this.updateAngle = function(targetAngle){
    if(that.angle>PI) that.angle-=TWO_PI;
    if(that.angle<-PI) that.angle+=TWO_PI;
    var distanceA = atan2(sin(targetAngle-that.angle), cos(targetAngle-that.angle));
    var distanceB = atan2(sin(targetAngle-that.angle+PI), cos(targetAngle-that.angle+PI));
    var distance = (Math.abs(distanceA)<Math.abs(distanceB))?distanceA:distanceB;
    that.angle +=distance*0.15;
  }

  this.draw = function(s){
    push();
    // translate((x+0.5)*grid_scale, (y+0.5)*grid_scale*GRID_RATIO);
    translate(x, y);
    scale(s);
    rotate(that.angle);
    rect(-9.3,-1.2,18.6,2.4);
    pop();
  }
}
