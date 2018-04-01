let http = require('http');
let express = require('express');
let upload = require('express-fileupload');

let app = express();
http.Server(app).listen(3000);
app.use(upload());

console.log('Server started @ port 3000');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
})

app.post('/upload', function(req, res) {
	console.log(req.files);
	if (req.files.upfile) {
		let file = req.files.upfile,
			name = file.name,
			type = file.mimetype;
		let uploadpath = __dirname + '/uploads/' + name;
		file.mv(uploadpath, function(err) {
			if (err) {
				console.log('File upload failed', name, err);
				res.send('Error Occured!');
			} else {
				console.log('File uploaded', name);
				res.send('Done! Uploading file');
			}
		});
	} else {
		res.send('No file selected!');
		res.end();
	}
})