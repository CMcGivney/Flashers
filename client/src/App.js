import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import {AuthProvider} from "./context/auth.js";
// import AuthRoute from './util/AuthRoute'

import Home from "./pages/Home.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import NavBar from "./components/NavBar.js";
import SingleFlash from './pages/SingleFlash'
import Landing from './pages/Landing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/flashes/:flashId" component={SingleFlash} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
