
let http = require("http");
let fs = require("fs");
let url = require("url");

let ROOT_DIR = "html"; // directory to serve static files

let MIME_TYPES = {
    'css': 'text/css',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'js': 'text/javascript',
    'json': 'application/json',
    'txt': 'text/text'
};

let get_mime = function(filename) {
    let ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

http.createServer(function(request, response) {
	let urlObj = url.parse(request.url, true, false);

	if (request.method === "GET") {
		let filePath = ROOT_DIR + urlObj.pathname;
		if (urlObj.pathname === "/") filePath = ROOT_DIR + "/index.html";

		fs.readFile(filePath, function(err, data) {
			if (err) {
				console.log("ERROR: " + JSON.stringify(err));
            	response.writeHead(404);
            	response.end(JSON.stringify(err));
            	return;
			} else {
				response.writeHead(200, { "Content-Type": get_mime(filePath) });
          		response.end(data);
			}
		});
	}
}).listen(3000);

console.log('Server Running at localhost:3000\n^C to quit');
