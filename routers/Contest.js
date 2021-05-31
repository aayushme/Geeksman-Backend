const express = require("express");
const contestcontroller = require("../controllers/contest-controller");
const router = express.Router();
const middleware=require('../middleware/check-auth')
router.post(
  "/createcontest",middleware,
  contestcontroller.createcontest
);
router.get("/contests",contestcontroller.getallcontests);
router.get("/contest/:cid",contestcontroller.getcontest)
router.delete("/deletecontest/:cid",middleware,contestcontroller.deletecontest);
router.patch("/updatedetails/:cid",middleware,contestcontroller.updatecontest);

module.exports=router