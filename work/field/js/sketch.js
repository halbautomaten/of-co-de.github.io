var canvas;
//GRID
var gridRatio = 11.2 / 15.5;
var gridScaleH = 100.0;
var gridScaleV = gridScaleH * gridRatio;
var borderHorizontal = 0.0;
var borderVertical = 0.0;
var mouseMode = false;
var mouseVector, mouseTrail;
var motionVector, moitionTrail, motionAngle;
var minMouseRadius = 90.0;
var mouseRadius = minMouseRadius;
var noiseRadius = 10000.0;
var radiusAnimation = {};
var diagonal;
var logo, start;
var logoLoaded = false;
var startLoaded = false;

//NOISE
var time = 0.0;
var speed = 0.009;
var noiseScale = 0.000001;

//compasses
var compasses = [];


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('container');
    // pixelDensity(1);
    gridSetup();
    frameRate(30);
    imageMode(CENTER);
    logo = loadImage("img/ed.png");
    start = loadImage("img/start.png");
    mouseVector = createVector(width / 2, height / 2);
    mouseTrail = [];
    motionVector = createVector();
    motionTrail = [];
}

function draw() {
    // text(width+" x "+height, 100,100);
    time += speed;
    background('#323287');
    var fade = mouseY / windowHeight;

    mouseVector = createVector(mouseX, mouseY);
    motionVector = createVector(mouseX - pmouseX, mouseY - pmouseY);
    // motionAngle = atan2(mouseY - pmouseY,mouseX - pmouseX);


    // if(motionVector.mag()>mouseRadius){
    //   mouseTrail.unshift(p5.Vector.lerp(mouseVector,createVector(pmouseX,pmouseY),0.5));
    //   motionTrail.unshift(motionVector);
    // }

    if (motionVector.mag() > 1) {
        mouseTrail.unshift(p5.Vector.lerp(mouseVector, createVector(pmouseX, pmouseY), 0.5));
        motionTrail.unshift(motionVector);
        mouseTrail.unshift(mouseVector);
        motionTrail.unshift(motionVector);
    }
    //  if (frameCount==0) {
    mouseTrail.pop();
    motionTrail.pop();
    //}


    fill(255);
    noStroke();

    for (var i = 0; i < compasses.length; i++) {
        var c = compasses[i];
        var noiseAngle = noise(c.position.x * noiseScale - time, c.position.y * noiseScale, 0) * TWO_PI*2;

        var logoDistance = c.position.mag();

        if (logoDistance < time * 2000.0) {
          var mouseDistance = p5.Vector.dist(c.position, mouseVector);
          if (mouseIsPressed && mouseDistance < mouseRadius) {
              var mouseAngle = atan2(c.position.y - mouseVector.y, c.position.x - mouseVector.x);
              c.updateAngle(mouseAngle);

          } else if (mouseVector.mag() < 200) {
                //ED LOGO HOVER
                var circleAngle = atan2(mouseVector.y - c.position.y, mouseVector.x - c.position.x);
                c.updateAngle(circleAngle + PI / 2);

            } else if (mouseVector.mag() > diagonal.mag() - 200) {
                //START BUTTON HOVER
                var circleAngle = atan2(mouseVector.y - c.position.y, mouseVector.x - c.position.x);
                c.updateAngle(circleAngle);
            } else {
                //IN TRAIL?
                var compassInTrail = false;

                for (var m = 0; m < mouseTrail.length; m++) {
                    var mouseDistance = p5.Vector.dist(c.position, mouseTrail[m]);
                    if (mouseDistance < mouseRadius * (mouseTrail.length - m) / mouseTrail.length) {
                         if (motionTrail[m].mag() > 2) {
                            var motionAngle = atan2(motionTrail[m].y, motionTrail[m].x);
                            c.updateAngle(motionAngle);
                        }
                        compassInTrail = true;
                        break;
                    }
                }
                if (!compassInTrail) {
                    var factor = Math.min((time * 2000.0 - logoDistance) / 500.0, 1.0);
                    c.updateAngle(noiseAngle * factor);
                }

            }
            c.draw(gridScaleH * 0.025);
        }
    }



    // console.log(canvas.drawingContext);
    push();
    translate(borderHorizontal, borderVertical);
    scale(gridScaleH * 0.025);
    image(logo, 0, 0, 70.1, 40.6);
    pop();

    push();
    translate(width - borderHorizontal, height - borderVertical);
    scale(gridScaleH * 0.025);
    image(start, 0, 0, 70.1, 40.6);
    pop();

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    gridSetup();
}

var mousePressed = growRadius;
var mouseReleased = shrinkRadius;

var touchStarted = growRadius;
var touchEnded = shrinkRadius;

function touchMoved(e) {
    e.preventDefault();
}


function growRadius() {
    if (radiusAnimation.cancel) radiusAnimation.cancel();
    radiusAnimation = new Animation(minMouseRadius, diagonal.mag(), 1200, function(val) {
        mouseRadius = val;
    });
}

function shrinkRadius() {
    if (radiusAnimation.cancel) radiusAnimation.cancel();
    radiusAnimation = new Animation(mouseRadius, minMouseRadius, 800, function(val) {
        mouseRadius = val;
    });
}

function gridSetup() {
    gridScaleH = Math.sqrt(width) * 1.6;
    gridScaleV = gridScaleH * gridRatio;

    var hor = (width % (gridScaleH)) / 2.0;
    var ver = (height % (gridScaleV)) / 2.0;

    borderHorizontal = Math.floor(hor + ((hor > gridScaleH * 0.5) ? gridScaleH : gridScaleH * 1.5));
    borderVertical = Math.floor(ver + ((ver > gridScaleV * 0.5) ? gridScaleV : gridScaleV * 1.5));


    compasses = [];
    for (var y = borderVertical; y <= height - borderVertical; y += gridScaleV) {
        for (var x = borderHorizontal; x <= width - borderHorizontal; x += gridScaleH) {
            compasses.push(new Compass(x, y));
        }
    }
    compasses.splice(compasses.length - 1, 1);
    compasses.splice(0, 1);
    time = 0;
    noiseScale = 0.04 / gridScaleH;
    diagonal = createVector(windowWidth, windowHeight);

}


function normalizeAngle(a) {
    while (a > PI) a -= TWO_PI;
    while (a < -PI) a += TWO_PI;
    return a;
}
