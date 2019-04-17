const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompletedSchema = new Schema({
  user_id: {
      type: String,
      default: ''
  },
  Content: {
      type: String,
  },
  WhenCompleted: {
      type: Date,
  },
  
});

const Completed = mongoose.model("Completed Tasks", CompletedSchema);
 
module.exports = Completed;