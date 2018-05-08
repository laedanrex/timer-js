$(document).ready(function () {
    let timer;
    let myTimerInterval;
    console.log("ready");

    $("#timer-start-button").click(function () {
        console.log("click start!");
        if (!timer || timer.isOver()) {
            timer = new Clock();
            timer.setCountDown(getTimeSetted());
        }
        if (myTimerInterval) {
            clearInterval(myTimerInterval);
        }
        timer.start();
        //**************************************** HOP INTERVAL
        myTimerInterval = setInterval(function () {
            if (!timer.isPaused()) {
                timer.progress();
                showTimer(timer);
                if (timer.isOver()) {
                    clearInterval(myTimerInterval);
                    timer = null;
                }
            }
        }, 20);
    });

    $("#timer-pause-button").click(function () {
        console.log("click pause!");
        if (timer && !timer.isOver()) {
            timer.pause();
        }
    });

    $("#timer-reset-button").click(function () {
        console.log("click reset!");
        if (timer) {
            timer.reset();
        }
        showTimer(timer);
    });

    console.log("ready end");
});


/**
 * Retourne actual si elle existe sinan default
 * @param actualVar
 * @param defaultVar
 * @returns {*}
 */
function existOrDefault(actualVar, defaultVar) {
    if (actualVar) {
        return actualVar;
    }
    return defaultVar;
}

/**
 * Le temps a atteindre
 */
function getTimeSetted() {
    let h = existOrDefault($('#timer-start-hours').val(), 0);
    let m = existOrDefault($('#timer-start-minutes').val(), 0);
    let s = existOrDefault($('#timer-start-seconds').val(), 0);
    return ((h * 60 * 60) + (m * 60) + s) * 1000;
}

function updateTimer(timer) {
    timer.progressAngleOffset = timer.milliSecondsPast * 360 / timer.milliSecondsToReach;
}

function showTimer(timer) {
    if (timer) {
        $(".debug-target-time").text(timer.toPrettyString());
        $("#timer-circle-path").attr('d', svg_arc_path(150, 150, 100, timer.milliSecondsPast * 360 / timer.milliSecondsToReach, 0));
    }
}

/**
 *
 * @param cx
 * @param cy
 * @param radius
 * @param angle
 * @returns {*[]}
 */
function polar_to_cartesian(cx, cy, radius, angle) {
    let radians;
    radians = (angle - 90) * Math.PI / 180.0;
    return [
        Math.round((cx + (radius * Math.cos(radians))) * 100) / 100,
        Math.round((cy + (radius * Math.sin(radians))) * 100) / 100
    ];
}

/**
 *
 */
function svg_arc_path(x, y, radius, angleStart, angleEnd) {
    let end_xy, start_xy, long;
    start_xy = polar_to_cartesian(x, y, radius, angleStart);
    end_xy = polar_to_cartesian(x, y, radius, angleEnd);
    long = angleStart - angleEnd >= 180 ? 1 : 0;
    let str = "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 " + long + " 0 " + end_xy[0] + " " + end_xy[1];
    console.log(str);
    return str;
}

