const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "users" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    email: { type: String, unique: true, required: true, lowercase: true }, // email = column name...
    otp: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const UserModel = mongoose.model("users", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "users" is the name of the collection that is being created at the mongodb compass.
module.exports = UserModel; // 4. exporting the UserModel so that we can use that in other files as well.

// model >> controllers >> services >> api.js
