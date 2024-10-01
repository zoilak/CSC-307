// src/main.jsx
import React from "react";
import ReactDOMClient from "react-dom/client";
import MyApp from "./MyApp";
import "./main.css";

// function MyApp() {  // this is what is supposed to be rendered on screen
//   return (
//     <div>
//       <h1>Hello, React!</h1>
//     </div>
//   );
// }

// Create the container
const container = document.getElementById("root");

// Create a root
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the Root
root.render(<MyApp />);