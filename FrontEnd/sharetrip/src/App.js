
import "./App.css";
import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Route/Login";
import SignUp from "./Route/SignUp";
import DashBoard from "./Route/DashBoard";
import CreatePost from "./Route/CreatePost";
import PostId from "./Route/PostId";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
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
