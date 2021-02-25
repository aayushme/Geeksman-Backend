const RegisteredUser = require("../models/registeredUser");
const User = require("../models/User");
const Contest = require("../models/Contest");
const mongoose = require("mongoose");
const getUsers = async (req, res, next) => {
  let contestid = req.params.cid;
  let contestwithregisteredusers;
  try {
    contestwithregisteredusers = await Contest.findById(contestid).populate(
      "registeredusers"
    );
  } catch (error) {
    return res.status(404).json(error);
  }
  if (
    !contestwithregisteredusers ||
    contestwithregisteredusers.registeredusers.length === 0
  ) {
    return res
      .status(404)
      .json({ message: "There are no registered users uptil now." });
  }
  return res
    .status(200)
    .json({ data: contestwithregisteredusers.registeredusers });
};
const registerforcontest = async (req, res, next) => {
  let { uid, cid } = req.body;
  let contest, user;
  try {
    contest = await Contest.findById(cid);
    user = await User.findById(uid);
    if (user) {
      let registereduser = await RegisteredUser.findOne({ email: user.email });
      if (registereduser) {
        return res.json({
          message: "you are already registered.",
          registereduser,
        });
      }
    }
  } catch (e) {
    return res
      .status(404)
      .json({ error: "Could not register right now,please try again later" });
  }
  if (!contest) {
    return res
      .status(404)
      .json({
        error:
          "Could not find the contest that you are trying to register for,please try again later",
      });
  }
  if (!user) {
    return res
      .status(404)
      .json({ error: "Could not find the user,please try again later" });
  }
  let newuser = new RegisteredUser({
    Name: user.name,
    email: user.email,
    PhoneNo: user.phoneno,
    college: user.college,
    year: user.year,
    Branch: user.Branch,
    ContestId: cid,
  });
  await newuser.save();
  let totalslots = contest.Totalslots.length;
  let givenslot;

  if (contest.availableslot.length === 0) {
    let slotarray = new Array(totalslots).fill(0);
    contest.availableslot = slotarray;
  }
  try {
    for (let i = 0; i < totalslots; ++i) {
      if (contest.availableslot[i] < contest.slotstrength) {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        givenslot = i + 1;
        contest.availableslot[i] = contest.availableslot[i] + 1;
        newuser.slot.slotno = givenslot;
        newuser.slot.slotstarttime = contest.Totalslots[i].slotstarttime;
        newuser.slot.slotendtime = contest.Totalslots[i].slotendtime;
        newuser.contestname = contest.Contestname;
        await newuser.save({ session: sess });
        contest.registeredusers.push(newuser);
        user.usercontestdetail.push(newuser);
        await contest.save({ session: sess });
        await user.save({ session: sess });
        await sess.commitTransaction();
        break;
      }
    }
    if (givenslot) {
      var api_key = process.env.EMAIL_KEY;
      var domain = "geeksmanjcbust.in";
      var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
      var data = {
        from: "<cedept@geeksmanjcbust.in>",
        to: user.email,
        subject: "Thanks for Registering",
        html: `
          <h2>Dear ${user.name},<h2>
          <p>Thank you for registering to ${
            contest.Contestname
          } on GeeksCode by Geeksman-The Coding Society of JC Bose UST. Your registration has been received</p>
          <p>You registered with this email: ${user.email}.<p>
          Your designated slot is ${givenslot}
          Date and time of slot:-${
            contest.Totalslots[givenslot - 1].timeanddateofslot
          }
          <p>You can simply take the test by clicking at this link at you designated time slot.<a href="https://geeksmanjcbust.in/contests/${
            contest.Contestname
          }">Link</a>
          If you forgot your password, simply hit "Forgot password" and you'll be prompted to reset it.</p>
          If you have any questions leading up to the event, feel free to reply to cedept@geeksmanjcbust.in.<br>
          We look forward to seeing you on EVENT DATE!<br>
          Kind Regards,<br>
          Geeksman Family
          `,
      };
      mailgun.messages().send(data, function (error, body) {
        if (error) {
          console.log(error);
        }
        console.log(body);
      });
    }
    return res
      .status(200)
      .json({ message: "You have been registered,please check your email" });
  } catch (e) {
    return res.status(500).json({ error: e });
  }
};
const updatedetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const { Name, email, PhoneNo, branch, College, year } = req.body;

    let registereduser = await RegisteredUser.findOne({ _id });
    if (registereduser) {
      registereduser.Name = Name;
      registereduser.email = email;
      registereduser.PhoneNo = PhoneNo;
      registereduser.branch = branch;
      registereduser.College = College;
      registereduser.year = year;
      await registereduser.save();
      return res.status(201).json({ Success: "Update Successfull" });
    } else {
      return res.status(201).json({ Failure: "Please try again later" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};
module.exports = {
  getUsers,
  registerforcontest,
  updatedetails,
};
