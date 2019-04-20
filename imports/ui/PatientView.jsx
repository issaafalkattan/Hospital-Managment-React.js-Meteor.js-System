import React, { Component } from "react";
import { MDBCol, MDBIcon, MDBRow, MDBSpinner, MDBBadge } from "mdbreact";
import { Spin } from "antd";
import { Appointment , Appointments} from "../api/appointment";
import { withTracker } from "meteor/react-meteor-data";

class componentName extends Component {
  state = {
    value: ""
  };
  findToken = val => {
    const data = Appointment.findOne({ _id: val });
    if (data) {
      this.setState({ data: data });
    } else {
      this.setState({ data: "No" });
    }
  };
getText = () =>{
  let record = this.state.data
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
  
}
  render() {
    return (
      <div className="greenBg">
      <h3 style={{textAlign : "center", fontStyle : 'Italics'}}>AAIL Hospital Appointments</h3>
        <MDBRow style={{ paddingTop: "10%" }}>
          <MDBCol md="3" />
          <MDBCol md="6">
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
          <MDBCol md="3" />
        </MDBRow>
        <MDBRow>
          <MDBCol md="3" />
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
                    <strong>{this.state.data.patient}</strong> with Dr. <mark>
                    {this.state.data.doctor}</mark> is <strong>{this.getText()}</strong>
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
      </div>
    );
  }
}

const Wrapper = withTracker(props => {
  const status = Meteor.subscribe("getApp");

  const ready = status.ready();

  return {
    ...props,

    ready
  };
})(componentName);

export default Wrapper;
