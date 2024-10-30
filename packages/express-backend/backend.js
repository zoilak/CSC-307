// backend.js
import express from "express"; //we import the Express module. Express will work as an HTTP middleware dispatching HTTP calls to the routes we define in the file and also sending back responses that we'll program.
import cors from "cors";


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

app.use(cors()) //This will allow our backend to respond to calls coming from a different origin.
app.use(express.json()); //et up ou

const findUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
};
 
const findUserById = (id) =>
    users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
    users["users_list"].push(user);
    return user;
  };
  

function generateUniqueId() {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
}  
// express app to process incoming data in JSON format. With that, Express (as a middleware) will allow us to access JSON data seamlessly in memory.

app.get("/", (req, res) => { //first API endpoint; / is the URL pattern that will map to the function
  res.send("Hello World!");
  console.log("working");
});

app.get("/users", (req, res) => {
//     res.send(users);
//   });
    const name = req.query.name;
    if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
    } else {
    res.send(users);
    }
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
      res.status(404).send("Resource not found.");
    } else {
      res.send(result);
    }
  });

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  const index = users["users_list"].findIndex((user) => user.id === id);

  if (index === -1) {
      res.status(404).send("Resource not found.");
  } else {
      users["users_list"].splice(index, 1); // Remove the user from the list
      res.status(204).send(); // Respond with 204 No Content
  }
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateUniqueId();
    addUser(userToAdd);
    res.status(201).json(userToAdd);
  });


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});