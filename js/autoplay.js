var minID = -1;
var newMinID = -1;
var minOffset = 10000;


window.addEventListener("mousewheel", toggleVideos, true);
window.addEventListener("hashchange", toggleVideos, true);
window.addEventListener("resize", toggleVideos, true);
window.addEventListener("touchmove", toggleVideos, true);

window.addEventListener("load", function() {
    setupAnimation();


    toggleVideos();
    var videos = document.getElementsByTagName('video');
    for (var v = 0; v < videos.length; v++) {

        buildSources(videos[v]);

        videos[v].addEventListener("click", function() {
            if (this.paused) playSingleVideo(this);
            else this.pause();

        });
    }

});




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
        playSingleVideo(videos[minID]);
        if (history.pushState) {
            history.replaceState(null, null, '#'+findAncestor(videos[minID], "container").id);
        }
    }
};



function playSingleVideo(node) {
    var videos = document.getElementsByTagName('video');
    for (var v = 0; v < videos.length; v++) {
        if (videos[v] !== node) {
            if (!videos[v].paused) videos[v].pause();
        } else {
            if (videos[v].paused) videos[v].play();
        }
    }
}




function buildSources(node) {
    var key = node.getAttribute("data-source");
    var windowWidth = window.innerWidth;

    node.setAttribute("poster", "img/" + key + ".jpg");

    if (windowWidth < 1000) {
        addSourceToVideo(node, "video/" + key + "s.webm", "video/webm");
        addSourceToVideo(node, "video/" + key + "s.mp4", "video/mp4");
    } else {
        addSourceToVideo(node, "video/" + key + ".webm", "video/webm");
        addSourceToVideo(node, "video/" + key + ".mp4", "video/mp4");
    }
}


function addSourceToVideo(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}

function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
