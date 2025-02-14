
import {Patient} from '../imports/api/patient';
import {Appointment}from '../imports/api/appointment';
import '../imports/api/methods';
import { Invoice } from '../imports/api/invoice';
Meteor.startup(() => {
    
  
    if (Meteor.users.find({}).count() === 0) {
        console.log("Created account");
      Accounts.createUser({ username: 'nurse', password: 'nurse' });
      Accounts.createUser({ username: 'doctor', password: 'doctor' });


  
      
    }
  });
  Meteor.publish("getInvoices", () => {


    return Invoice.find({});
  })

  Meteor.publish("getPatients", () => {


    return Patient.find({});
  })
  Meteor.publish("getApp", () => {


    return Appointment.find({});
  })