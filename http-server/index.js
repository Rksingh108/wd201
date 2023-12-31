const http = require('http');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

// Use the supplied port or default to 3000
const port = argv.port ? parseInt(argv.port) : 3000;

// Read files asynchronously and store their content
fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

// Create an HTTP server
const server = http.createServer((request, response) => {
  let url = request.url;
  response.writeHeader(200, { "Content-Type": "text/html" });
  switch (url) {
    case "/project":
      response.write(projectContent);
      response.end();
      break;
    case "/registration":
      response.write(registrationContent);
      response.end();
      break;
    default:
      response.write(homeContent);
      response.end();
      break;
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
