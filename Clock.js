class Clock {

    constructor() {
        this.init();
    }

    init() {
        this.milliSecondsAtInit = 0;
        this.milliSecondsToReach = 1;
        this.milliSecondsLeft = 0;
        this.milliSecondsPast = 0;
        this.lastUpdate = new Date();
        this.countdown = false;
        this.hold = false;
        this.over = false;
    }

    setCountDown(milliseconds) {
        this.countdown = true;
        this.milliSecondsAtInit = 0;
        this.milliSecondsToReach = milliseconds;
        this.milliSecondsLeft = milliseconds;
        this.milliSecondsPast = 0;
    }

    start() {
        if (this.hold) {
            this.lastUpdate = new Date();
        }
        this.hold = false;
    }

    pause() {
        this.hold = true;
    }

    isPaused() {
        return this.hold;
    }

    progress() {
        let now = new Date();
        let timeDiff = (now.getTime() - this.lastUpdate.getTime());
        this.lastUpdate = now;
        this.milliSecondsPast = this.milliSecondsPast + timeDiff;
        if (this.countdown) {
            this.milliSecondsLeft = this.milliSecondsLeft - timeDiff;
            if (this.milliSecondsLeft <= 0) {
                this.milliSecondsLeft = 0;
                this.milliSecondsPast = this.milliSecondsToReach - 1;
                this.over = true;
            }
        }
    }

    reset() {
        this.init();
        this.over = true;
    }

    isOver() {
        return this.over;
    }

    toPrettyString() {
        // let str = new Date(null).setMilliseconds(this.milliSecondsLeft).toString();
        // console.log("timer to string = " + str);
        // return str;

        let hours = Math.floor(this.milliSecondsLeft / 3600000);
        let minutes = Math.floor((this.milliSecondsLeft - (hours * 3600000)) / 60000);
        let seconds = Math.floor((this.milliSecondsLeft - (hours * 3600000) - (minutes * 60000)) / 1000);
        let millis = this.milliSecondsLeft - (hours * 3600000) - (minutes * 60000) - (seconds * 1000);

        if (hours < 10) {
            hours = "0" + hours;
        }
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        if (millis < 100) {
            if (millis < 10) {
                millis = "0" + millis;
            }
            millis = "0" + millis;
        }

        return hours + ':' + minutes + ':' + seconds + '.' + millis;
    }

}

