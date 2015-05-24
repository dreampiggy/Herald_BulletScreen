var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:3000');
ws.on('open', function() {
    ws.send('ok');
});
ws.on('message', function(message) {
    console.log('received: %s', message);
});