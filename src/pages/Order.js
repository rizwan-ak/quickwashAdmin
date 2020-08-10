import React, { Component } from "react";
import Header from "../components/Header";
import { Card, Container } from "react-bootstrap";

export default class Order extends Component {
  render() {
    console.log(this.props.location.order);
    return (
      <Header>
        <Container>
          <Card>
            <Card.Header className="p-4">
              <h1 className="">Order</h1>
            </Card.Header>
            <Card.Body>
              <h5 className="">
                <span className="font-weight-bold">Category : </span>
                Wash & Fold
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Arrival on : </span>
                {this.props.location?.order?.date} -{" "}
                {this.props.location?.order?.time}
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Temprature : </span>
                {this.props.location?.order?.temprature || "N/A"}
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Arrival Place : </span>
                {this.props.location?.order?.arrivalLoc || "N/A"}
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Delivery Place : </span>
                {this.props.location?.order?.deliveryLoc || "N/A"}
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Weight : </span>
                {this.props.location?.order?.weight} (
                {this.props.location?.order?.weightPrice})
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Deivery days : </span>
                {this.props.location?.order?.deliveryDate} (
                {this.props.location?.order?.deliveryDatePrice})
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Detergent : </span>
                {this.props.location?.order?.detergent} (
                {this.props.location?.order?.detergentPrice})
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Note : </span>
                {this.props.location?.order?.note || "N/A"}
              </h5>
              <h5 className="">
                <span className="font-weight-bold">Status : </span>
                {this.props.location?.order?.status}
              </h5>
              <h3 className="mt-3 text-right">
                <span className="font-weight-bold">Total Bill : </span>
                {parseFloat(this.props.location?.order?.weightPrice) +
                  parseFloat(this.props.location?.order?.deliveryDatePrice) +
                  parseFloat(this.props.location?.order?.detergentPrice)}{" "}
                $
              </h3>
            </Card.Body>
          </Card>
        </Container>
      </Header>
    );
  }
}
