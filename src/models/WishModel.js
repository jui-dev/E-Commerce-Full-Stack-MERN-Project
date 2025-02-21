const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "wishes" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    // we will supply productID from the frontend / postman.
    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || productID = column name || to determine which product has been added to the wish list.
    // userID is intacted with the token.
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || userID = column name || to determine which user has added the product in the wish list.
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const WishModel = mongoose.model("wishes", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "wishes" is the name of the collection that is being created at the mongodb compass.
module.exports = WishModel; // 4. exporting the WishModel so that we can use that in other files as well.

// (models -> "WishModel.js") >>  (services -> "WishListServices.js") >> (controllers -> "WishListController.js") >> routes -> "api.js"
