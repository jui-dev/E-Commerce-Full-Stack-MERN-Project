const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "productdetails" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    img1: { type: String, required: true }, // img1 = column name...
    img2: { type: String, required: true },
    img3: { type: String, required: true },
    img4: { type: String, required: true },
    img5: { type: String },
    img6: { type: String },
    img7: { type: String },
    img8: { type: String },

    des: { type: String, required: true }, // des = column name...
    color: { type: String, required: true }, // color = column name...
    size: { type: String, required: true }, // size = column name...

    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // (foreign key) // productID = column name...
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const ProductDetailsModel = mongoose.model("productdetails", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "productdetails" is the name of the collection that is being created at the mongodb compass.
module.exports = ProductDetailsModel; // 4. exporting the ProductDetailsModel so that we can use that in other files as well.

// model >> controllers >> services >> api.js
