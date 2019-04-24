import React, { Component } from "react";
import SimpleSchema from "simpl-schema";
import { withTracker } from "meteor/react-meteor-data";
import { Patient } from "../api/patient";
import axios from "axios";
import { Card, message, Row, Col } from "antd";
import { AutoForm, SelectField, DateField, LongTextField } from "uniforms-antd";
import SubmitField from "uniforms-antd/SubmitField";
import AutoField from "uniforms-antd/AutoField";

export class CreateInvoice extends Component {
  state = {
    doctors: []
  };
  submitHandler = doc => {
    Meteor.call("invoice.insert.new", doc, err => {
      if (err) {
        message.error(err.reason);
      } else {
        message.success("Saved Successfully");
        this.props.close();
      }
    });
  };
  componentWillMount() {
    axios
      .get("./doctors.json") // JSON File Path
      .then(response => {
        const newD = [];
        response.data.map(a => {
          newD.push(a.first_name + " " + a.last_name);
        });
        this.setState({
          doctors: newD
        });
        console.log("datae", newD);
      })
      .catch(function(error) {
        console.log(error);
      });

  }
  render() {
    console.log("Did we get the patients", this.props.thePatients)

    const Schema = new SimpleSchema({
      doctor: {
        type: String,
        allowedValues: this.state.doctors,
        label : "Treating Doctor"
      },
      patient: {
        type: String,
        allowedValues: this.props.thePatients,
        label : "Patient"
      },
      dueDate: {
        type: Date,
        label: "Payment Due Date"
      },
      items: {
        type: Array,
      },
      'items.$' :{
     type : Object,
      },
          'items.$.name': {
            type: String
          },
          'items.$.price': {
            type: Number
          }
        
      
    });

    return (
      <Card loading={!this.props.isIt}>
        <AutoForm
          placeholder
          onSubmitSuccess={() => {
            console.log("sucess");
          }}
          onSubmitFailure={() => {
            this.setState({ loading: false });
            message.error("Something Went Wrong.");
          }}
          onSubmit={doc => {
            this.setState({ loading: true });
            this.submitHandler(doc);
          }}
          schema={Schema}
          className="ant-form"
        >
        <Row>
            <Col span={11}>
            <SelectField name="doctor" />

            </Col>
            <Col span={2} />
            <Col span={11}>
            <SelectField name="patient" />

            </Col> 
         
            <Col span={24}>
          <AutoField name="items" />
            </Col>
            <Col span={24}>
            <DateField name="dueDate" />

            </Col>
            <Col span={12}>
            <SubmitField name="save" />

            </Col>
        </Row>
        </AutoForm>
      </Card>
    );
  }
}

const Wrapper = withTracker(props => {
  const status = Meteor.subscribe("getPatients");
  const data = Patient.find({}).fetch() || [];
  console.log("Got data", data);
  const ready = status.ready();
  const patients = [];
  if (ready) {
    data.map(a => patients.push(a.firstName + " " + a.lastName));
  }
  console.log("it is", patients);
  return {
    ...props,
    patients,
    ready
  };
})(CreateInvoice);

export default Wrapper;
