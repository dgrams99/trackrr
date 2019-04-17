const router = require("express").Router();
const employeeController = require("../../controllers/employeeController");

// Matches with ""
router.route("/")
  .post(employeeController.create)
  .get(employeeController.findForEmployerChange)
 // employee/:Usertoken/
router.route("/:UserToken")
  .get(employeeController.find);
  

module.exports = router;