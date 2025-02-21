const express = require("express");
const ProductController = require("../controllers/ProductController"); // import "ProductController".
const UserController = require("../controllers/UserController");
const WishListController = require("../controllers/WishListController");
const CartListController = require("../controllers/CartListController");
const InvoiceController = require("../controllers/InvoiceController");
const FeaturesController = require("../controllers/FeaturesController");

const AuthVerification = require("../middlewares/AuthVerification"); // we need to use this to those tasks where user has to be logged in / verified.

const router = express.Router();

//========================================= Products ===========================================

router.get("/ProductBrandList", ProductController.ProductBrandList); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductBrandList" and setting the routing end point.
router.get("/ProductCategoryList", ProductController.ProductCategoryList); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductCategoryList" and setting the routing end point.
router.get("/ProductSliderList", ProductController.ProductSliderList); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductSliderList" and setting the routing end point.
router.get(
  "/ProductListByBrand/:BrandID",
  ProductController.ProductListByBrand
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListByBrand" and setting the routing end point. || need to send "BrandID" as url parameter.
router.get(
  "/ProductListByCategory/:CategoryID",
  ProductController.ProductListByCategory
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListByCategory" and setting the routing end point.|| need to send "CategoryID" as url parameter.
router.get(
  "/ProductListBySimilar/:CategoryID",
  ProductController.ProductListBySimilar
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListBySmilier" and setting the routing end point.|| need to send "CategoryID" as url parameter.
router.get(
  "/ProductListByKeyword/:Keyword",
  ProductController.ProductListByKeyword
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListByKeyword" and setting the routing end point.|| need to send "Keyword" as url parameter.
router.get(
  "/ProductListByRemark/:Remark",
  ProductController.ProductListByRemark
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListByRemark" and setting the routing end point.|| need to send "Remark" as url parameter.
router.get("/ProductDetails/:ProductID", ProductController.ProductDetails); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductDetails" and setting the routing end point.|| need to send "ProductID" as url parameter.
router.get(
  "/ProductReviewList/:ProductID",
  ProductController.ProductReviewList
); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductReviewList" and setting the routing end point.|| need to send "ProductID" as url parameter.

router.post("/ProductListByFilter", ProductController.ProductListByFilter); // calling the "ProductController" ( we need to import this) and from here calling the method "ProductListByFilter" and setting the routing end point.

//====================================================== User =====================================================

router.get("/UserOTP/:email", UserController.UserOTP); // calling the "UserController" ( we need to import this) and from here calling the method "UserOTP" and setting the routing end point.|| need to send "email" as url parameter.
router.get("/VerifyLogin/:email/:otp", UserController.VerifyLogin); // calling the "UserController" ( we need to import this) and from here calling the method "VerifyLogin" and setting the routing end point.|| need to send "email" and "otp" as url parameter.
router.get("/UserLogout", AuthVerification, UserController.UserLogout); // calling the "UserController" ( we need to import this) and from here calling the method "UserLogout" and setting the routing end point.|| the user can only logout if the user is already logged in. that's why we need to use "AuthVerification" middleware.
router.post("/CreateProfile", AuthVerification, UserController.CreateProfile); // calling the "UserController" ( we need to import this) and from here calling the method "CreateProfile" and setting the routing end point.|| the user can only "create profile" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.post("/UpdateProfile", AuthVerification, UserController.UpdateProfile); // calling the "UserController" ( we need to import this) and from here calling the method "UpdateProfile" and setting the routing end point.|| the user can only "UpdateProfile" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.get("/ReadProfile", AuthVerification, UserController.ReadProfile); // calling the "UserController" ( we need to import this) and from here calling the method "ReadProfile" and setting the routing end point.|| the user can only "ReadProfile" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.

//==================================================== Wish =======================================================
router.post("/SaveWishList", AuthVerification, WishListController.SaveWishList); // calling the " WishListController" ( we need to import this) and from here calling the method "SaveWishList" and setting the routing end point.|| the user can only "SaveWishList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.post(
  "/RemoveWishList",
  AuthVerification,
  WishListController.RemoveWishList
); // calling the " WishListController" ( we need to import this) and from here calling the method "RemoveWishList" and setting the routing end point.|| the user can only "RemoveWishList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.get("/WishList", AuthVerification, WishListController.WishList); // calling the " WishListController" ( we need to import this) and from here calling the method "WishList" and setting the routing end point.|| the user can only "WishList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.

//=================================================== Cart ===========================================================
router.post("/SaveCartList", AuthVerification, CartListController.SaveCartList); // calling the " CartListController" ( we need to import this) and from here calling the method "SaveCartList" and setting the routing end point.|| the user can only "SaveCartList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.post(
  "/UpdateCartList/:cartID",
  AuthVerification,
  CartListController.UpdateCartList
); // calling the " CartListController" ( we need to import this) and from here calling the method "UpdateCartList" and setting the routing end point.|| the user can only "UpdateCartList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.|| need to send "cartID" as url parameter.
router.post(
  "/RemoveCartList",
  AuthVerification,
  CartListController.RemoveCartList
); // calling the " CartListController" ( we need to import this) and from here calling the method "RemoveCartList" and setting the routing end point.|| the user can only "RemoveCartList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.
router.get("/CartList", AuthVerification, CartListController.CartList); // calling the " CartListController" ( we need to import this) and from here calling the method "CartList" and setting the routing end point.|| the user can only "CartList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.

//==================================================== Invoice & Payment ( call the controller's method ) ================================================
router.get("/CreateInvoice", AuthVerification, InvoiceController.CreateInvoice);

router.get("/InvoiceList", AuthVerification, InvoiceController.InvoiceList);
router.get(
  "/InvoiceProductList/:invoice_id",
  AuthVerification,
  InvoiceController.InvoiceProductList
); // calling the " InvoiceController" ( we need to import this) and from here calling the method "InvoiceProductList" and setting the routing end point.|| the user can only "InvoiceProductList" if the user is already logged in / verified . that's why we need to use "AuthVerification" middleware.|| need to send "invoice_id" as url parameter.

router.post("/PaymentSuccess/:trxID", InvoiceController.PaymentSuccess);
router.post("/PaymentCancel/:trxID", InvoiceController.PaymentCancel);
router.post("/PaymentFail/:trxID", InvoiceController.PaymentFail);
router.post("/PaymentIPN/:trxID", InvoiceController.PaymentIPN);

//================================================= Features =================================================================

router.get("/FeaturesList", FeaturesController.FeaturesList); // no verification is needed as this is public data.
router.get("/LegalDetails/:type", FeaturesController.LegalDetails); // no verification is needed as this is public data.

//================================================= Create Review =============================================================
router.post("/CreateReview", AuthVerification, ProductController.CreateReview); // for creating review the user has to be authenticated or verified.

module.exports = router;

// test the APIs in the postman.
