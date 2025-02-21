const EmailSend = require("../utility/EmailHelper");
const UserModel = require("../models/UserModel");
const ProfileModel = require("../models/ProfileModel");

const { EncodeToken } = require("../utility/TokenHelper");

// 1. "UserOTPService" method. / Login || here we will generate the otp code and send that code to the email with which user has logged in. || call this inside "controllers/UserController.js"

const UserOTPService = async (req) => {
  try {
    let email = req.params.email; // catch the email from the postman request parameter. || we will send the email to this email address.
    let code = Math.floor(100000 + Math.random() * 900000); // generate a random 4 digit / 6 digit code.|| from 100000 to 900000

    let EmailText = `Your Verification Code is= ${code}`;
    let EmailSubject = "Email Verification";

    // EmailSend( to which address we are going to send the email , email text , email subject )
    await EmailSend(email, EmailText, EmailSubject); // call the "EmailSend" method || this method is created inside "../utility/EmailHelper" || import this "EmailSend" at the top.

    // from the "UserModel" call the updateONe() function || this "UserModel" is inside (../models/UserModel)
    await UserModel.updateOne(
      { email: email }, // 1st check whether the "email" address exists or not. if exists then using the "$set" operator we will set the code in the place of "otp".|| that's how we will insert the otp code inside the database.
      { $set: { otp: code } },
      { upsert: true } // if the user has never logged in before then we will insert. || "upsert: true" means inside the UserModel data will either be updated or created.
    );

    return { status: "success", message: "6 Digit OTP has been send" }; // return success message.
  } catch (e) {
    return { status: "fail", message: e }; // failed message
  }
};

// 2. "VerifyOTPService" method. || verify otp means logged in. || call this inside "controllers/UserController.js"
const VerifyOTPService = async (req) => {
  try {
    let email = req.params.email; // catch the "email" from the postman request url parameter.
    let otp = req.params.otp; // catch the "otp" from the postman request url parameter.

    //---------- User Count-----------------

    // 2.1. from the "UserModel" call the find() method . to check any user exists or not with the email and otp. if exists then what will be the counting.
    let total = await UserModel.find({
      email: email,
      otp: otp,
    }).countDocuments(); // from here we will get the total count. ( if any user with the exact otp and email exists or not ) || if the total = 1 that means the user exists.

    if (total === 1) {
      // 2.2 User ID Read  || if ( total = 1 ) that means if any user exists then select / get the "_id" from the database. || later on we will use this "_id" in different places as (foreign key).
      let user_id = await UserModel.find({ email: email, otp: otp }).select(
        "_id"
      );

      // 2.2.1 User Token Create || now will create a token and set the "email" and "_id" that we got from the db and set that in the token as a string.
      let token = EncodeToken(email, user_id[0]["_id"].toString()); // calling the "EncodeToken" function. || this EncodeTOken function is inside the ("../utility/TokenHelper")

      // 2.2.2 OTP Code Update To 0 ( once the token is generated / encoded that means the user is verified and now we will set the otp to 0 )
      await UserModel.updateOne({ email: email }, { $set: { otp: "0" } }); // using the email address update / set the otp code to 0.

      //-------- output ( this will be shown in the postman response ) ------------//
      return {
        status: "success",
        message: "Valid OTP",
        token: token, // the generated token as output.
        total: total,
      };
    } else {
      return { status: "fail", message: "Invalid OTP", total: total }; // if ( total is not 1) that means no user is available in the db with the provided "email" and "otp" . that means the user is not valid / unauthenticated user. || in this case no "token" will be generated.
    }
  } catch (e) {
    return { status: "fail", message: "Invalid OTP" };
  }
};

//==================================== user profile ================================//

//-------------- using this method we will (create and update) profile --------------//

const SaveProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user_id from the url's request header. || using this we will create profile.
    let reqBody = req.body; // catching the request body.
    reqBody.userID = user_id; // userID = this is inside the ProfileModel. || we are taking this "user id" from the request header.
    // import the "ProfileModel"
    await ProfileModel.updateOne(
      { userID: user_id }, // check if the "user_id" matches / exists.
      { $set: reqBody }, // for "update" we need to use this "$set"operator .
      { upsert: true } // using "upsert it will be easier for us to create and update the profile "
    );
    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

//-------------- using this method we will read profile --------------//
const ReadProfileService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user_id from the url's request header.
    // import the "ProfileModel"
    let result = await ProfileModel.find({ userID: user_id }); // call the find() method on the "ProfileModel" and if the user id matches then we will return the data.
    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

// ----- export all the service methods --------------//
module.exports = {
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
};
