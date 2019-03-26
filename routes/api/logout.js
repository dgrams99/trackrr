const router = require("express").Router();
const signupController = require("../../controllers/signinController");


router.route("/")
  .get(signupController.logout)
  




module.exports = router;