var request = require('superagent');
var events = require("events");
var WebSocket = require('ws');
var connection = require('./config');

var WebSocketServer = WebSocket.Server
var wss = new WebSocketServer({ port: 3000 });
var emitter = new events.EventEmitter();

(function websocket(){
	wss.on('connection', function connection(ws) {
		console.log('WebSocket start!');

		var sendBullet = function(bullet){
			var sendJSON = [bullet];
			ws.send(JSON.stringify(sendJSON));//加入判断
		};

		emitter.addListener('bullet come',sendBullet);//加入对字幕请求的监听器

		var uuid = '0000000000000001';

		getTime(uuid,function(time){
			getBullet(time,function(results){
				if (results){
					ws.send(JSON.stringify(results));
				}
			});
		});

		ws.on('message', function incoming(message) {
			//保留，比如可以发送过来你的uuid来识别用户
		});

		ws.on('close', function close(){
			emitter.removeListener('bullet come',sendBullet);//取消监听器
			saveTime(uuid);
		})
	});
})();

function acceptBullet(req,res){
	if (!req.body){
		res.status(403).end();
		return;
	}

	var bullet = checkBullet(req.body);

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

function checkBullet (results){
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
		else{
			return true;//ok
		}
	});
}

function getBullet (time,callback){
	var query = connection.query('SELECT time,movieid,content,studentNum FROM bullet WHERE time > ? ORDER BY id DESC LIMIT 10',
		[time],//最多会取最近的10条
		function(err,results){
		if (err){
			console.log(err);
			callback(null);
		}
		else if (!results || results.length == 0){
			callback(null);
		}
		else{
			console.log(results);
			callback(results);
		}
	});
}

function saveTime (uuid){
	var time = Math.round(new Date().getTime()/1000);
	var query = connection.query('INSERT INTO user SET uuid = ?,time = ? ON DUPLICATE KEY UPDATE uuid = ?,time = ?',
		[uuid,time,uuid,time],
		function(err,results){
		if (err){
			console.log(err);
		}
		else{
			return true;//ok
		}
	});
}

function getTime (uuid,callback){
	var time = Math.round(new Date().getTime()/1000);
	var query = connection.query('SELECT time FROM user WHERE uuid = ?',
		[uuid],
		function(err,results){
		if (err){
			callback(time);
		}
		else if (!results || results.length == 0){
			callback(time);
		}
		else{
			callback(results[0]['time']);
		}
	});
}

exports.acceptBullet = acceptBullet;