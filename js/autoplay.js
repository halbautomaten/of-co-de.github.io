// var minID = -1;
// var newMinID = -1;
// var minOffset = 10000;

var position = 0;
var progression = 0;
var container, section, video;

var containers = [];
var videos = [];

// var updateRequested = false;
var activeContainer = -1;
var containerHeight = 0;


var lastDelta = 0;
var mouseWheelAcceleration = 0;
//window.addEventListener("mousewheel", scrollSnapMouseWheel);
//window.addEventListener("DOMMouseScroll", scrollSnapMouseWheel);
//window.addEventListener("scroll", scrollSnapMouseWheel);
//
// //window.addEventListener("hashchange", activateContainer);
window.addEventListener("touchmove", function(e) {
    console.log(e);
    playSingleVideo(video);
});
window.addEventListener("resize", function() {
    setupContainers();
});

window.addEventListener("load", function() {
    setupContainers();
    setupVideos();
    setupScrollAnimation();
    loop();
});

function setupContainers() {
    var containerCSS = document.querySelector("#containerCSS");
    containers = document.querySelectorAll(".container");
    containerHeight = window.innerHeight;
    containerCSS.innerHTML = ".container {height: " + containerHeight + "px;}";
}

function setupVideos() {
    videos = document.querySelectorAll('video');
    for (var v = 0; v < videos.length; v++) {
        buildSources(videos[v]);
        makeVideoPlayableInline(videos[v], false);

        videos[v].addEventListener("contextmenu", function (e) {
          e.preventDefault();
          e.stopPropagation();
        }, false);

        videos[v].addEventListener("click", function() {
            if (this.paused) playSingleVideo(this);
            else this.pause();
        });
    }

}

function loop() {
    activateContainer();
    requestAnimationFrame(loop);
}


// function requestUpdate(event) {
//   event = event || {};
//   if(event){
//     activateContainer();
//   } else if (!updateRequested) {
//         updateRequested = true;
//         requestAnimationFrame(function() {
//             activateContainer();
//             updateRequested = false;
//         });
//     }
// }

function activateContainer() {
    //var position = window.pageYOffset;
    position = document.getElementById("body").scrollTop;
    var newActiveContainer = Math.round(position / containerHeight);
    progression = position % containerHeight;

    if (newActiveContainer != activeContainer) {
        activeContainer = newActiveContainer;

        container = containers[activeContainer];
        video = container.querySelector("video");
        section = container.parentElement;


        for (var c = 0; c < containers.length; c++) {
            if (c !== activeContainer) {
                containers[c].className = "container";
            } else {
                containers[c].className = "active container";
            }
        }





        playSingleVideo(video);
        moveDocumentObject("#navigation", '#' + container.id + '> .toplabel');
        updateNavigation(section.id);

        if (history.replaceState) history.replaceState(null, null, '#' + container.id);
    }

    //update Navigation position
    if (progression < 0.5 * containerHeight) {
        document.querySelector("#navigation").style.position = "fixed";
        document.querySelector("#navigation").style.top = "0px";
    } else {
        document.querySelector("#navigation").style.position = "relative";
    }
}




// function toggleVideos() {
//     var videos = document.getElementsByTagName('video');
//     newMinID = minID;
//     minOffset = 10000;
//
//     for (var v = 0; v < videos.length; v++) {
//         var offset = Math.abs(videos[v].getBoundingClientRect().top);
//         if (offset < minOffset) {
//             minOffset = offset;
//             newMinID = v;
//         }
//     }
//
//     if (minID != newMinID) {
//         minID = newMinID;
//         playSingleVideo(videos[minID]);
//         updateNavigationPosition();
//
//         var parentContainer = findContainer(videos[minID]);
//         var parentSection = findSection(videos[minID]);
//
//         if (history.pushState && parentContainer) {
//             moveDocumentObject("#navigation", '#' + parentContainer.id)
//             history.replaceState(null, null, '#' + parentContainer.id);
//         }
//         if (parentSection) {
//             updateNavigation(parentSection.id);
//         }
//     }
// };



function playSingleVideo(node) {
    for (var v = 0; v < videos.length; v++) {
        if (videos[v] !== node) {
            if (!videos[v].paused) videos[v].pause();
            // videos[v].className = "fill";
        } else {
            if (videos[v].paused) {
                var playPromise = videos[v].play();
                // videos[v].className = "fill playing";
                if (playPromise) {
                    playPromise.then(function() {
                        // Automatic playback started!
                    }).catch(function(error) {
                        //console.log(error);
                        // Automatic playback failed.
                        // Show a UI element to let the user manually start playback.
                    });
                }
            }
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

// function updateNavigationPosition() {
//     var position = window.pageYOffset;
//
//
//     // console.log(progression);
//
// }

// function map(value, low1, high1, low2, high2) {
//     return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
// }

// function findContainer(el) {
//     while ((el = el.parentElement) && !el.classList.contains("container"));
//     return el;
// }
//
// function findSection(el) {
//     while ((el = el.parentElement) && el.tagName != "SECTION");
//     return el;
// }


function moveDocumentObject(cut, paste) {
    var pasteNode = document.querySelector(paste);
    var cutNode = document.querySelector(cut);
    pasteNode.appendChild(cutNode);
}
