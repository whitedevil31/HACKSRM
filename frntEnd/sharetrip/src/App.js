import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Route/Login/Login";
import SignUp from "./Route/SignUp/SignUp";
import DashBoard from "./Route/DashBoard/DashBoard";
import CreatePost from "./Route/CreatePost/CreatePost";
import PostId from "./Route/PostId/PostId";
import Home from "./Route/Home/Home";
import About from "./Route/About/About";
import Contact from "./Route/Contact/Contact";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/users">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <DashBoard />
        </Route>
        <Route path="/post">
          <CreatePost />
        </Route>
        <Route path="/postId">
          <PostId />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
