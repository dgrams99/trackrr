const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailySchema = new Schema({
  user_id: {
      type: String,
      default: ''
  },
  Content: {
      type: String,
  },
  When: {
      type: Date,
  },
  Done: {
      type: Boolean,
  },
 
});

const Daily = mongoose.model("Daily Tasks", DailySchema);
 
module.exports = Daily;