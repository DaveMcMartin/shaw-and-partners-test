import React from "react";
import logo from "./logo.png";

function App() {
  return (
    <div className="min-h-full">
      <nav>
        <div className="w-full flex justify-center items-center border-b-2 border-gray-100 p-2">
          <img src={logo} className="h-16 w-16" alt="logo" />
          <p className="text-2xl text-gray-900 ml-4">Shaw and Partners - Take Home Test</p>
        </div>
      </nav>
    </div>
  );
}

export default App;
