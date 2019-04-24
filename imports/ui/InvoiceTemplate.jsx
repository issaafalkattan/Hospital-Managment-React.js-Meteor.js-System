import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReactToPrint from "react-to-print";

class Template extends Component {
  state = {};

  render() {
    return (
      <table cellpadding="0" cellspacing="0">
        <tr class="top">
          <td colspan="2">
            <table>
              <tr>
                <td class="title">
                  <img
                    src="./logo2.png"
                    style={{ width: "100%", maxWidth: "300px" }}
                  />
                </td>

                <td>
                  Invoice #: 123
                  <br />
                  Created:{" "}
                  {moment(this.props.data.createdDate).format("DD/MM/YYYY")}
                  <br />
                  Due: {moment(this.props.data.dueDate).format("DD/MM/YYYY")}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="information">
          <td colspan="2">
            <table>
              <tr>
                <td>
                  Company: <br />
                  Patient: <br />
                  Treating Doctor:
                </td>

                <td>
                  AAIL
                  <br />
                  {this.props.data.patient}
                  <br />
                  {this.props.data.doctor}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr class="heading">
          <td>Payment Currency</td>

          <td>USD $</td>
        </tr>

        <tr class="details">
          <td>Status</td>

          <td>
            {this.props.data.status == "In Progress" ? (
              "Payment Due"
            ) : this.props.data.status == "Late" ? (
              <i class="far fa-clock"> Late Payment Due</i>
            ) : (
              <i class="fas fa-check"> Paid</i>
            )}
          </td>
        </tr>

        <tr class="heading">
          <td>Item</td>

          <td>Price</td>
        </tr>

        {this.props.data.items
          ? this.props.data.items.map(a => (
              <tr class="item">
                <td>{a.name}</td>

                <td>${a.price}</td>
              </tr>
            ))
          : null}
        {this.props.data.status == "Late" ? (
          <tr class="item">
            <td>Late Payment Fee</td>

            <td>${this.props.lateFee}</td>
          </tr>
        ) : null}
        <tr class="item last">
          <td>Tax (10%)</td>

          <td>${this.props.total * 0.1}</td>
        </tr>
        <tr class="total">
          <td />

          <td>
            Total: ${this.props.total} <br />
            Taxed Total: ${this.props.total + this.props.total * 0.1}
          </td>
        </tr>
      </table>
    );
  }
}
class InvoiceTemplate extends Component {
  calculateLateFee = () => {
    let fee = 0;
    if (this.props.data.status == "Late") {
      var now = moment(new Date()); //todays date
      var end = moment(this.props.data.dueDate); // another date
      var duration = moment.duration(now.diff(end));
      console.log("Late days", duration.days())
      fee = duration.days() * (this.calculateTotal() * 0.01);
    }
    return fee;
  };
  calculateTotal = () => {
    let total = 0;
    if (this.props.data.items) {
      this.props.data.items.map(a => {
        total += a.price;
      });
    }
    return total;
  };
  render() {
    return (
      <div class="invoice-box">
        <ReactToPrint
          trigger={() => <a href="#">Print this Invoice</a>}
          content={() => this.componentRef}
          pageStyle="width : 100%; textAlign : center; color :black; font-size : 30px"
        />
        <Template
          ref={el => (this.componentRef = el)}
          lateFee={this.calculateLateFee()}
          total={this.calculateTotal() + this.calculateLateFee()}
          data={this.props.data}
        />
      </div>
    );
  }
}

export default InvoiceTemplate;
