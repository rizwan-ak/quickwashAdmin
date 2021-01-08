import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Table, Form } from "react-bootstrap";
import dp from "../assets/dp.png";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";
import { connect } from "react-redux";

class Users extends Component {
  state = {
    search: "",
  };
  componentDidMount() {
    this.orders();
  }
  orders = async () => {
    await FB.getUsers((users) => this.props.getUsers(users));
  };

  deltetUser = async (id, email) => {
    if (window.confirm(`Do you really want to delete ${email}?`)) {
      await FB.deleteUser(id);
    }
  };

  render() {
    let search = false;
    if (this.props.users) {
      search = this.props.users.filter(
        (t) =>
          t.firstName
            ?.toLowerCase()
            .includes(this.state.search.toLowerCase()) ||
          t.lastName?.toLowerCase().includes(this.state.search.toLowerCase()) ||
          t.email?.toLowerCase().includes(this.state.search.toLowerCase())
      );
    }

    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Users</h1>
            </Card.Header>
            <Card.Body>
              <Card.Title>
                <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => this.setState({ search: e.target.value })}
                />
              </Card.Title>
              <Card.Text className="mt-4">
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>phone Number</th>
                      <th>Address</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {search &&
                      search.map((u) => (
                        <tr key={u.id}>
                          <td>
                            <img
                              onClick={() =>
                                this.props.history.push({
                                  pathname: "/user",
                                  user: u,
                                })
                              }
                              width="50px"
                              className="rounded-circle pointer"
                              src={u.image ? u.image : dp}
                              alt=""
                            />
                          </td>
                          <td>{`${u.firstName} ${u.lastName}`}</td>
                          <td>{u.email}</td>
                          <td>{u.phoneNo || "N/A"}</td>
                          <td>{u.address || "N/A"}</td>
                          <td onClick={() => this.deltetUser(u.id, u.email)}>
                            <ion-icon
                              className="pointer"
                              name="close-outline"
                              size="large"
                              style={{ color: "red" }}
                            ></ion-icon>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}

export default connect((state) => state, { getUsers: AC.getUsers })(Users);
