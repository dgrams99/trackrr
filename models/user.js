const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")
SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({

  email : {
      type: String,
      default: ''
  },
  password : {
      type: String,
      default: ''
  },
  Tasks: {
    type: Array,
  },
  isDeleted : {
      type: Boolean,
      default: false
  },

});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };



  
const User = mongoose.model("User", UserSchema);

module.exports = User;