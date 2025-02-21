const mongoose = require("mongoose"); // 1. import mongoose.
//  2. create a data schema. || here from "mongoose" we will call the "Schema" method. || inside this Schema() method we will set the definition of "features" collection.
const DataSchema = mongoose.Schema(
  // definitions
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
  },
  //  options.
  { timestamps: true, versionKey: false } // if we set the "timestamps" to true then automatically the "createAt" and "updateAt" these 2 fields will keep managing.
);
// 3. create a "model" from the "schema".
const FeaturesModel = mongoose.model("features", DataSchema); //  call the model() method from the "mongoose".|| inside the model() method provide the "collection name" and the "Data Schema". || here "features" is the name of the collection that is being created at the mongodb compass.
module.exports = FeaturesModel; // 4. exporting the "FeaturesModel" so that we can use that in other files as well.

//>>> (model --> "FeaturesModel.js") >>> ( services ---> "FeaturesServices.js" ) >>> ( controllers --> "FeaturesController.js") >>> routes --> "api.js"
