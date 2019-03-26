import axios from "axios";

export default {
 
  saveUser: function(employeeData) {
    return axios.post("/api/account/signup", employeeData);
  },
  signIN: function(employeeData) {
    return axios.post("/api/account/signin", employeeData);
  },

  
};