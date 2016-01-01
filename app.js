var express = require('express');
var app = express();

app.use(express.static('client'));
app.use(express.static('bower_components'));
var port = process.env.PORT || 8040;

var server = app.listen(port, function() {
	var host = server.address().address;
	
	console.log('Server listenting at port %s', port);
})