import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class Deal extends Component {
  state = {
    deal: "",
  };

  componentDidMount() {
    this.getDeal();
  }

  getDeal = async () => {
    await FB.getDeal((deal) => this.setState({ deal }));
  };

  onSubmit = async () => {
    await FB.setDeal(this.state);
  };
  render() {
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Deal</h1>
            </Card.Header>
            <Card.Body>
              <h5 className="text-center text-muted">
                Change the deal that shows on the home screen of the app
              </h5>
              <Form.Control
                className="mt-5"
                size="lg"
                value={this.state.deal}
                onChange={(e) => this.setState({ deal: e.target.value })}
              />
              <Button
                block
                size="lg"
                className="mt-5"
                variant="primary"
                onClick={this.onSubmit}
              >
                Update
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}

export default connect((state) => state)(Deal);
