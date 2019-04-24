import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import SimpleSchema from 'simpl-schema';

export const Invoices = new Mongo.Collection('invoices');

export const Invoice = Class.create({
  name: 'Invoice',
  collection: Invoices,

  fields: {

   patient :{
       type: String,
   },
   doctor : {
       type : String,
   },
   createdDate : {
       type : Date
   },
   dueDate:{
   type : Date
   },
items : {
    type : [Object],
    fields : {
       name : {
           type : String,
       },
       price : {
           type : Number
       }
    }
},
   status :{
       type : String,
       default: 'In Progress'
   },
   
},
meteorMethods: {
  pay(){
      this.status = "Paid";
      this.save();
  },
  late(){
    this.status = "Late";
    this.save();
  },

}
  });
  