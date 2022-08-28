status = "";
objects = [];

function preload(){
    song = loadSound("alarm.wav");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(video, 0, 0, 380, 380);
    song.setVolume(1);
    song.rate(1);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Done Detecting";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)

            if(objects[i].label != "person"){
                song.play();
            }
            else{
                song.stop();
            }
        }
    
    }
}
function modelLoaded(){ 
    console.log("Model has Loaded");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }

    console.log(results);
    objects = results;
}