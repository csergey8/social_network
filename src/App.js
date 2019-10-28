import React from "react";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import { Route, BrowserRouter } from "react-router-dom";
import {  } from "react-router";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="content">
          <Route path="/profile" render={() => <Profile />} />
          <Route path="/dialogs" render={() => <Dialogs />} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
