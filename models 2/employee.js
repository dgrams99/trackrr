const mongoose = require("mongoose");
const Employer = require('./user')
const Schema = mongoose.Schema;


const employeeSchema = new Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  UserToken: {type: String},
  Reason: {type: String}

});




const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
