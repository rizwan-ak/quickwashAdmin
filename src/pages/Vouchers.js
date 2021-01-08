import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";

import FB from "../firebase";

class Vouchers extends Component {
  state = {
    vouchers: [],
    code: "",
    discount: "",
    showAdd: false,
  };

  componentDidMount() {
    this.getVouchers();
  }

  getVouchers = async () => {
    await FB.getVouchers((v) => this.setState({ vouchers: v }));
  };

  onDelete = async (idx) => {
    if (window.confirm(`Do you really want to delete this voucher?`)) {
      const { vouchers } = this.state;
      const newVouchers = vouchers.filter((v) => vouchers.indexOf(v) !== idx);
      await FB.setVouchers(newVouchers);
    }
  };

  onSubmit = async () => {
    const { code, discount, vouchers } = this.state;
    vouchers.push({ code, discount });
    await FB.setVouchers(vouchers);
    this.setState({ code: "", discount: "", showAdd: false });
  };

  render() {
    const { showAdd, code, discount, vouchers } = this.state;
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="text-center">Vouchers</h1>
            </Card.Header>
            <Card.Body>
              {vouchers.map((v) => (
                <div key={vouchers.indexOf(v)} className="row m-3">
                  <div className="col-5">
                    <Form.Control value={v.code} size="lg" disabled />
                  </div>
                  <div className="col-5">
                    <Form.Control value={v.discount} size="lg" disabled />
                  </div>
                  <div className="col-2">
                    <Button
                      block
                      size="lg"
                      variant="danger"
                      onClick={() => this.onDelete(vouchers.indexOf(v))}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              {showAdd ? (
                <div className="row m-3 mt-5">
                  <div className="col-6">
                    <Form.Control
                      size="lg"
                      placeholder="Code"
                      value={code}
                      onChange={(e) =>
                        this.setState({ code: e.target.value.toUpperCase() })
                      }
                    />
                  </div>
                  <div className="col-6">
                    <Form.Control
                      type="number"
                      size="lg"
                      placeholder="Discount"
                      value={discount}
                      onChange={(e) =>
                        this.setState({ discount: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    block
                    className="mt-3"
                    size="lg"
                    variant="primary"
                    onClick={this.onSubmit}
                  >
                    ADD
                  </Button>
                </div>
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

export default connect((state) => state)(Vouchers);
