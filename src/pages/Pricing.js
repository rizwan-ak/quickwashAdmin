import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Accordion, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import FB from "../firebase";
import AC from "../redux/actions/actionCreater";

class Pricing extends Component {
  state = {
    washAndFold: "",
    washAndIron: "",
    dryClean: "",
    premiumWash: "",
    weight1: "",
    weight2: "",
    weight3: "",
    weight4: "",
    day1: "",
    day2: "",
    day3: "",
    any: "",
    tide: "",
    surf: "",
    byo: "",
  };

  componentDidMount() {
    this.setState({
      ...this.props.prices,
    });
    this.prices();
  }
  prices = async () => {
    await FB.getPrices((prices) => this.props.getPrices(prices));
  };

  onChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onSubmit = async () => {
    await FB.setPrices(this.state);
    alert("Successfully updated prices");
  };

  render() {
    const {
      washAndFold,
      washAndIron,
      dryClean,
      premiumWash,
      weight1,
      weight2,
      weight3,
      weight4,
      day1,
      day2,
      day3,
      any,
      tide,
      surf,
      byo,
    } = this.state;

    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Pricing</h1>
            </Card.Header>
            <Card.Body>
              <Accordion defaultActiveKey="0">
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Services
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Wash & Fold</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="washAndFold"
                            value={washAndFold}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Wash & Iron</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="washAndIron"
                            value={washAndIron}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Dry Clean</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="dryClean"
                            value={dryClean}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <h5>Premium Wash</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="premiumWash"
                            value={premiumWash}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="1">
                    Weight
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>0 - 5 Kgs</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="weight1"
                            value={weight1}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>5 - 10 Kgs</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="weight2"
                            value={weight2}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>10 - 15 Kgs</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="weight3"
                            value={weight3}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <h5>15 - 20 Kgs</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="weight4"
                            value={weight4}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="2">
                    Deliver Days
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="2">
                    <Card.Body>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>1 day</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="day1"
                            value={day1}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>2 days</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="day2"
                            value={day2}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <h5>3 days</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="day3"
                            value={day3}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Accordion.Toggle as={Card.Header} eventKey="3">
                    Detergent
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="3">
                    <Card.Body>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Any</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="any"
                            value={any}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Tide</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="tide"
                            value={tide}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-3">
                          <h5>Surf</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="surf"
                            value={surf}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3">
                          <h5>BYO</h5>
                        </div>
                        <div className="col-9">
                          <Form.Control
                            type="number"
                            name="byo"
                            value={byo}
                            placeholder="Price"
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
              <Button
                variant="primary"
                size="lg"
                block
                className="mt-5"
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

export default connect((state) => state, { getPrices: AC.getPrices })(Pricing);
