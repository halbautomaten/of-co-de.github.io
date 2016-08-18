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
            toggleVideos();
            if (step == 1) clearInterval(timer);
        }, 25);
    elem.style[style] = from + unit;
}

function scrollTo(targetQuery) {
    var target = document.querySelector(targetQuery);
    playSingleVideo(target.querySelector("video"));
    animate(document.body, "scrollTop", "", window.pageYOffset, target.offsetTop, 250, true);
}

function setupAnimation() {
    var anchors = document.getElementsByTagName('a');
    for(var a=0;a<anchors.length;a++){
      anchors[a].addEventListener('click',function(e){
        //console.log(e);
        e.preventDefault();
        var targetQuery = this.getAttribute("href");
        //console.log(targetQuery);
        scrollTo(targetQuery);
        return false;
      });
    }
};
