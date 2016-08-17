var minID = -1;
var newMinID = -1;
var minOffset = 10000;


window.addEventListener("mousewheel", toggleVideos);
window.addEventListener("hashchange", toggleVideos);

window.addEventListener("resize", toggleVideos);

//window.addEventListener("touchend", toggleVideos);
window.addEventListener("load", function() {
    setupAnimation();

    var windowWidth = window.innerWidth;

    toggleVideos();
    var videos = document.getElementsByTagName('video');
    for (var v = 0; v < videos.length; v++) {

        if (windowWidth < 1000) {
            addSourceToVideo(videos[v], "video/" + v + "s.webm", "video/webm");
            addSourceToVideo(videos[v], "video/" + v + "s.mp4", "video/mp4");
        } else {
            addSourceToVideo(videos[v], "video/" + v + ".webm", "video/webm");
            addSourceToVideo(videos[v], "video/" + v + ".mp4", "video/mp4");
        }

        videos[v].addEventListener("click", function() {
            if (this.paused) this.play();
            else this.pause();

        });
    }

});

function addSourceToVideo(element, src, type) {
    var source = document.createElement('source');

    source.src = src;
    source.type = type;

    element.appendChild(source);
}


function toggleVideos() {
    var videos = document.getElementsByTagName('video');
    newMinID = minID;
    minOffset = 10000;

    for (var v = 0; v < videos.length; v++) {
        var offset = Math.abs(videos[v].getBoundingClientRect().top);
        if (offset < minOffset) {
            minOffset = offset;
            newMinID = v;
        }
    }

    if (minID != newMinID) {
        minID = newMinID;
        console.log("changed to " + newMinID);
        for (var v = 0; v < videos.length; v++) {
            //console.log(v+" "+minID);
            if (v != minID) {
                if (!videos[v].paused) videos[v].pause();
            } else {
                if (videos[v].paused) videos[v].play();
            }
        }
    }
};
