// backend.js
import express from "express"; //we import the Express module. Express will work as an HTTP middleware dispatching HTTP calls to the routes we define in the file and also sending back responses that we'll program.

const app = express(); //create an instance of Express and define a constant to represent the port number we'll use to listen to incoming HTTP requests.
const port = 3000;

const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

app.use(express.json()); //et up our express app to process incoming data in JSON format. With that, Express (as a middleware) will allow us to access JSON data seamlessly in memory.

app.get("/", (req, res) => { //first API endpoint; / is the URL pattern that will map to the function
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
    res.send(users);
  });



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});