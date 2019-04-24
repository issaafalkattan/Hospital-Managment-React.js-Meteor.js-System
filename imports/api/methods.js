import { Patient } from './patient';
import { Appointment } from './appointment';
import { Invoice } from './invoice';
Meteor.methods({
    'patients.insert.new'(data) {
        if (data._id) {
            let patient = Patient.findOne({});
            Object.keys(data).map((a) => 
                 (patient[a] != data[a] ? 
                    patient[a] = data[a] : null)
                
            );

            patient.save();
        } else {
            const patient = new Patient(data);
            patient.save();
        }
    },
    'appointments.insert.new'(data) {
        if (data._id) {
            let patient = Appointment.findOne({});
            Object.keys(data).map((a) => 
                 (patient[a] != data[a] ? 
                    patient[a] = data[a] : null)
                
            );

            patient.save();
        } else {
            const patient = new Appointment(data);
            patient.save();
        }
    },
    'appointments.remove'(id){
        Appointment.remove({_id : id});
    },
    'appointments.search'(id){
        
        return Appointment.findOne({_id : id});
    }, 
    'invoice.insert.new'(data) {
        if (data._id) {
            let patient = Invoice.findOne({});
            Object.keys(data).map((a) => 
                 (patient[a] != data[a] ? 
                    patient[a] = data[a] : null)
                
            );

            patient.save();
        } else {
            const patient = new Invoice(data);
            patient.createdDate = new Date();
            patient.save();
        }
    },
    'invoice.search'(id){
        
        return Appointment.Invoice({_id : id});
    }
    
});