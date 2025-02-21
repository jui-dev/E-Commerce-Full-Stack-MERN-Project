const {
  FeaturesListService,
  LegalDetailsService,
} = require("../services/FeaturesServices");

//-------------------- func for feature list service-------------//
exports.FeaturesList = async (req, res) => {
  let result = await FeaturesListService(req); // import the "FeaturesListService" at the top and call this function here.
  return res.status(200).json(result);
};

//-------------------- func for legal detail service------------//
exports.LegalDetails = async (req, res) => {
  let result = await LegalDetailsService(req); // import the "LegalDetailsService" at the top and call this function here.
  return res.status(200).json(result);
};
