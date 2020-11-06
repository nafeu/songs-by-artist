import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={Home} />
      </React.Fragment>
    </Router>
  )
}

export default App;
