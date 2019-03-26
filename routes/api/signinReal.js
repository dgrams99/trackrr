const router = require("express").Router();
const signinController = require("../../controllers/signinController");

// Matches with "/api/books"
router.route("/")

  .post(signinController.userSignIN)
  

module.exports = router;