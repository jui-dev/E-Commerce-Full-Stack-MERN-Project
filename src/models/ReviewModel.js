const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "reviews" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || productID = column name || to determine, the review is for which product.
    userID: { type: mongoose.Schema.Types.ObjectId, required: true }, // foreign key || userID = column name || to determine, which user has given that review.
    des: { type: String, required: true },
    rating: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const ReviewModel = mongoose.model("reviews", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "reviews" is the name of the collection that is being created at the mongodb compass.
module.exports = ReviewModel; // 4. exporting the ReviewModel so that we can use that in other files as well.
