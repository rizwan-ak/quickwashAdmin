import React, { Component } from "react";
import Header from "../components/Header";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import { connect } from "react-redux";

import { v4 } from "uuid";

import FB from "../firebase";

class Drivers extends Component {
  state = {
    drivers: [],
    name: "",
    ratings: "",
    showAdd: false,
    image: "",
  };

  componentDidMount() {
    this.getDrivers();
  }

  getDrivers = async () => {
    await FB.getDrivers((v) => this.setState({ drivers: v }));
  };

  onDelete = async (id) => {
    if (window.confirm(`Do you really want to delete this voucher?`)) {
      await FB.deleteDriver(id);
    }
  };

  onSubmit = async () => {
    const id = v4();
    const { name, ratings, file, image } = this.state;
    await FB.setDriversPic(file, id, async (image) => {
      this.setState({ image });
      await FB.setDrivers({ name, ratings, id, image }, id);
    });
    this.setState({ name: "", ratings: "", showAdd: false });
  };

  render() {
    const { name, showAdd, drivers, file } = this.state;
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Drivers</h1>
            </Card.Header>
            <Card.Body>
              {drivers.map((d) => (
                <Row key={d.id} className="mt-3">
                  <Col xs={2} className="text-center">
                    <Image
                      roundedCircle
                      style={{ height: "50px" }}
                      src={d.image ? d.image : "https://via.placeholder.com/50"}
                    />
                  </Col>
                  <Col xs={4}>
                    <Form.Control size="lg" value={d.name} disabled />
                  </Col>
                  <Col xs={4}>
                    <Form.Control
                      size="lg"
                      as="select"
                      value={d.ratings}
                      onChange={async (e) =>
                        await FB.changeDriversRatings(e.target.value, d.id)
                      }
                    >
                      <option>5.0</option>
                      <option>4.0</option>
                      <option>3.0</option>
                      <option>2.0</option>
                      <option>1.0</option>
                    </Form.Control>
                  </Col>
                  <Col xs={2}>
                    <Button
                      block
                      size="lg"
                      variant="danger"
                      onClick={() => this.onDelete(d.id)}
                    >
                      Delete
                    </Button>
                  </Col>
                </Row>
              ))}

              {showAdd ? (
                <Row className="mt-5">
                  <Col xs={6} className="text-center">
                    <label
                      htmlFor="upload-photo"
                      className="btn btn-lg btn-block btn-warning text-white"
                    >
                      Upload Driver's Profile Pic
                    </label>
                    <span>{file?.name}</span>
                    <Form.Control
                      id="upload-photo"
                      className="btn btn-primary d-none"
                      accept="image/*"
                      onChange={(e) =>
                        this.setState({ file: e.target.files[0] })
                      }
                      type="file"
                    />
                  </Col>
                  <Col xs={6}>
                    <Form.Control
                      size="lg"
                      value={name}
                      placeholder="Driver's Name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </Col>
                  <Button
                    block
                    className="mt-5"
                    size="lg"
                    variant="primary"
                    onClick={this.onSubmit}
                  >
                    ADD
                  </Button>
                </Row>
              ) : (
                <div className="text-center mt-5">
                  <Button
                    className="rounded-circle"
                    size="lg"
                    variant="primary"
                    onClick={() => this.setState({ showAdd: true })}
                  >
                    <h3>+</h3>
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}

export default connect((state) => state)(Drivers);
