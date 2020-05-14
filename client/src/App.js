import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";

const App = () => (
   <div className="container mt-4 mb-5">
      <div className="card m-auto shadow" style={{ width: "50rem" }}>
         <div className="card-body">
            <h1 className="card-header text-center mb-4">
               <i className="fas fa-upload"> React File Upload</i>
            </h1>
            <FileUpload />
            <div className="card-footer mt-4 text-center">@ 2020</div>
         </div>
      </div>
   </div>
);
export default App;
