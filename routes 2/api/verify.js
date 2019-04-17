const router = require("express").Router();
const signinController = require("../../controllers/signinController");

// Matches with "/api/books"
router.route("/")

  .get(signinController.verify)
  

module.exports = router;