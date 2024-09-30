import React from 'react';
import {HashRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
      <Router>
          <div className="App">
              <Routes>
                  <Route path="/" element={<Navigate to="/home" />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
