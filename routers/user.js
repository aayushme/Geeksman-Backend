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
//not required by frontend
router.post("/resetpassword", usercontroller.resetPassword);
router.get("/users/getuser/:uid", usercontroller.getuserbyid);
router.get("/users",usercontroller.getallusers)
router.delete("/users/deleteuser/:uid", usercontroller.deleteuser);
router.patch("/users/updateuser/:uid", usercontroller.updateuser);
//required by frontend
router.post("/forgotpassword",usercontroller.forgotpass);
router.post("/getusercontests",usercontroller.getUserContest);
module.exports=router