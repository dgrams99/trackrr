const router = require("express").Router();
const signupController = require("../../controllers/signinController");

// Matches with "/api/books"
router.route("/")
  .get(signupController.logout)
  




module.exports = router;