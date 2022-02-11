var capture;
var tracker
var w = 640,
	h = 480;
let img;
let isImgLoaded = false;

let snapButton;
let saveButton;
let mode = 0;
let takeSnap = false;
let discoButton;

function setup() {
    frameRate(12);
    //frameRate(window.delayInterval); 

    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, 
    
    function() {
        console.log('capture ready.')
    });

	capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide(w,h);

    colorMode(HSB);

    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);
    
    // snapButton = createButton('Snap');
    // saveButton = createButton('Save');

    // saveButton.position(650,700);
    // snapButton.position(850,700);

}

function draw() {

    //console.log("p5.js: " + window.songText);

	if (isImgLoaded === false && window.albumCoverURL !== undefined) {
        img = createImg(window.albumCoverURL);
        img.crossOrigin = 'anonymous';
		isImgLoaded = true
    }

    image(capture, 0, 0, w, h);
    var positions = tracker.getCurrentPosition();
    if (positions.length > 0) {
        noStroke();
        fill(0, 255, 255);
        image(img,((positions[62][0])-80), ((positions[62][1])-300), 175, 175);
    }
    
    if (mode ==0){
        image(capture, 0, 0, w, h);
        var positions = tracker.getCurrentPosition();
        if (positions.length > 0) {
            noStroke();
            fill(0, 255, 255);
            image(img,((positions[62][0])-80), ((positions[62][1])-300), 175, 175);
            
        }
    } else if (mode == 1){
        image(capture, 0, 0, w, h);
        saveCanvas("'" + window.month + window.year + "'", "jpg");
        modo = 0;

        var positions = tracker.getCurrentPosition();
        if (positions.length > 0) {
            noStroke();
            fill(0, 255, 255);
            image(img,((positions[62][0])-80), ((positions[62][1])-300), 175, 175);

        }
    }

    // saveButton.mousePressed(saveImage);
    // snapButton.mousePressed(snapImage);
}

//https://p5js.org/reference/#/p5/createGraphics

// function snapImage(){;
//     image(capture, 0, 0, w, h);
//     var positions = tracker.getCurrentPosition();
//     if (positions.length > 0) {
//         noStroke();
//         fill(0, 255, 255);
//         image(img,((positions[62][0])-80), ((positions[62][1])-300), 175, 175);
//     }

//     photobooth = capture.get();
//     image(photobooth, 0, 0);
//     takeSnap = true;

// }

// function saveImage(){
//     if(takeSnap){
//         mode = 1;
//        }    
// }