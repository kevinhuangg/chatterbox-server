/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var results = []; //storage array for passed in data
var responseBody = {};

var requestHandler = function(request, response) {


  //if request.method is equal to 'GET' and request.url is equal to '/classes/messages'

  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // console.log(headers);

  request.on('error', function(err) {
    console.error('something wrong happened');
    response.statusCode = 404;
    response.end();
  });
  request.on('data', function(chunk) { //ask why chaining fails our tests
    console.log(chunk);
    if (chunk) {
      results.push(chunk.toString());
    }
  });      
  // request.on('end', function() { //ask what the fuck this does

  //   response.end();
  // });

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  //{'Content-Type': 'application/json'}

  if (request.method === 'GET') {
    response.statusCode = statusCode;
    response.writeHead(statusCode, headers);

    responseBody = {
      method: request.method,
      url: request.url,
      headers: headers,
      responseCode: statusCode,
      results: results
    };
    // console.log(responseBody.results);
    // response.end(JSON.stringify(responseBody));
    
  } else if (request.method === 'POST') {
    statusCode = 201;
    response.writeHead(statusCode, headers);    
    
  }

  response.end(JSON.stringify(responseBody));
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end('Hello, World!');
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.

module.exports.requestHandler = requestHandler;
