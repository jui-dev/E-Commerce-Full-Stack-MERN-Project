const {
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
} = require("../services/UserServices");

// 1. User OTP function.
exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req); // call the "UserOTPService"
  return res.status(200).json(result);
};

// 2. Verify Login function || will use this in the "api.js" || will set the token in both response header and response cookies.
exports.VerifyLogin = async (req, res) => {
  let result = await VerifyOTPService(req); // call the "VerifyOTPService" and storing the response in the "result" variable.

  // if the user is verified / token is generated / encoded then we will set the token in the "cookies".
  // [status] is inside "UserService.js"'s return.
  if (result["status"] === "success") {
    // Cookies Option
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 6060 * 1000), // when the cookie is going to expire. || current date + 24 hour. ( 1000 for milliseconds )
      httpOnly: false,
    };

    // Set Cookies With Response
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};
//----------- user logout ( expire the cookie )-----------//
// 3. user log out function.
exports.UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000), //  current date - 24 hour. ( 1000 for milliseconds ) = invalid cookie. that means user is logged out.
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};
//-------------- user create profile ( call the "SaveProfileService" from the services )---------------//
// 4. create profile function.
exports.CreateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};
//-------------- user Update profile ( call the "SaveProfileService" from the services ) ---------------//
// 5. update profile function.
exports.UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};
//-------------- user read profile ( call the "ReadProfileService" from the services ) ---------------//
// 6. read profile function.
exports.ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req); // Import this "ReadProfileService" at the top.
  return res.status(200).json(result);
};
