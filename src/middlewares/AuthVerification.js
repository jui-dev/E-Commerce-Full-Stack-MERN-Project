const { DecodeToken } = require("../utility/TokenHelper");
module.exports = (req, res, next) => {
  //------------ Receive Token ( we will keep duel features) ---------------//
  let token = req.headers["token"]; // catching token from request Headers.
  if (!token) {
    token = req.cookies["token"]; // if we do not get the "token" from the request headers in that case we will try to get the "token" from request "cookies"
  }

  //------------------ Token Decode ---------------------//
  let decoded = DecodeToken(token); // after getting the token we will decode that using the "DecodeToken()" function. || this function is created inside the "../utility/TokenHelper.js"

  //--------------- Request Header Email+UserID Add ----------------//
  if (decoded === null) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" }); // if token decoding is failed in that case we will return this message.
  }
  //  if token is successfully decoded.
  else {
    let email = decoded["email"]; // get the "email" address from the decoded toke.
    let user_id = decoded["user_id"]; // get the "user_id" from the decoded toke.
    req.headers.email = email; // add the "email" with request headers.
    req.headers.user_id = user_id; // add the "user_id" with request headers.
    next(); // send the request to the next phase / stage .
  }
};
