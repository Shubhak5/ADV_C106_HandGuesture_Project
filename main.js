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

classifier = ml5.imageClassifier('https: //teachablemachine.withgoogle.com/models/1WHX6zk7K/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function speak() {
    var synth = window.speechSynthesis;

    speak_data = "The hand guesture is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);

}