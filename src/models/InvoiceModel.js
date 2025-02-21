const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "invoices" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // (foreign key) || userID = column name || the invoice is for which user.
    payable: { type: String, required: true },
    cus_details: { type: String, required: true },
    ship_details: { type: String, required: true },

    tran_id: { type: String, required: true },
    val_id: { type: String, required: true },
    payment_status: { type: String, required: true },

    delivery_status: { type: String, required: true },

    total: { type: String, required: true },
    vat: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const InvoiceModel = mongoose.model("invoices", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "invoices" is the name of the collection that is being created at the mongodb compass.
module.exports = InvoiceModel; // 4. exporting the "InvoiceModel" so that we can use that in other files as well.

// >>> (model --> "InvoiceModel.js") >>> (services ---> "InvoiceServices.js") >>> (controllers --> "InvoiceController.js")  >>> routes --> "api.js"
