const nodemailer = require("nodemailer"); // 1. import nodemailer.

// 2. send email
const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
  // 1st create a transporter. || call the  "createTransport()" method from the "nodemailer". || we need to set some properties inside this method.

  let transport = nodemailer.createTransport({
    host: ".......",
    port: 465,
    auth: { user: "........", pass: ".........." }, // "levi.arlo4455@gmail.com" using this we will send the email.
  });
  // email option.
  let mailOption = {
    from: "MERN Ecommerce Solution <levi.arlo4455@gmail.com>",
    to: EmailTo, // taking it from the parameter of "EmailSend" || we will get it from the postman url parameter. (UserOTP)
    subject: EmailSubject, // taking it from the parameter of "EmailSend"
    text: EmailText, // taking it from the parameter of "EmailSend"
  };

  return await transport.sendMail(mailOption); // the transporter will now send the email. || we need to use this "sendMail" function.
};

module.exports = EmailSend; // need to export this function.
