import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../assets/greenLogo.png";

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-custom navbar-expand-lg navbar-light bg-white">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          ></button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul
              className="navbar-nav mr-auto sidenav h-100 bg-white shadow border"
              id="navAccordion"
            >
              <div className="nav-item active">
                <Link to="/dashboard">
                  <img
                    className="nav-logo"
                    style={{ width: 200, margin: "70px 40px" }}
                    src={logo}
                    alt=""
                  ></img>
                </Link>
                <div className="mx-3">
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link h5">
                      <span className="ml-2">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/orders" className="nav-link h5">
                      <span className="ml-2">Orders</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/chat" className="nav-link h5">
                      <span className="ml-2">Messages</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/pricing" className="nav-link h5">
                      <span className="ml-2">Pricing</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link h5">
                      <span className="ml-2">Users</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/vouchers" className="nav-link h5">
                      <span className="ml-2">Vouchers</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/deal" className="nav-link h5">
                      <span className="ml-2">Deal</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notifications" className="nav-link h5">
                      <span className="ml-2">Send Notifications</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/drivers" className="nav-link h5">
                      <span className="ml-2">Drivers</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link h5">
                      <span className="ml-2">Logout</span>
                    </Link>
                  </li>
                </div>
              </div>
            </ul>
          </div>
        </nav>
        <main className="content-wrapper">{this.props.children}</main>
      </div>
    );
  }
}
export default withRouter(Header);
