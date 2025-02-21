// 1. import all the "ProductServices" methods from the "services" folder's "ProductServices.js" file.
// the functions we are going to create inside the controllers we need too export all of them and we are going to use use controller functions in the "api.js"
// inside each controller function we are going to call the services which we have initially imported in this file.

const {
  ListByFilterService,
  CreateReviewService,
  BrandListService,
  CategoryListService,
  SliderListService,
  ListByCategoryService,
  ListByBrandService,
  ListByRemarkService,
  ListBySimilarService,
  ListByKeywordService,
  DetailsService,
  ReviewListService,
} = require("../services/ProductServices");

//---------------------------------------------------------------------//

// 1. function to show all the (brands lists). // export the functions so that we can use the method inside "api.js"
exports.ProductBrandList = async (req, res) => {
  let result = await BrandListService(); // calling "BrandListService()".|| import at the top.
  return res.status(200).json(result);
};
// 2. function to show all the (categories lists).// export the functions so that we can use the method inside "api.js"
exports.ProductCategoryList = async (req, res) => {
  let result = await CategoryListService(); // calling "CategoryListService()".|| import at the top.
  return res.status(200).json(result);
};
// 3. function to show (slider lists) at the home page.// export the functions so that we can use the method inside "api.js"
exports.ProductSliderList = async (req, res) => {
  let result = await SliderListService(); // calling "SliderListService()".|| import at the top.
  return res.status(200).json(result);
};
//--------------------------------------------------------------------//
// 4. function to show (all the products lists by brand).// export the functions so that we can use the method inside "api.js"
exports.ProductListByBrand = async (req, res) => {
  let result = await ListByBrandService(req); // calling "ListByBrandService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};

// 5. function to show (all the products lists by category).// export the functions so that we can use the method inside "api.js"
exports.ProductListByCategory = async (req, res) => {
  let result = await ListByCategoryService(req); // calling "ListByCategoryService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};

// 6. function to show (all the similar products lists) .// export the functions so that we can use the method inside "api.js"
exports.ProductListBySimilar = async (req, res) => {
  let result = await ListBySimilarService(req); // calling "ListBySimilarService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};
// 7. function to (search the product). || user can search the product by keyword.// export the functions so that we can use the method inside "api.js"
exports.ProductListByKeyword = async (req, res) => {
  let result = await ListByKeywordService(req); // calling "ListByKeywordService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};
// 8. function to (show the products according to different remarks). ( new / latest ....)// export the functions so that we can use the method inside "api.js"
exports.ProductListByRemark = async (req, res) => {
  let result = await ListByRemarkService(req); // calling "ListByRemarkService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};
// 9. function to (show all the products lists by filtering).// export the functions so that we can use the method inside "api.js"
exports.ProductListByFilter = async (req, res) => {
  let result = await ListByFilterService(req); // calling "ListByFilterService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};
// 10. function to (show the product details).// export the functions so that we can use the method inside "api.js"
exports.ProductDetails = async (req, res) => {
  let result = await DetailsService(req); // calling "DetailsService()" and passing the request.|| import at the top.
  return res.status(200).json(result);
};

//----------------------------------- Reviews ------------------------------------//

// 11. function to (show users the review list of the product).// export the functions so that we can use the method inside "api.js".
exports.ProductReviewList = async (req, res) => {
  let result = await ReviewListService(req); // calling "ReviewListService()" and passing the request. || import at the top.
  return res.status(200).json(result);
};
// 12. function to (create review).// export the functions so that we can use the method inside "api.js"
exports.CreateReview = async (req, res) => {
  let result = await CreateReviewService(req); // import the "CreateReviewService" at the top and call this function here.
  return res.status(200).json(result);
};
