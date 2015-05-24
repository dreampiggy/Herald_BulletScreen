var express = require('express');
var bodyParser = require('body-parser');
var handler = require('./handler');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', handler.acceptBullet);

app.use(function(req, res) {
	res.end('404 not found');
});

app.listen(8080);
console.log('Server Start!');