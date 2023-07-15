let express = require('express');
let api_routes = require('./routes/studentAPI.js');

// Tell server to run the client web app (student sign in page) of the production build (in the dist directory)
let path = require('path');

// Create web application
let app = express();

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist');

app.use(express.static(vueClientPath));

// Handling JSON requests, convert data to Javascript format
app.use(express.json());

// configure our app to be able to respond to those routes/requests
// collect those routes under this api path, "/api" (start with this path)

app.use('/api', api_routes);

// This code will run if the above code does not run where as if the client makes a request other than the url provided, express needs to find a way to handle that request and so it will look at this call back function
// Catch request error handling
app.use(function (req, res, next) {
  // Response with a 404 to any other requests
  res.status(404).send('Request Not Found');
});

app.use(function (err, req, res, next) {
  //server error notification using stack error trace
  console.log(err.stack);
  res.status(500).send('Server Error');
});

// Start server running
let server = app.listen(process.env.PORT || 3000, function () {
  console.log('Express server running on port', server.address().port);
});
