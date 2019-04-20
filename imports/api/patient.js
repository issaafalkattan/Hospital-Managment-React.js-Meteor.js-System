import { Mongo } from 'meteor/mongo';
import { Class } from 'meteor/jagi:astronomy';

import SimpleSchema from 'simpl-schema';

export const Patients = new Mongo.Collection('patients');

export const Patient = Class.create({
  name: 'Patient',
  collection: Patients,

  fields: {

    firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	dateOfBirth: {
		type: Date,
	},

	address: {
		type: String,

	},

	phoneNumber: {
		type: String,
		optional: true,

	},

	email: {
		type: String,
		optional: true,

	},

	emergencyContact: {
		type: Object,
		optional: true,
        fields :{
            fullName : String,
            phoneNumber : String,
        }
	},

	gender: {
		type: String,

	},

	status: { // if patient dies or leaves hosptial, status changes to inactive or false
		type: Boolean,
		default: true, 
	},

	dateOfAdmission: {
		type: Date,
	},

	allergies: {
		type: [String],
		optional: true,
	},

	symptoms: {
		type: [String],
		

	},

	diagnosis: {
		type: String,
		

	},

	treatment: {
		type: String,
		
	},

	medication: {
		type: String,
		
	},
    
 
  },

});


export const Schema = new SimpleSchema({
    firstName: {
        type: String,
        label : "First Name"
	},

	lastName: {
        type: String,
        label : "Last Name"

	},

	dateOfBirth: {
        type: Date,
        label : "Date Of Birth"

	},

	address: {
        type: String,
        label : "Address"


	},

	phoneNumber: {
		type: String,
        optional: true,
        label : "Phone number"


	},

	email: {
		type: String,
        optional: true,
        label : "Emai"


	},
    emergencyContact: {
        type: Object,
        label : "Emergency Contact",
        optional : true,
    },
    "emergencyContact.fullName": {
     type : String,
     label:" Full Name"
    },
    "emergencyContact.phoneNumber": {
        type : String,
        label : "Phone"
       },

       gender: {
		type: String,

	},

	dateOfAdmission: {
        type: Date,
        label : "Date of Admission"
	},

	allergies: {
		type: Array,
		optional: true,
    },
    'allergies.$' :{
        type:String,
    },

	symptoms: {
		type: Array,
		

    },
    'symptoms.$':{
        type :String,
    },

	diagnosis: {
		type: String,
	    label : "Diagnosis"	
     
	},

	treatment: {
		type: String,
		
	},

	medication: {
		type: String,
		
	},
  
  
  });
  