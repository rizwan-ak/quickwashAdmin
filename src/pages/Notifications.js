import React, { Component } from "react";
import Header from "../components/Header";
import { Button, Card, Container, Form } from "react-bootstrap";
import { connect } from "react-redux";

import AC from "../redux/actions/actionCreater";
import FB from "../firebase";

class Notifications extends Component {
  state = {
    title: "",
    content: "",
  };

  onSubmit = async () => {
    await FB.sendNotifications(this.state);
    this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Notifications</h1>
            </Card.Header>
            <Card.Body>
              <h5 className="text-center text-muted">Send Notification</h5>
              <Form.Control
                className="mt-5"
                placeholder="Title"
                size="lg"
                value={title}
                onChange={(e) => this.setState({ title: e.target.value })}
              />
              <Form.Control
                className="mt-5"
                placeholder="Body"
                size="lg"
                value={content}
                onChange={(e) => this.setState({ content: e.target.value })}
              />
              <Button
                block
                size="lg"
                className="mt-5"
                variant="primary"
                onClick={this.onSubmit}
              >
                Send Notification
              </Button>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}

export default connect((state) => state)(Notifications);
