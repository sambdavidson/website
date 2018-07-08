var express = require('express');
var app = express();

app.use('/static', express.static(__dirname + '/build'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/', express.static(__dirname + '/static'));

var port = process.env.PORT || 8040;

var server = app.listen(port, function() {
	var host = server.address().address;
	
	console.log('Server listenting at port %s', port);
});