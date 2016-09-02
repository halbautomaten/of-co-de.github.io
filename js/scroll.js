function animate(elem, style, unit, from, to, time, prop) {
    if (!elem) return;
    var start = new Date().getTime(),
        timer = setInterval(function() {
            var step = Math.min(1, (new Date().getTime() - start) / time);
            if (prop) {
                elem[style] = (from + step * (to - from)) + unit;
            } else {
                elem.style[style] = (from + step * (to - from)) + unit;
            }
            if (step == 1) clearInterval(timer);
            requestUpdate();
        }, 25);
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
