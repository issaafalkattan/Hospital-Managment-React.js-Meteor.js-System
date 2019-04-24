import React, { Component } from "react";
import { MDBCol, MDBIcon, MDBRow, MDBSpinner, MDBBadge } from "mdbreact";
import { Spin } from "antd";
import { Appointment, Appointments } from "../api/appointment";
import { withTracker } from "meteor/react-meteor-data";
import { Invoice } from "../api/invoice";
import InvoiceTemplate from "./InvoiceTemplate";
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from "mdbreact";
import {navigate} from '@reach/router';
class componentName extends Component {
  state = {
    value: "",
    invoice: ""
  };
  findToken = val => {
    const data = Appointment.findOne({ _id: val });
    if (data) {
      this.setState({ data: data });
    } else {
      this.setState({ data: "No" });
    }
  };
  findInvoice = val => {
    const data = Invoice.findOne({ _id: val });
    if (data) {
      this.setState({ data2: data });
    } else {
      this.setState({ data2: "No" });
    }
  };
  getText = () => {
    let record = this.state.data;
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    if (record.date < today) {
      return <MDBBadge color="warning">Expired</MDBBadge>;
    } else {
      if (record.status == "In Progress") {
        return <MDBBadge color="success">In Progress</MDBBadge>;
      }
      if (record.status == "Cancelled") {
        return <MDBBadge color="danger">Cancelled</MDBBadge>;
      }
      if (record.status == "Approved") {
        return <MDBBadge color="primary">Approved</MDBBadge>;
      }
    }
  };
  getText2 = () => {
    if(this.state.data2){
    if (this.state.data2.status == "Late") {
      return <MDBBadge color="danger">Late Payment</MDBBadge>;
    } else if (this.state.data2.status == "In Progress") {
      return <MDBBadge color="primary">Payment In Progress</MDBBadge>;
    } else if (this.state.data2.status == "Paid") {
      return <MDBBadge color="success">Paid</MDBBadge>;
    }
  }
};
  render() {
    return (
      <div className="greenBg">
           <MDBBtn tag="a" size="lg" gradient="green" onClick={() => navigate("../")}>
        <MDBIcon icon="arrow-circle-left" size="3x" className="mr-2"/>
      </MDBBtn>
        <h3 style={{ textAlign: "center", fontStyle: "Italics" }}>
          <img
            src="./logo2.png"
            style={{ height: "250px", alignSelf: "center", marginTop : '-150px' }}
          />
        </h3>
        <MDBRow style={{}}>
          <MDBCol md="6">
            <h4>Appointment Search Tool</h4>
            <div className="input-group md-form form-sm form-1 pl-0">
              <div className="input-group-prepend">
                <span
                  className="input-group-text purple lighten-3"
                  id="basic-text1"
                >
                  <MDBIcon className="text-white" icon="search" />
                </span>
              </div>
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Please Enter your token to check appointment status"
                aria-label="Search"
                onChange={e => {
                  this.setState({ value: e.currentTarget.value });
                  this.findToken(e.currentTarget.value);
                }}
              />
            </div>
          </MDBCol>
          <MDBCol md="6">
            <h4>Invoice Search Tool</h4>

            <div className="input-group md-form form-sm form-1 pl-0">
              <div className="input-group-prepend">
                <span
                  className="input-group-text purple lighten-3"
                  id="basic-text1"
                >
                  <MDBIcon className="text-white" icon="search" />
                </span>
              </div>
              <input
                className="form-control my-0 py-1"
                type="text"
                placeholder="Please Enter your token to check get invoices"
                aria-label="Search"
                onChange={e => {
                  this.setState({ invoice: e.currentTarget.value });
                  this.findInvoice(e.currentTarget.value);
                }}
              />
            </div>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="6">
            {this.state.value ? (
              this.state.data ? (
                this.state.data == "No" ? (
                  <h4>
                    Sorry, no appointments were found for this token{" "}
                    <strong>Try again</strong>{" "}
                  </h4>
                ) : (
                  <div>
                    <h6>
                      The appointment for patient{" "}
                      <strong>{this.state.data.patient}</strong> with Dr.{" "}
                      <mark>{this.state.data.doctor}</mark> is{" "}
                      <strong>{this.getText()}</strong>
                    </h6>
                    <p>For more info, please contact us</p>
                  </div>
                )
              ) : (
                <Spin />
              )
            ) : null}
          </MDBCol>
          <MDBCol md="6">
            {this.state.invoice ? (
              this.state.data2 ? (
                this.state.data2 == "No" ? (
                  <h4>
                    Sorry, no invoices were found for this token{" "}
                    <strong>Try again</strong>{" "}
                  </h4>
                ) : (
                  <div>
                    <h6>
                      The invoice for patient{" "}
                      <strong>{this.state.data2.patient}</strong> with Dr.{" "}
                      <mark>{this.state.data2.doctor}</mark> is{" "}
                      <strong>{this.getText2()}</strong>
                      <MDBBtn
                        color="primary"
                        size="sm"
                        onClick={() =>
                          this.setState({ showIn: true, record: this.state.data2 })
                        }
                      >
                        Show Invoice
                      </MDBBtn>
                    </h6>
                    <p>For more info, please contact us</p>
                  </div>
                )
              ) : (
                <Spin />
              )
            ) : null}
          </MDBCol>
        </MDBRow>
        <MDBModal isOpen={this.state.showIn} fullHeight position="top">
          <MDBModalHeader
            toggle={() => this.setState({ showIn: false, record: [] })}
          >
            Invoice Creation
          </MDBModalHeader>
          <MDBModalBody>
            <InvoiceTemplate data={this.state.record} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn
              color="secondary"
              onClick={() => this.setState({ showIn: false, record: [] })}
            >
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

const Wrapper = withTracker(props => {
  const status = Meteor.subscribe("getApp");
  const status2 = Meteor.subscribe("getInvoices");

  const ready = status.ready();

  return {
    ...props,

    ready
  };
})(componentName);

export default Wrapper;
