const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "productsliders" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    title: { type: String, required: true }, // title = column name...
    des: { type: String, required: true },
    price: { type: String, required: true },
    img: { type: String, required: true },

    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // ( foreign key )
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const ProductSliderModel = mongoose.model("productsliders", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "productsliders" is the name of the collection that is being created at the mongodb compass.
module.exports = ProductSliderModel; // 4. exporting the ProductSliderModel so that we can use that in other files as well.

// model >> controllers >> services >> api.js
