const express = require("express");
const { check } = require("express-validator");
const usercontroller = require("../controllers/user-controller");
const router = express.Router();
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usercontroller.signuphandler
);
router.post("/login", usercontroller.loginhandler);
router.get("/users/:uid", usercontroller.getuserbyid);
router.get("/users",usercontroller.getallusers)
router.delete("/users/:uid", usercontroller.deleteuser);
router.patch("/users/:uid", usercontroller.updateuser);
router.post("/users/forgotpassword", usercontroller.forgotpass);
router.post("/users/resetpassword", usercontroller.resetPassword);
router.post("/users/getusercontest", usercontroller.getUserContest);
module.exports=router