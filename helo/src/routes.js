import React from "react";
import { Switch, Route } from "react-router-dom";

import Auth from "./Auth/Auth";
import Dashboard from "./Dashboard/Dashboard";
import Form from "./Form/Form";
import Post from "./Post/Post";

export default (
  <Switch>
    <Route exact path="/" component={Auth} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/post/:post_id" component={Post} />
    <Route path="/new" component={Form} />
  </Switch>
);
