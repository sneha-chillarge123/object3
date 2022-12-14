function back(){
    window.location="index.html";
}
       objectDetector = "";
        img = "";
        status = "";
        objects = [];

        function setup() {
            canvas = createCanvas(640, 420);
            canvas.center();
            objectDetector = ml5.objectDetector('cocossd', modelLoaded);
            document.getElementById("status").innerHTML = "Status : Detecting Objects";
        }

        function preload() {
            img = loadImage('fruit basket.png');
        }
        function draw() {
            image(img, 0,10,640,420);
            if (status != "") {
                for (var i = 0; i < objects.length; i++) {
                    document.getElementById("status").innerHTML = "Status : Object Detected";
                    fill(255, 0, 0);
                    percent = floor(objects[i].confidence * 100);
                    text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
                    noFill();
                    stroke(255, 0, 0);
                    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                    document.getElementById("label").innerHTML = "There is 1 big object as cocssd has identified " + objects.length;
                }
            }
        }

        function modelLoaded() {
            console.log("Model Loaded!");
            status = true;
            objectDetector.detect(img, gotResult);
        }
        function gotResult(error, results) {
            if (error) {
                console.log(error);
            }
            console.log(results);
            objects = results;
        }