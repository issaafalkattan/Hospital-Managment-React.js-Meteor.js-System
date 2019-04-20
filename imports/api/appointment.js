import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import SimpleSchema from 'simpl-schema';

export const Appointments = new Mongo.Collection('appointments');

export const Appointment = Class.create({
  name: 'Appointment',
  collection: Appointments,

  fields: {

   doctor :{
       type: String,
   },
   patient : {
       type : String,
   },
   date : {
       type : Date
   },
   reason:{
       type : String,
   },
   status :{
       type : String,
       default: 'In Progress'
   },
   
},
meteorMethods: {
  cancel(){
      this.status = "Cancelled";
      this.save();
  },
  approve(){
    this.status = "Approved";
    this.save();
  },

}
  });
  