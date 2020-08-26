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
import Pricing from "./pages/Pricing";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

import FB from "./firebase";

class App extends React.Component {
  render() {
    (function () {
      setInterval(function () {
        navigator.geolocation
          ? navigator.geolocation.getCurrentPosition(
              async (val) => await FB.setLocation(val.coords)
            )
          : alert("Please allow browser to use your cuurent location.");
      }, 10000);
    })();

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
            <Route exact path="/pricing" component={Pricing} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
