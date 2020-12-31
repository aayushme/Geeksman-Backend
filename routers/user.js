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
router.get("/:uid", usercontroller.getuserbyid);
router.get("/users",usercontroller.getallusers)
router.delete("/:uid", usercontroller.deleteuser);
router.patch("/:uid", usercontroller.updateuser);

module.exports=router