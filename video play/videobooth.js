
var videos = { video1: "video/demovideo1.mp4", video2: "video/demovideo2.mp4" };
var effectFunction = null;

window.onload = function () {
    var video = document.getElementById("video");
    video.src = videos.video1;
    video.load();


    var controlLinks = document.querySelectorAll("a.control");
    for (var i = 0; i < controlLinks.length; i++) {
        controlLinks[i].onclick = handleControl;
    }

    var effectLinks = document.querySelectorAll("a.effect");
    for (var i = 0; i < effectLinks.length; i++) {
        effectLinks[i].onclick = setEffect;
    }


    var videoLinks = document.querySelectorAll("a.videoSelection");
    for (var i = 0; i < videoLinks.length; i++) {
        videoLinks[i].onclick = setVideo;
    }

    video.onended = endedHandler;
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
    video.addEventListener("play", processFrame, false);
}

function processFrame() {

    var video = document.getElementById("video");
    if (video.paused || video.ended) {
        return;
    }
    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(0, 0, bufferCanvas.width, bufferCanvas.height);
    var length = frame.data.length / 4;
    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (effectFunction) {
            effectFunction(i, r, g, b, frame.data);
        }
    }

    display.putImageData(frame, 0, 0);
    setTimeout(processFrame, 0);

}


function noir(pos, r, g, b, data) {
    var brightness = (3 * r + 4 * g + b) >>> 3;
    if (brightness < 0) {
        brightness = 0;
    }
    data[pos * 4 + 0] = brightness;
    data[pos * 4 + 1] = brightness;
    data[pos * 4 + 2] = brightness;
}

function handleControl(e) {
    var video = document.getElementById("video");
    var id = e.target.getAttribute("id");
    switch (id){
        case "play":
            pushUnpushButtons("play", ["pause"]);
            if (video.ended) {
                video.load();
            }
            video.play();
            break;
        case "pause":
            video.pause()
            pushUnpushButtons("pause", ["play"]);
            break;
        case "loop":
            if (isButtonPushed("loop")) {
                pushUnpushButtons("", ["loop"])
            } else {
                pushUnpushButtons("loop", []);
            }
            video.loop = !video.loop;
            break;
        case "mute":
            if (isButtonPushed("mute")) {
                pushUnpushButtons("", ["mute"])
            } else {
                pushUnpushButtons("mute", []);
            }
            video.muted = !video.muted;
            break;
    }
}

function endedHandler() {
    pushUnpushButtons("", ["play"]);
}
function setEffect(e) {
    var id = e.target.getAttribute("id");

    switch (id) {
        case "normal":
            pushUnpushButtons("normal", ["western", "noir", "scifi"]);
            effectFunction = null;
            break;
        case "western":
            pushUnpushButtons("western", ["normal", "noir", "scifi"]);
            effectFunction = western;
            break
        case "noir":
            pushUnpushButtons("noir", ["normal", "scifi", "western"]);
            effectFunction = noir
            break;
        case "scifi":
            pushUnpushButtons("scifi", ["normal", "noir", "western"]);
            effectFunction = scifi;
            break;

    }
}


function setVideo(e) {
    var id = e.target.getAttribute("id");
    var video = document.getElementById("video");
    if (id == "video1") {
        pushUnpushButtons("video1", ["video2"]);

    } else if (id == "video2") {
        pushUnpushButtons("video2", ["video1"]);
    }

    video.src = videos[id];
    video.load();
    video.play();

    pushUnpushButtons("play", ["pause"]);

}

function pushUnpushButtons(idToPush, idArrayToUnpush){
    if (idToPush != "") {
        var anchor = document.getElementById(idToPush);
        var theClass = anchor.getAttribute("class");
        if (!theClass.indexOf("selected") >= 0) {
            theClass = theClass + " selected";
            anchor.setAttribute("class", theClass);
            var newImge = "url(images/" + idToPush + "pressed.png";
            anchor.style.backgroundImage = newImge;
        }
    }

    for (var i = 0; i < idArrayToUnpush.length; i++) {
        anchor = document.getElementById(idArrayToUnpush[i]);
        theClass = anchor.getAttribute("class");
        if (theClass.indexOf("selected") >= 0) {
            theClass = theClass.replace("selected", "");
            anchor.setAttribute("class", theClass);
            anchor.style.background = "";
        }
    }
}


function isButtonPushed(id) {
    var anchor = document.getElementById(id);
    var theClass = anchor.getAttribute("class");
    return (theClass.indexOf("selected") >= 0);
}