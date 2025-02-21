const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "carts" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // (foreign key) || productID = column name || to determine which product has been added.
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || userID = column name || to determine which user has added the product to the cart.
    color: { type: String, required: true },
    qty: { type: String, required: true },
    size: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const CartModel = mongoose.model("carts", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "carts" is the name of the collection that is being created at the mongodb compass.
module.exports = CartModel; // 4. exporting the CartModel so that we can use that in other files as well.

// >>> (model --> "CartModel.js") >>> (services ---> "CartListServices.js")  >>> (controllers --> "CartListController.js" ) >>> routes --> "api.js"

//for the cart list we will not collect the price from the front end. || for the security reasons we will not keep the product's price to the cart list.
