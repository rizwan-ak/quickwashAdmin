import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class Dashboard extends Component {
  componentDidMount() {
    this.orders();
  }
  orders = async () => {
    const data = await FB.getOrders();
    this.props.getOrders(data);

    const users = await FB.getUsers();
    this.props.getUsers(users);

    await FB.getChats((chats) => this.props.getChats(chats));
  };
  render() {
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Dashboard</h1>
            </Card.Header>
            <Card.Body>
              <div className="m-5 d-flex flex-row justify-content-around">
                <Link to="/orders">
                  <div className="p-5 border shadow rounded text-center secondaryBg">
                    <h3>{this.props.orders.length}</h3>
                    <h3>Orders</h3>
                  </div>
                </Link>
                <Link to="/chat">
                  <div className="p-5 border shadow rounded text-center primaryBg">
                    <h3>{this.props.chats.length}</h3>
                    <h3>Messages</h3>
                  </div>
                </Link>
                <Link to="/users">
                  <div className="p-5 border shadow rounded text-center secondaryBg">
                    <h3>{this.props.users.length}</h3>
                    <h3>Users</h3>
                  </div>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}

export default connect((state) => state, {
  getOrders: AC.getOrders,
  getUsers: AC.getUsers,
  getChats: AC.getChats,
})(Dashboard);
