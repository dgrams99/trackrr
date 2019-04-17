const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user_id: {
      type: String,
      default: ''
  },
  Content: {
      type: String,
  },
  When: {
      type: String,
  },
  Done: {
      type: Boolean,
  },
 
});

const Tasks = mongoose.model("Tasks", TaskSchema);
 
module.exports = Tasks;