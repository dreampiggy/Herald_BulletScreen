var request = require('superagent');
var async = require('async');
var events = require("events");
var WebSocket = require('ws');
var connection = require('./config');

var WebSocketServer = WebSocket.Server
var wss = new WebSocketServer({ port: 3000 });
var emitter = new events.EventEmitter();

(function websocket(){
	wss.on('connection', function connection(ws) {
		console.log('WebSocket start!');

		ws.on('open', function open() {
		  ws.send('ok');
		});

		ws.on('message', function incoming(message) {
		  //
		});

		emitter.on('bullet come',function(bullet){
			ws.send(JSON.stringify(bullet));//加入判断
		})
	});
}());

function acceptBullet(req,res){
	if (!req.body){
		res.status(403).end();
		return;
	}

	var bullet = getBullet(req.body);

	console.log(req.body);

	if (bullet){
		res.status(200).end();
	}
	else{
		res.status(403).end();
		return;
	}

	saveBullet(bullet);
	emitter.emit('bullet come',bullet);
}

function getBullet (results){
	var bullet = {
		time: '',
		movieid: '000000001',//保留字，视频ID，暂时定义为000000001
		content: '',
		studentNum: ''
	};

	var timeReg = /^\d+$/;
	var studentNumReg = /^\d{2}\w{1}\d{5}$/;

	if (!results.time || !results.movieid || !results.content ||!results.studentNum){
		return null;
	}
	if (!timeReg.test(results.time) || !studentNumReg.test(results.studentNum)){
		return null;
	}

	bullet.time = results.time;
	// bullet.movieid = results.movieid;//暂时不使用
	bullet.content = results.content;
	bullet.studentNum = results.studentNum;

	return bullet;
}

function saveBullet (bullet) {
	if (!bullet){
		return;
	}

	var time = bullet.time;
	var movieid = bullet.movieid;
	var content = bullet.content;
	var studentNum = bullet.studentNum;

	var query = connection.query('INSERT INTO bullet SET time = ?,movieid = ?,content = ?,studentNum = ?',
		[time,movieid,content,studentNum],
		function(err, results) {
		if (err){
			console.log(err);
		}
		else if (!results){
			//
		}
		else{
			//
		}
	});
	return;
}

exports.acceptBullet = acceptBullet;