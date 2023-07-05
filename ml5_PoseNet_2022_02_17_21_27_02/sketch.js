// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
let xcircle = random(width);
let ycircle = random(height);

let handpose;
let detections = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  //video.hide();

  const options = {
    flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
    maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
    detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
    scoreThreshold: 0.75, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
    iouThreshold: 0.3, // A float representing the threshold for deciding whether boxes overlap too much in non-maximum suppression. Must be between [0, 1]. Defaults to 0.3.
  }

  handpose = ml5.handpose(video, options, modelReady2);

}

function modelReady() {
  select('#status').html('Model Loaded');
}

function modelReady2() {
  console.log("Model ready!");
  handpose.on('predict', results => {
    detections = results;

    // console.log(detections);
  });
}

function draw() {
  background(255);
  image(video, 0, 0, width, height);

  //ellipse(width/2, height/2, 30, 30);
  //ellipse(xcircle, ycircle, 50, 50);

  if(detections.length > 0){
    drawLines([0, 5, 9, 13, 17, 0]);
    drawLines([0, 1, 2, 3, 4]);
    drawLines([5, 6, 7, 8]);
    drawLines([9, 10, 11, 12]);
    drawLines([13, 14, 15, 16]);
    drawLines([17, 18, 19, 20]);

    drawLandmarks([0, 1], 0);
    drawLandmarks([1, 5], 60);
    drawLandmarks([5, 9], 120);
    drawLandmarks([9, 13], 180);
    drawLandmarks([13, 17], 240);
    drawLandmarks([17, 21], 300);
  }

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
  drawGrid();
  //drawHands();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}


function drawGrid(){
  //noStroke();
  for (var x = 0; x < width; x += width / 10) {
		for (var y = 0; y < height; y += height / 10) {
			stroke(0);
			strokeWeight(1);
			line(x, 0, x, height);
			line(0, y, width, y);
      //ellipse(xcircle, ycircle, 20, 20);
		}
	}
  //ellipse(random(k()), random(k*height), 50, 50);
}

function drawLandmarks(indexArray, hue){
  noFill();
  strokeWeight(10);
  for(let i = 0; i < detections.length; i++){
    for(let j = indexArray[0]; j < indexArray[1]; j++){
      let x = detections[i].landmarks[j][0];
      let y = detections[i].landmarks[j][1];
      //let z = detections[i].landmarks[j][2];
      stroke(hue, 40, 255);
      point(x, y);
    }
  }
}

function drawLines(index){
  stroke(0, 0, 255);
  strokeWeight(3);
  for(let i = 0; i < detections.length; i++){
    for(let j = 0; j < index.length - 1; j++){
      let x = detections[i].landmarks[j][0];
      let y = detections[i].landmarks[j][1];
    //  let z = detections[i].landmarks[j][2];

      let x1 = detections[i].landmarks[j+1][0];
      let y1 = detections[i].landmarks[j+1][1];
    //  let z1 = detections[i].landmarks[j+1][2];

      line(x, y, x1, y1);
    }
  }
}
