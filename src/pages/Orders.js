import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class Orders extends Component {
  componentDidMount() {
    this.orders();
  }
  orders = async () => {
    const data = await FB.getOrders();
    this.props.getOrders(data);
  };
  render() {
    console.log(this.props.orders);
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Orders</h1>
            </Card.Header>
            <Card.Body>
              <Card.Text className="mt-4">
                <Table responsive striped hover>
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
                  <tbody>
                    {this.props.orders.map((o) => (
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
                            <option>delivered</option>
                            <option>delivering</option>
                            <option>folding</option>
                            <option>drying</option>
                            <option>washing</option>
                            <option>picked up</option>
                            <option>picking up</option>
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
export default connect((state) => state, { getOrders: AC.getOrders })(Orders);
