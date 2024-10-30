// src/MyApp.jsx (empty state)
import  { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form"

//React Hook  We indicated that our useEffect hook should be called 
//only when the MyApp component first mounts by passing an 
//empty array [] as the second argument to useEffect


function MyApp() {
    //console.log("app found" + characters)
  const [characters, setCharacters] = useState([]);
   
  
  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function updateList(person) { 
    postUser(person)
    .then((res) => {
      if (res.status === 201) { // Check for 201 Created
        setCharacters([...characters, person]);
      } else {
        console.log("User not created, status:", res.status);
      }
    })
    .then((newUser) => {
      if (newUser) {
        setCharacters([...characters, newUser]); // Update state with the new user including ID
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

  function fetchUsers() {
      const promise = fetch("http://localhost:3000/users");
      return promise;
  }

  
  

  function postUser(person) {
    const promise = fetch("Http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function removeOneCharacter(index) {
    const userToRemove = characters[index];
    
    fetch(`http://localhost:3000/users/${userToRemove.id}`, {
        method: "DELETE",
    })
    .then((res) => {
        if (res.status === 204) { // Check for 204 No Content
            const updatedCharacters = characters.filter((character, i) => i !== index);
            setCharacters(updatedCharacters); // Update state if delete was successful
        } else if (res.status === 404) {
            console.log("User not found, unable to delete");
        } else {
            console.log("Failed to delete, status:", res.status);
        }
    })
    .catch((error) => {
        console.log("Error deleting user:", error);
    });
}

  return (
    <div className = "container">
      <Table 
        characterData={characters} 
        removeCharacter={removeOneCharacter}
      />
      <Form  handleSubmit= {updateList}/>
    </div>
  );


    
}

export default MyApp;