var express = require('express');
var request = require('request');
var app = express();

//app.use('/static', express.static(__dirname + '/build'));
//app.use('/static', express.static(__dirname + '/static'));
//app.use('/', express.static(__dirname + '/static'));
app.use('/', express.static(__dirname + '/build')); // Enable only this when developing

app.get('/face_data.xml', function(req,res) {
    const faceBucketUrl = 'https://storage.googleapis.com/paper-portraits-faces';
    request(faceBucketUrl).pipe(res);
});

app.get('*', function(req, res) {
   res.sendFile(__dirname + '/build/index.html');
});

var port = process.env.PORT || 8040;

var server = app.listen(port, function() {
	var host = server.address().address;
	
	console.log('Server listenting at port %s', port);
});
