const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "invoiceproducts" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || userID = column name || to determine the invoice is for which user.
    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || productID = column name || to determine which product has been added to the invoice.
    invoiceID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || invoiceID = column name || to determine, for which invoice, the products are being listed
    qty: { type: String, required: true },
    price: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const InvoiceProductModel = mongoose.model("invoiceproducts", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "invoiceproducts" is the name of the collection that is being created at the mongodb compass.
module.exports = InvoiceProductModel; // 4. exporting the "InvoiceProductModel" so that we can use that in other files as well.
