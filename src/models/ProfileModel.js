const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "profiles" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key ||  userID = column name...
    cus_add: { type: String },
    cus_city: { type: String },
    cus_country: { type: String },
    cus_fax: { type: String },
    cus_name: { type: String },
    cus_phone: { type: String },
    cus_postcode: { type: String },
    cus_state: { type: String },

    ship_add: { type: String },
    ship_city: { type: String },
    ship_country: { type: String },
    ship_name: { type: String },
    ship_phone: { type: String },
    ship_postcode: { type: String },
    ship_state: { type: String },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const ProfileModel = mongoose.model("profiles", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "profiles" is the name of the collection that is being created at the mongodb compass.
module.exports = ProfileModel; // 4. exporting the "ProfileModel" so that we can use that in other files as well.

// model >> controllers >> services >> api.js
