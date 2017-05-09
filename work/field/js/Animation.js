function Animation(start, end, duration, callback) {
    var that = this;

    this.startTime = Date.now();
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.state = [start.length];
    this.cancelled = false;

    this.cancel = function() {
      that.cancelled  = true;
    }

    var animate = function() {
        if (!that.cancelled) {
            var delta = (Date.now() - that.startTime) / that.duration;
            var easedDelta = EasingFunctions.linear(delta);

            if (that.start instanceof Array) {
                for (var i = 0; i < that.start.length; i++) {
                    that.state[i] = that.start[i] + (that.end[i] - that.start[i]) * easedDelta;
                }
            } else {
                that.state = that.start + (that.end - that.start) * easedDelta;
            }
            callback(that.state);
            if (delta < 1) requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}





/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EasingFunctions = {
    // no easing, no acceleration
    linear: function(t) {
        return t
    },
    // accelerating from zero velocity
    easeInQuad: function(t) {
        return t * t
    },
    // decelerating to zero velocity
    easeOutQuad: function(t) {
        return t * (2 - t)
    },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function(t) {
        return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    },
    // accelerating from zero velocity
    easeInCubic: function(t) {
        return t * t * t
    },
    // decelerating to zero velocity
    easeOutCubic: function(t) {
        return (--t) * t * t + 1
    },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function(t) {
        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    },
    // accelerating from zero velocity
    easeInQuart: function(t) {
        return t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuart: function(t) {
        return 1 - (--t) * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    },
    // accelerating from zero velocity
    easeInQuint: function(t) {
        return t * t * t * t * t
    },
    // decelerating to zero velocity
    easeOutQuint: function(t) {
        return 1 + (--t) * t * t * t * t
    },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function(t) {
        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
}
