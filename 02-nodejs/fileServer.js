/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const filesFolder = path.join(__dirname, "./files");

app.get("/files", (req, res) => {
  fs.readdir(filesFolder, (err, files) => {
    if (err) {
      console.log("error in displaying files");
      res.sendStatus(404);
    } else {
      console.log("files are displaying at local host 3000");
      res.json(files);
    }
  });
});


// this code is not working 
app.get('/file/:filename', (req, res) => {
  const filepath = path.join(__dirname, './files/', req.params.filename);
  
  fs.readFile(filepath, "utf-8", (err, data) => {
    if (err) {
      console.log("Error in reading the file:", err);
      res.sendStatus(404);
    }
    console.log("files are read ");
    res.send(data);
  });
});


app.all('*', (req, res) => {
  res.status(404).send('Route not found');
});


app.listen( 3000, started );
function started(){
  console.log("started at 3000");
}

module.exports = app;
