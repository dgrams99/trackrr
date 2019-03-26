const router = require("express").Router();
const TaskController = require("../../controllers/TaskController");

router.route("/:id")
.post(TaskController.create)
.get(TaskController.findById)






module.exports = router;