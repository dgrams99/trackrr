const router = require("express").Router();
const Daily = require("../../controllers/DailyTaskController");

router.route("/:id")
.post(Daily.create)
.get(Daily.findById)



module.exports = router;