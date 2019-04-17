const router = require("express").Router();
const signupController = require("../../controllers/signinController");

// Matches with "/api/books"
router.route("/")
  .post(signupController.userSignin)
  




module.exports = router;