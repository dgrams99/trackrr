const router = require("express").Router();


const Task = require("./Task");
const signupRoutes = require("./signin");
const signinRoutes = require("./signinReal");
const verify = require("./verify");
const logout = require("./logout");
const Delete = require("./delete");
const Daily = require("./Daily");




router.use("/task/daily", Daily);

router.use("/task/delete", Delete);

router.use("/account/task", Task);

router.use("/account/signup", signupRoutes);

router.use("/account/signin", signinRoutes);

router.use("/account/verify", verify);

router.use("/account/logout", logout);


module.exports = router;
