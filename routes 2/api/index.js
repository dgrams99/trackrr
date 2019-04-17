const router = require("express").Router();
const employeeRoutes = require("./employees");
const FindEmployee = require("./findEmployee");
const UpdateEmployer = require("./updateEmployer");
const signupRoutes = require("./signin");
const signinRoutes = require("./signinReal");
const verify = require("./verify");



// Book routes
// router.use("/employee/:UserToken", employeeRoutes);
router.use("/employee", employeeRoutes);

router.use("/employee/update", UpdateEmployer);

router.use("/employee/find", FindEmployee);

router.use("/account/signup", signupRoutes);

router.use("/account/signin", signinRoutes);

router.use("/account/verify", verify);

router.use("/account/logout", verify);


module.exports = router;
