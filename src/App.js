import React from "react";
import MockApi from "./MockApi";
import "./AppStyles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  return (
    <div className="App">
      {/* back-ground animation */}
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <br />

          {/* mock API data */}
          <MockApi />
        </ul>
      </div>
    </div>
  );
}
