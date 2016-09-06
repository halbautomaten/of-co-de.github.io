var animationInProgress = false;

function animate(elem, style, unit, from, to, time, prop) {
    if (!elem || animationInProgress) return;

    animationInProgress = true;
    var start = new Date().getTime();
    // var timer = setInterval(function() {
    //         var step = Math.min(1, (new Date().getTime() - start) / time);
    //         if (prop) {
    //             elem[style] = (from + step * (to - from)) + unit;
    //         } else {
    //             elem.style[style] = (from + step * (to - from)) + unit;
    //         }
    //         if (step == 1){
    //           clearInterval(timer);
    //           animationInProgress = false;
    //         }
    //     }, 25);
    requestAnimationFrame(setPosition);

    function setPosition() {
        var linearStep = Math.min(1, (new Date().getTime() - start) / time);
        var step = EasingFunctions.easeInOutQuad(linearStep);
        if (prop) {
            elem[style] = (from + step * (to - from)) + unit;
        } else {
            elem.style[style] = (from + step * (to - from)) + unit;
        }
        if (step < 1) {
            // clearInterval(timer);
            requestAnimationFrame(setPosition);
        } else {
            animationInProgress = false;
        }
    };
    elem.style[style] = from + unit;
}

function scrollToTarget(targetQuery) {
    position = document.getElementById("body").scrollTop;

    var target = document.querySelector(targetQuery);
    playSingleVideo(target.querySelector("video")); //launch video from a click event, necessary for mobile
    animate(document.getElementById("body"), "scrollTop", "", position, target.offsetTop, 400, true);
}

function setupScrollAnimation() {
    var anchors = document.getElementsByTagName('a');
    for (var a = 0; a < anchors.length; a++) {
        var href = anchors[a].getAttribute("href");
        if (href.substr(0, 1) == "#") {
            anchors[a].addEventListener('click', function(e) {
                //console.log(e);
                e.preventDefault();
                var targetQuery = this.getAttribute("href");
                //console.log(targetQuery);
                scrollToTarget(targetQuery);
                return false;
            });
        }
    }
};


function scrollSnapMouseWheel(e) {
    e.preventDefault();
    //console.log(e);

    var delta = event.wheelDelta || -event.detail;
    if (Math.abs(delta) > lastDelta+10) {
        var targetID;
        if (delta > 10 && activeContainer > 0) {
            targetID = containers[activeContainer - 1].id;
        } else if (delta < -10 && activeContainer < containers.length - 1) {
            targetID = containers[activeContainer + 1].id;
        }
        if (!animationInProgress && targetID) scrollToTarget("#" + targetID);
    }
    lastDelta = Math.abs(delta);
}







document.addEventListener("keydown", function(e) {
    e = e || window.event;
    var targetID;
console.log(e.keyCode);
    if (e.keyCode == '38' && activeContainer > 0) {
        // up arrow
        targetID = containers[activeContainer - 1].id;
    } else if (e.keyCode == '40' && activeContainer < containers.length - 1) {
        // down arrow
        targetID = containers[activeContainer + 1].id;
    }
    if (!animationInProgress && targetID) scrollToTarget("#" + targetID);
});
