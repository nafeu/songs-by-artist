import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home';
import About from './pages/about';
import Navigation from './components/navigation';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Navigation/>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </React.Fragment>
    </Router>
  )
}

export default App;
