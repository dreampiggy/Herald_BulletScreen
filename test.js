var WebSocket = require('ws')
  , ws = new WebSocket('ws://localhost:3000');
var request = require('superagent');

function sendWebSocket(){
	ws.on('open', function() {
		console.log('open!');
	    ws.send('ok');
	});
	ws.on('message', function(message) {
	    console.log('received: %s', message);
	});
}

function sendHTTP(){
	var time = Math.round(new Date().getTime()/1000);
	var random = Math.floor(Math.random() * ( 100 + 1));
	var sendJSON = {
		time : time,
		content : '我要上头条#' + random,
		movieid : '000000001',
		studentNum : '71113425'
	}
	request
		.post('http://localhost:8080/')
		.send(sendJSON)
		.end(function(err, res){
		if (err){
			console.log(err);
		}
		else{
			console.log(res.statusCode);
		}
	});
}

setInterval(sendHTTP,1000);//每秒模拟发送1个字幕
sendWebSocket();//启动WebSocket