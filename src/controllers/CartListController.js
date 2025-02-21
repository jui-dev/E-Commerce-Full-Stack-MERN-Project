const {
  CartListService,
  RemoveCartListService,
  SaveCartListService,
  UpdateCartListService,
} = require("../services/CartListServices");

//-------------------- func to see the cart list ------------------//
exports.CartList = async (req, res) => {
  let result = await CartListService(req); // import the "CartListService" at the top and call this function here.
  return res.status(200).json(result);
};
//-------------------- func to create the cart list ------------------//
exports.SaveCartList = async (req, res) => {
  let result = await SaveCartListService(req); // import the "SaveCartListService" at the top and call this function here.
  return res.status(200).json(result);
};
//-------------------- func to update the cart list ------------------//
exports.UpdateCartList = async (req, res) => {
  let result = await UpdateCartListService(req); // import the "UpdateCartListService" at the top and call this function here.
  return res.status(200).json(result);
};
//-------------------- func to remove the cart list ------------------//
exports.RemoveCartList = async (req, res) => {
  let result = await RemoveCartListService(req); // import the "RemoveCartListService" at the top and call this function here.
  return res.status(200).json(result);
};
