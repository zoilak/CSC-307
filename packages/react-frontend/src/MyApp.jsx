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
        .then(response => {
            if (response.status === 201) {
                response.json().then(newUser => {
                    setCharacters([...characters, newUser]); // not appending new user
                    console.log("characters: ", characters);
                    console.log("new: ", newUser);
                });                    
            } 
            else {
                throw new Error(`Post: Unexpected status code ${response.status}`);
            }
        })
        .catch((error) => {
            console.log(error);
        })
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
    fetch(`http://localhost:3000/users/${index}`, {
        method: "DELETE",
    })
    .then((res) => {
      if (res.status === 204) {
        const updated = characters.filter((character) => {
            return character._id !== index;
        });
        setCharacters(updated);
      } else {
        throw new Error(`Delete: Unexpected status code ${res.status}`);
      }
    })
    .catch((error) => {
        console.log(error);
    }) 
    }
      
  function fetchUsers() {
    const promise = fetch("http://localhost:3000/users");
    return promise;
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