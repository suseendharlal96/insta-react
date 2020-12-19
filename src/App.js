import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Post from "./components/Posts/Post";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div style={{ position: "relative", top: "100px" }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
