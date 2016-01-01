var express = require('express');
var app = express();

app.use(express.static('Client'));
app.use(express.static('bower_components'));

var server = app.listen(80, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server listenting at port %s', port);
})