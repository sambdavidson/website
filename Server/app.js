var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hello World!');
});

app.use(express.static('Client'));

var server = app.listen(8040, function() {
	var host = server.address().address;
	var port = server.address().port;
	
	console.log('Server listenting at port %s', port);
})