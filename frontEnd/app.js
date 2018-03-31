/*
Example of node.js basic http "static" server
only uses module internal to node.js: http, url, and fs.

Here our node server does not try to analyse the url to "route" the requests,
it simply serves  files from the ROOT_DIR directory.
It does however replace a path of '/' with '/01hello.html'.

Because it is a static server it does not analyse the requested URL.
It just serves a file if it exists in the intended directory.

Unlike our previous Too Simple Server this one uses the file extension
of the requested resource to decide on the appropriate MIME
type to return to the client.
*/

/*
Testing: Use browser to view pages at:
http://localhost:3000/01hello.html
http://localhost:3000/02index.html
http://localhost:3000/03indexXHTML.html
http://localhost:3000/04table.html
http://localhost:3000/05internalCSS.html
http://localhost:3000/06externalCSS.html
http://localhost:3000/07form.html
http://localhost:3000/08canvasDrawing.html
http://localhost:3000/09canvasDragAndDrop.html
http://localhost:3000/10elementDragAndDrop.html
http://localhost:3000/11cssDragAndDrop.html
http://localhost:3000/12elementsBuiltByJavascript.html
http://localhost:3000/13canvasWithTimer.html

*/

//Cntl+C to stop server

const http = require('http') //need to http
const fs = require('fs') //need to read static files
const url = require('url')  //to parse url strings


const ROOT_DIR = 'html' //dir to serve static files from

const MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/plain'
}

function get_mime(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

http.createServer(function (request,response){
   var urlObj = url.parse(request.url, true, false);
   console.log('\n============================');
	 console.log("PATHNAME: " + urlObj.pathname);
   console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
   console.log("METHOD: " + request.method);

	 var filePath = ROOT_DIR + urlObj.pathname;
	 if(urlObj.pathname === '/') filePath = ROOT_DIR + '/index.html';

     fs.readFile(filePath, function(err,data){
       if(err){
		  //report error to console
          console.log('ERROR: ' + JSON.stringify(err));
		  //respond with not found 404 to client
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
         }
         else{
           response.writeHead(200, {'Content-Type': get_mime(filePath)});
           response.end(data);
         }

       });

 }).listen(3000);

console.log('Server Running at Port 3000  CNTL-C to quit');
