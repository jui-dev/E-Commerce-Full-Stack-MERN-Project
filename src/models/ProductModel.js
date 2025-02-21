const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "products" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    title: { type: String, required: true }, // title = column name.
    shortDes: { type: String, required: true },
    price: { type: String, required: true },
    discount: { type: Boolean, required: true },
    discountPrice: { type: String, required: true },
    image: { type: String, required: true },
    star: { type: String, required: true },
    stock: { type: Boolean, required: true },
    remark: { type: String, required: true },
    categoryID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key. || this will be object type.
    brandID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key. || this will be object type.
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const ProductModel = mongoose.model("products", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "products" is the name of the collection that is being created at the mongodb compass.
module.exports = ProductModel; // 4. exporting the ProductModel so that we can use that in other files as well.

// model >> controllers >> services >> api.js
