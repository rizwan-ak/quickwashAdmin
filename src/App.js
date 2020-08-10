import React from "react";
import "./App.css";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import User from "./pages/User";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import Chat from "./pages/Chat";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/user" component={User} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path="/order" component={Order} />
          <Route exact path="/user" component={User} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
