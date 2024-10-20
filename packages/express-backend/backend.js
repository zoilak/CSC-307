// backend.js
import express from "express"; //we import the Express module. Express will work as an HTTP middleware dispatching HTTP calls to the routes we define in the file and also sending back responses that we'll program.

const app = express(); //create an instance of Express and define a constant to represent the port number we'll use to listen to incoming HTTP requests.
const port = 3000;

app.use(express.json()); //et up our express app to process incoming data in JSON format. With that, Express (as a middleware) will allow us to access JSON data seamlessly in memory.

app.get("/", (req, res) => { //first API endpoint; / is the URL pattern that will map to the function
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});