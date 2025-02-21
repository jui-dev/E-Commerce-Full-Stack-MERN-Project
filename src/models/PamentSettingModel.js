const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "paymentsettings" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    store_id: { type: String, required: true },
    store_passwd: { type: String, required: true },
    currency: { type: String, required: true },
    success_url: { type: String, required: true },
    fail_url: { type: String, required: true },
    cancel_url: { type: String, required: true },
    ipn_url: { type: String, required: true },
    init_url: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const PaymentSettingModel = mongoose.model("paymentsettings", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "paymentsettings" is the name of the collection that is being created at the mongodb compass.
module.exports = PaymentSettingModel; // 4. exporting the "PaymentSettingModel" model so that we can use that in other files as well.
