import React, { Component } from 'react'
import SimpleSchema from 'simpl-schema';
import { withTracker } from 'meteor/react-meteor-data';
import {Patient} from '../api/patient'
import axios from 'axios';
import {Card} from 'antd'
import { AutoForm, SelectField, DateField, LongTextField } from 'uniforms-antd';
import SubmitField from 'uniforms-antd/SubmitField';

export class CreateAppointment extends Component {
state={
    doctors :[]
}
submitHandler = (doc) => {
   
    Meteor.call("appointments.insert.new", doc);
      };
    componentWillMount() {
        axios.get('./doctors.json') // JSON File Path
          .then( response => {
              const newD = [];
              response.data.map(a => {
                  newD.push(a.first_name + " " + a.last_name)
              })
            this.setState({
            doctors: newD
          });
          console.log("datae", newD)
        })
        .catch(function (error) {
          console.log(error);
        });
       }
  render() {
    const Schema = new SimpleSchema({
        
       doctor :{
           type :String,
           allowedValues:this.state.doctors,

       },
       patient:{
        type :String,
        allowedValues:this.props.patients,


       },
       date : {
           type : Date,

       },
       reason :{
           type: String,
       }

      
      });
      
    return (
        <Card loading={!this.props.ready}>
        <AutoForm
          placeholder
          onSubmitSuccess={() => { message.success('Saved Successfully', 1); this.props.close(); }}
          onSubmitFailure={() => { this.setState({ loading: false }); message.error('Something Went Wrong.'); }}
          onSubmit={(doc) => { this.setState({ loading: true }); this.submitHandler(doc); }}
          schema={Schema}
          className="ant-form"
        >
        <SelectField name="doctor" />
        <SelectField  name="patient" />
        <DateField name="date" />
        <LongTextField name="reason" />
        <SubmitField name="save" />
        </AutoForm>
     </Card>
    )
  }
}


const Wrapper = withTracker((props) => {

   const status = Meteor.subscribe("getPatients");
   const data = Patient.find({}).fetch();
   console.log("Got data", data)
  const ready = status.ready();
  const patients =[];
  if(ready){
      data.map(a => patients.push(a.firstName + " " + a.lastName))
  }
return{
    ...props,
    patients,
    ready,
}

})(CreateAppointment);

export default Wrapper;