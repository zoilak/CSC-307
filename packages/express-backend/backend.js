// backend.js
import express from "express"; //we import the Express module. Express will work as an HTTP middleware dispatching HTTP calls to the routes we define in the file and also sending back responses that we'll program.
import cors from "cors";
import userServices from "./user-services.js";

const app = express(); //create an instance of Express and define a constant to represent the port number we'll use to listen to incoming HTTP requests.
const port = 3000;

app.use(cors()) //This will allow our backend to respond to calls coming from a different origin.
app.use(express.json()); //et up ou


app.get("/", (req, res) => { //first API endpoint; / is the URL pattern that will map to the function
  res.send("Hello World!");
  console.log("working");
});

app.get("/users", (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  console.log(name, job);
  
  userServices.getUsers(name, job)
    .then(result => {
      res.send({ users_list: result });
    })
    .catch(error =>  {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.findUserById(id);
    .then(result => {
      if (result === undefined) {
        res.status(404).send("Resource not found.");
      } else {
        res.send({ users_list: result });
      }
    });
});

  app.delete("/users/:id", (req, res) => {
    const id = req.params["id"]; //or req.params.id
    userServices.deleteUser(id) 
      .then(result => {
        if (result) {
          console.log("Deleted user with id: ", id);
          res.status(204).send();
        } else {
          res.status(404).send("Resource not found.");
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      })
  });

  app.post("/users", (req, res) => {
    const userToAdd = req.body;
    userServices.addUser(userToAdd)
      .then(result => {
        res.status(201).send({ users_list: result });
      })
      .catch(error =>  {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
      });
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});