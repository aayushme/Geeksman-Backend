const express = require("express");
const contestcontroller = require("../controllers/contest-controller");
const router = express.Router();
router.post(
  "/createcontest",
  contestcontroller.createcontest
);
router.get("/contests",contestcontroller.getallcontests);
router.get("/contest/:cid",contestcontroller.getcontest)
router.delete("/deletecontest/:cid",contestcontroller.deletecontest);
router.patch("/updatedetails/:cid",contestcontroller.updatecontest);

module.exports=router