const FeaturesModel = require("../models/FeaturesModel");
const LegalModel = require("../models/LegalModel");

//-------------------- func for feature list service || export this function at the end ------------------//
const FeaturesListService = async () => {
  try {
    //  import "FeaturesModel" at the top.
    let data = await FeaturesModel.find(); // call the find() method to get all the data.
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

//-------------------- func for legal detail service || export this function at the end ------------------//

const LegalDetailsService = async (req) => {
  try {
    let type = req.params.type; // catch the "type" from the request parameter.
    //  import "LegalModel" at the top.
    let data = await LegalModel.find({ type: type }); // using the "type" simply use the " find ()" query on the "LegalModel". || so according to the "type" the data will get selected.
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

module.exports = {
  LegalDetailsService,
  FeaturesListService,
};
