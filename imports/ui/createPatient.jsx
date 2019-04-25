import React, { Component } from 'react'
import { AutoForm } from 'uniforms-antd';
import {Schema} from '../api/patient';
import {message, Card} from 'antd';
import { withTracker } from 'meteor/react-meteor-data';
import { Patient} from '../api/patient'
import { navigate } from '@reach/router';
export class createPatient extends Component {
    submitHandler = (doc) => {
   
    Meteor.call("patients.insert.new", doc);
      };
  render() {
    return (
      <Card syle={{marginLeft: "5%",}}>
         <AutoForm
         model={this.props.data}
           placeholder
           onSubmitSuccess={() => { message.success('Saved Successfully', 1); navigate('/patients'); }}
           onSubmitFailure={() => { this.setState({ loading: false }); message.error('Something Went Wrong.'); }}
           onSubmit={(doc) => { this.setState({ loading: true }); this.submitHandler(doc); }}
           schema={Schema}
           className="ant-form"
         />
      </Card>
    )
  }
}

const Wrapper = withTracker((props) => {
    const id = props.id;
    console.log(id);
    const isUpdate = !!id;
   const status = Meteor.subscribe("getPatients");
   const data = id ? Patient.findOne({_id : id}) : {};
   console.log("Got data", data)
const ready = status.ready();
return{
    ...props,
    isUpdate,
    data,
    ready,
}

})(createPatient);

export default Wrapper;