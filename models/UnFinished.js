const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnfinishedSchema = new Schema({
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

const UnFinished = mongoose.model("UnFinished Tasks", UnfinishedSchema);
 
module.exports = UnFinished;