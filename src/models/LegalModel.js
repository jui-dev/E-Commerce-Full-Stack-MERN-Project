const mongoose = require("mongoose");
//  creating Dataschema.
const DataSchema = mongoose.Schema(
  {
    type: { type: String, unique: true, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);
const LegalModel = mongoose.model("legals", DataSchema); // "legals" = is the collection name of the Database.
module.exports = LegalModel;
