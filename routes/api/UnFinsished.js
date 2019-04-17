const router = require("express").Router();
const Completed = require("../../controllers/UnFinishedTasks");

router.route("/:id")
.post(Completed.create)
.get(Completed.findById)

module.exports = router;