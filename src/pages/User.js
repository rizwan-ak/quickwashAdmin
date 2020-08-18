import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Table, Form } from "react-bootstrap";
import dp from "../assets/dp.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class User extends Component {
  state = {
    user: "",
    orders: "",
  };

  componentDidMount() {
    this.setState({ user: this.props.location.user });
    this.orders();
  }

  orders = async () => {
    const data = await FB.getOrders();
    this.props.getOrders(data);
  };

  render() {
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">
                {this.state.user?.firstName} {this.state.user?.lastName}
              </h1>
            </Card.Header>
            <Card.Body>
              <Card.Text className="mt-4">
                <div className="d-flex">
                  <img
                    width="150px"
                    className="rounded-circle"
                    src={this.state.user?.image || dp}
                    alt=""
                  />
                  <div className="ml-5">
                    <h5 className="text-center">
                      <span className="font-weight-bold">Address : </span>
                      {this.state.user?.address || "N/A"}
                    </h5>
                    <h5 className="text-center">
                      <span className="font-weight-bold">Email : </span>
                      {this.state.user?.email || "N/A"}
                    </h5>
                    <h5 className="text-center">
                      <span className="font-weight-bold">Phone # </span>
                      {this.state.user?.phoneNo || "N/A"}
                    </h5>
                    {/* <h5 className="text-center">
                      <span className="font-weight-bold">Bank Details : </span>
                      N/A
                    </h5> */}
                  </div>
                </div>
                <Card.Header className="p-4 mt-5">
                  <h1 className="text-center">Previous Orders</h1>
                </Card.Header>

                {/* <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Search"
                  className="my-3"
                /> */}
                <Table responsive striped hover mt-5>
                  <thead>
                    <tr>
                      <th>Ordered By</th>
                      <th>Category</th>
                      <th>Delivery Date</th>
                      <th>Arrival Loacation</th>
                      <th>Delivery Location</th>
                      <th>Change Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  {this.props.orders.map((o) => (
                    <tbody key={o.id}>
                      {o.by === this.state.user?.id && (
                        <tr>
                          <td>{o.byName || "N/A"}</td>
                          <td>{o.category || "N/A"}</td>
                          <td>{o.date || "N/A"}</td>
                          <td>{o.arrivalLoc || "N/A"}</td>
                          <td>{o.deliveryLoc || "N/A"}</td>
                          <td>
                            <Form.Control
                              as="select"
                              value={o?.status}
                              size="sm"
                              onChange={async (e) =>
                                await FB.changeOrderStatus(e.target.value, o.id)
                              }
                            >
                              <option>Delivered</option>
                              <option>Delivering</option>
                              <option>Folding</option>
                              <option>Drying</option>
                              <option>Washing</option>
                              <option>Ordered Picked Up</option>
                              <option>Picking Up</option>
                            </Form.Control>
                          </td>
                          <td>
                            <Link
                              to={{
                                pathname: "/order",
                                order: o,
                              }}
                            >
                              More
                            </Link>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  ))}
                </Table>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}
export default connect((state) => state, { getOrders: AC.getOrders })(User);
