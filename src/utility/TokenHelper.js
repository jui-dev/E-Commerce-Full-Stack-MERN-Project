const jwt = require("jsonwebtoken"); // 1. import jsonwebtoken

//  function to encode token. || using this function we will create the token.
exports.EncodeToken = (email, user_id) => {
  let KEY = "123-ABC-XYZ"; // key to encode token. || the key we will use to encode the token we will use the same key to decode the toke.
  let EXPIRE = { expiresIn: "24h" }; // expire time || we need to set the expire time as object.
  let PAYLOAD = { email: email, user_id: user_id }; // PAYLOAD = the data we want to store inside the token. || in the entire application we will use the "user_id" as the primary key..
  return jwt.sign(PAYLOAD, KEY, EXPIRE); // sending the token. || using the "PAYLOAD" the token will be created. || KEY = the security key to encode and decode the token || EXPIRE = how long the token is going to work
};

// function to decode token. || take the "token" as parameter. || using this function we will decode the token.
exports.DecodeToken = (token) => {
  try {
    let KEY = "123-ABC-XYZ"; // key to decode token. || security key
    return jwt.verify(token, KEY); // we will decode the "token" using the security key "KEY". || and return that as output.
  } catch (e) {
    return null; // token decoding is failed.
  }
};
