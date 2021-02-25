const express = require("express");
const Eventcontroller = require("../controllers/FestEvent-controller");
const router = express.Router();
router.post(
  "/createEvent",
  Eventcontroller.createFestevent
);
router.get("/festevents",Eventcontroller.getevents);
router.get("/festevent/:eid",Eventcontroller.geteventbyid)
router.delete("/deletefestevent/:eid",Eventcontroller.deleteEvent);

module.exports=router