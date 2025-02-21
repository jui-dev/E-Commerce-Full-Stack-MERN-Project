const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "brands" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    brandName: { type: String, unique: true, required: true }, // brandName = column / field name.
    brandImg: { type: String, required: true }, // brandImg = column / field name.
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const BrandModel = mongoose.model("brands", DataSchema); // call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "brands" is the name of the collection that is being created at the mongodb compass.
module.exports = BrandModel; // 4. exporting the brand model so that we can use this "model" in other files as well.

// model >> controllers >> services >> api.js
