const HttpError = require("../models/Http-error");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.split(" ")[1]; //authorization 'Bearer token'
    if (!token){
      throw new HttpError("Authentication failed!", 401);
    }
    const decodedToken = jwt.verify(token,process.env.JWTADMIN_KEY);
    // req.adminData = { adminid:decodedToken.adminid };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
