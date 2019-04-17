const router = require("express").Router();
const Completed = require("../../controllers/CompletedTaskController");

router.route("/:id")
.post(Completed.create)
.get(Completed.findById)

module.exports = router;