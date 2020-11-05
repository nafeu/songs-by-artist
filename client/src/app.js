import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './pages/home';
import About from './pages/about';
import { MainContext, MainContextProvider } from './context/main';
import Navigation from './components/navigation';

function AppContainer() {
  return (
    <MainContextProvider>
      <App/>
    </MainContextProvider>
  );
}

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

export default AppContainer;
