let handpose;
let detections = [];

let canvas;
let video;
let canvas2;

let pointX = 254;
let pointY = 35;
//let fontRegular;

let circleX = 100;
let circleY = 200;

//var circ;
var score = 0;

function setup(){
  canvas = createCanvas(800, 600, WEBGL);//3D mode!!!
  canvas.id("canvas");
  canvas2 = createGraphics(width, height);

  video = createCapture(VIDEO);
  video.id("video");
  video.size(width, height);
  video.hide();



  //fontRegular = loadFont('assets/inconsolata.otf');
//  textSize(10);
//  textFont(fontRegular);

  const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  }

  handpose = ml5.handpose(video, options, modelReady);
  colorMode(HSB);

//  circ = new drawCircle();
}

function modelReady() {
  console.log("Model ready!");
  handpose.on('predict', results => {
    detections = results;

    // console.log(detections);
  });
}


function draw(){
  //clear();
  //translate(width, 0);
  scale(-1, 1);
  background(0);
  //translate(width/2, height/2);
  //imageMode(CENTER);
  image(video, -width/2, height/4, width/4, height/4);
  //rect(0, 0, 10, 10);
  //image(canvas , 0, 0);



  if(detections.length > 0){
  //  drawLines([0, 5, 9, 13, 17, 0]);//palm
  //  drawLines([0, 1, 2, 3 ,4]);//thumb
      drawLines([5, 6, 7, 8]);//index finger
  //  drawLines([9, 10, 11, 12]);//middle finger
  //  drawLines([13, 14, 15, 16]);//ring finger
  //  drawLines([17, 18, 19, 20]);//pinky

      drawLandmarks([0, 1], 0);//palm base
      drawLandmarks([1, 5], 60);//thumb
      drawLandmarks([5, 9], 120);//index finger
      drawLandmarks([9, 13], 180);//middle finger
      drawLandmarks([13, 17], 240);//ring finger
      drawLandmarks([17, 21], 300);//pinky
  }

//  drawGrid();
  drawCircle();

//  circ.display();

  if(detections.length > 0)
    detectHit();

  countScore();
}

function drawLandmarks(indexArray, hue){
    noFill();
    strokeWeight(10);
    for(let i=0; i<detections.length; i++){
      for(let j=indexArray[0]; j<indexArray[1]; j++){
        let x = detections[i].landmarks[j][0];
        let y = detections[i].landmarks[j][1];
        let z = detections[i].landmarks[j][2];
        stroke(hue, 40, 255);
        point(x, y);
      }
    }
      let x = detections[0].landmarks[8][0];
      let y = detections[0].landmarks[8][1];
      let z = detections[0].landmarks[8][2];
      //print(x);
  }

function drawLines(index){
  stroke(0, 0, 255);
  strokeWeight(3);
  for(let i=0; i<detections.length; i++){
    for(let j=0; j<index.length-1; j++){
      let x = detections[i].landmarks[index[j]][0];
      let y = detections[i].landmarks[index[j]][1];
      let z = detections[i].landmarks[index[j]][2];

      let _x = detections[i].landmarks[index[j+1]][0];
      let _y = detections[i].landmarks[index[j+1]][1];
      let _z = detections[i].landmarks[index[j+1]][2];
      line(x, y, z, _x, _y, _z);
    }
  }
}

function drawCircle(){
  fill(255);
  stroke(0,0,255);
  strokeWeight(1);
  ellipse(circleX, circleY, 20, 20);
}

function detectHit(){

  let x = detections[0].landmarks[8][0];
  let y = detections[0].landmarks[8][1];

  var d = dist(x, y, circleX, circleY);

  if(d < 20){
    //background(0);
    circleX = random(0,300);
    circleY = random(0,300);
    score++;
  }
}

function countScore(){
  print("score: ", score);
}
