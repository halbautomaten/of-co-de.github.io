var wildcard = document.getElementById("wildcard");
var array = [
    ":-)",
    "100%",
    "abc",
    "animation",
    "apps",
    "art",
    "beauty",
    "cats",
    "charts",
    "christmas",
    "code",
    "color",
    "concept",
    "content",
    "craft",
    "data",
    "design",
    "diagrams",
    "education",
    "flow",
    "form",
    "function",
    "future",
    "globe",
    "graph",
    "graphics",
    "humans",
    "images",
    "info",
    "interaction",
    "layout",
    "lines",
    "loads",
    "lots",
    "made",
    "maps",
    "michael",
    "moments",
    "motion",
    "patterns",
    "reality",
    "religion",
    "report",
    "sebastian",
    "shape",
    "smile",
    "sounds",
    "stories",
    "studio",
    "tales",
    "taste",
    "things",
    "toasters",
    "type",
    "united states",
    "videos",
    "view",
    "visualization",
    "web",
    "world"
];
function refresh() {
    var randomIndex = Math.floor(Math.random() * array.length);
    wildcard.innerHTML = array[randomIndex];
}

refresh();
setInterval(function(){
refresh();
setTimeout(refresh,100);
setTimeout(refresh,200);
setTimeout(refresh,300);
setTimeout(refresh,400);
setTimeout(refresh,500);

}, 1600);
