// src/Table.jsx
import React from "react";

function TableHeader(){
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Click to delete</th>
            </tr>
        </thead>
    );
}


function TableBody(props) {
  //console.log("reached" + props.characterData)
  const rows = props.characterData.map((row, index) => {
    return (
      <tr key={index}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        
        <td>
          <button onClick={() => props.removeCharacter(index)}>
          Delete
          </button>
        </td>
      </tr>
    );
  }
  );
    return (
        <tbody>
          {rows}
        </tbody>
    );
}
  
function Table(props) {
  //console.log("reached" + props.characterData)
    return (
      <table>
        <TableHeader />
        <TableBody 
          characterData={props.characterData} 
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
}
  

export default Table;