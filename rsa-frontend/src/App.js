import React from 'react';
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./routes/Home";

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
