var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);

app.get('/', function(req, res) {
res.sendFile(__dirname + '/html/index.html');
});

http.listen(2000, function() {
console.log("Server started.");
});

app.use(express.static(path.join(__dirname, 'html')));
