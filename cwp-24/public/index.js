var vm = new Vue({
    el: '#app',
    data: {
        socket: null,
        messages: {
            info: [],
            buy: [],
            sell: [],
        },
        codes: [],
        code: null,
        interval: 1000,
        buyInput: '',
        sellInput: '',
    },
    methods: {
        sendRequest: function() {
            if (this.code && Number(this.interval)) {
                this.socket.emit('btc', {
                    code: this.code,
                    interval: this.interval,
                });
            }
        },
        sendMessage: function(room, input) {
            if (room && this[input]) {
                this.socket.emit('message', {
                    room,
                    message: this[input],
                });
                this[input] = '';
            }
        },
    },
    mounted: function() {
        this.socket = io.connect('/');

        this.socket.on('codes', (codes) => {
            this.codes = codes;
        });

        this.socket.on('btc', (data) => {
            this.messages.info.push({
                code: this.code,
                info: `15m: ${data['15m']}, last: ${data['last']}, buy: ${data['buy']}${data['symbol']}, sell: ${data['sell']}${data['symbol']}`,
            });
        });

        this.socket.on('message', ({ room, message, id }) => {
            if (room === 'buy' || room === 'sell') {
                this.messages[room].push({
                    id,
                    message,
                });
                console.log('push');
            }
        });
    },
});
