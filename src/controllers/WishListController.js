const {
  WishListService,
  SaveWishListService,
  RemoveWishListService,
} = require("../services/WishListServices");

//--------------- 1. function to see wish list details ---------------//
exports.WishList = async (req, res) => {
  let result = await WishListService(req); // import "WishListService" at the top and call this method here.
  return res.status(200).json(result);
};

//---------------- 2. function to (create + update) wish list -----------------//
exports.SaveWishList = async (req, res) => {
  let result = await SaveWishListService(req); // import "SaveWishListService" at the top and call this method here.
  return res.status(200).json(result);
};

//------------ 3. function to remove wishlist -------------------//
exports.RemoveWishList = async (req, res) => {
  let result = await RemoveWishListService(req); // import "RemoveWishListService" at the top and call this method here.
  return res.status(200).json(result);
};
