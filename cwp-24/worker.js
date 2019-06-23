const axios = require('axios');

class Peon {
    constructor(interval = 1000) {
        this.interval = interval;
        this.data = {};
        this.workwork = false;
    }

    setInterval(interval) {
        this.interval = interval;
    }

    getInterval() {
        return this.interval;
    }

    getData(code) {
        if (code) {
            return this.data[code];
        }

        return this.data;
    }

    start() {
        this.workwork = true;
        this.workWork();
    }

    stop() {
        this.workwork = false;
    }

    async workWork() {
        if (this.workwork) {
            let response = await axios.get('https://blockchain.info/en/ticker');
            this.data = response.data;

            setTimeout(this.workWork, this.interval);
        }
    }
}

module.exports = Peon;