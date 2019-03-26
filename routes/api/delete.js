const router = require("express").Router();
const con = require("../../controllers/TaskController");

router.route("/:id")
.get(con.delete)



module.exports = router;