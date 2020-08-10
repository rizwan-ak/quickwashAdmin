import React, { Component } from "react";
import logo from "../assets/greenLogo.png";
import { withRouter } from "react-router-dom";
import FB from "../firebase";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  onChange = async (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit = async () => {
    const id = await FB.signin(this.state.email, this.state.password);
    const res = await FB.isAdmin(id);
    res && this.props.history.push("/dashboard");
  };
  render() {
    return (
      <div className="bgGradient d-flex">
        <div className="container bg-light w-75 h-75 my-auto shadow-lg">
          <div className="row h-100">
            <div className="col-md-7 d-flex justify-content-center align-item-center">
              <img
                style={{ objectFit: "contain" }}
                className="w-50"
                src={logo}
                alt="Logo"
              />
            </div>
            <div className="col-md-5 primaryBg">
              <div className="m-5 text-white">
                <h1 className="pt-4">Sign in</h1>
                <div className="form-group">
                  <div className="input-group input-group-lg mt-5">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        <ion-icon name="mail-outline"></ion-icon>
                      </span>
                    </div>
                    <input
                      type="email"
                      value={this.state.email}
                      name="email"
                      onChange={this.onChange}
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>
                  <div className="input-group input-group-lg mt-3">
                    <div className="input-group-prepend">
                      <span
                        className="input-group-text"
                        id="inputGroup-sizing-lg"
                      >
                        <ion-icon name="lock-closed-outline"></ion-icon>
                      </span>
                    </div>
                    <input
                      type="password"
                      value={this.state.password}
                      name="password"
                      onChange={this.onChange}
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <button
                  style={{ borderRadius: "50px" }}
                  type="button"
                  className="btn btn-light px-3 float-right shadow"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
