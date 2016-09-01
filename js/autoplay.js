var minID = -1;
var newMinID = -1;
var minOffset = 10000;
var activeContainer =


    window.addEventListener("mousewheel", toggleVideos, true);
window.addEventListener("DOMMouseScroll", toggleVideos, true);
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
    updateNavigationPosition();

    if (minID != newMinID) {
        minID = newMinID;
        playSingleVideo(videos[minID]);

        var parentContainer = findContainer(videos[minID]);
        var parentSection = findSection(videos[minID]);

        if (history.pushState && parentContainer) {
            moveDocumentObject("#navigation", '#' + parentContainer.id)
            history.replaceState(null, null, '#' + parentContainer.id);
        }
        if (parentSection) {
            updateNavigation(parentSection.id);
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
    if (key) {
        node.setAttribute("poster", "img/" + key + ".jpg");

        if (windowWidth < 1000) {
            addSourceToVideo(node, "video/" + key + "s.webm", "video/webm");
            addSourceToVideo(node, "video/" + key + "s.mp4", "video/mp4");
        } else {
            addSourceToVideo(node, "video/" + key + ".webm", "video/webm");
            addSourceToVideo(node, "video/" + key + ".mp4", "video/mp4");
        }
    }
}


function addSourceToVideo(element, src, type) {
    var source = document.createElement('source');
    source.src = src;
    source.type = type;
    element.appendChild(source);
}



function updateNavigation(id) {
    var navElements = document.querySelectorAll("li");
    for (var n = 0; n < navElements.length; n++) navElements[n].className = "";
    var activeElement = document.querySelector("#" + id + "link");
    activeElement.className = "active";
}

function updateNavigationPosition() {

    var position = window.pageYOffset;
    var height = window.innerHeight;
    var progression = position % height;
    if (progression < 0.5 * height) {
        document.querySelector(".label.top").style.position = "fixed";
        document.querySelector(".label.top").style.top = "0px";

    } else {
       document.querySelector(".label.top").style.position = "relative";
      //  document.querySelector(".label.top").style.top = height - progression + "px";

    }
    // console.log(progression);

}

function map(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function findContainer(el) {
    while ((el = el.parentElement) && !el.classList.contains("container"));
    return el;
}

function findSection(el) {
    while ((el = el.parentElement) && el.tagName != "SECTION");
    return el;
}


function moveDocumentObject(cut, paste) {
    var pasteNode = document.querySelector(paste);
    var cutNode = document.querySelector(cut);
    pasteNode.appendChild(cutNode);
}
