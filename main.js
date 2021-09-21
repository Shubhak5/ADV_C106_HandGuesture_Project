//https: //teachablemachine.withgoogle.com/models/1WHX6zk7K/ 
var prediction = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_format: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {

    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "'/>";
    });
}

console.log(ml5.version); //just to check if ml5 is loaded or not

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/1WHX6zk7K/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;

    speak_data = prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("error is...." + error);
    } else {
        console.log(results[0].label + " " + results[1].label + " " + results[2].label);
        if (results[0].label == "Victory") {
            document.getElementById("result_emoji_name").innerHTML = "That was a marvelous Victory";
            prediction = "That was a marvelous Victory";
            document.getElementById("update_emoji").innerHTML = " &#9996;";
        } else if (results[0].label == "Thumbs Up") {
            document.getElementById("result_emoji_name").innerHTML = "All the Best";
            prediction = "All the Best";
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        } else if (results[0].label == "Excellent") {
            document.getElementById("result_emoji_name").innerHTML = "This is looking Amazing";
            prediction = "This is looking Amazing";
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        speak();
        prediction = "";
    }
}