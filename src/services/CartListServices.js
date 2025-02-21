const CartModel = require("../models/CartModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

//-------------------- func to select the cart list || export this function at the end ------------------//
const CartListService = async (req) => {
  try {
    let user_id = new ObjectID(req.headers.user_id); // catch the user_id from  the postman's req header / frontend and converting that to object.
    let matchStage = { $match: { userID: user_id } }; // match the db's userID with the request header's user_id.

    // Joining stage with product. || for joining we use "lookup" operator.
    let JoinStageProduct = {
      $lookup: {
        from: "products", // products = db collection name.
        localField: "productID", //using "productID" as local field.
        foreignField: "_id", // using _id as foreign field.
        as: "product", // the object we are going to store it we are going to name that product  || now we will get the product.
      },
    };
    let unwindProductStage = { $unwind: "$product" }; // inside one cartlist it will hold only one product.|| that's why we will not take json array but json object. || using $unwind operator we are unwinding the "product".

    // Joining stage with Brand. || for joining we use "lookup" operator.
    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };

    // Joining stage with Category. || for joining we use "lookup" operator.
    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    // using $project operator we will set which columns / filed we do not want. || if we don't want any specific property then set the value to 0 and if we want then set the value to 1.
    let projectionStage = {
      $project: {
        userID: 0,
        createAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    //  import "CartModel" at the top.|| call the "aggregate" function. ( inside the aggregation pipeline set all the stages.)
    let data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
//-------------------- 1. func to create the cart list || export this function at the end || call this function inside "CartListController.js" ------------------//
const SaveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user_id from the postman url's request header / frontend.
    let reqBody = req.body; // catching the request body.
    reqBody.userID = user_id; // adding the User_id to the request body.
    //  import "CartModel" at the top.
    await CartModel.create(reqBody); // call the create() method and pass the request body. || in the postman's body set all the columns with the same name that is being created in the CartModel.js.
    return { status: "success", message: "Cart List Create Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
//-------------------- func to update the cart list || export this function at the end------------------//
const UpdateCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user_id from the postman url's request header / frontend. || this is already encoded with the token when the user has logged in.
    let cartID = req.params.cartID; // catching the cartID from the postman url's request parameter / frontend.
    let reqBody = req.body; // catching the request body.
    //  import "CartModel" at the top. || call the "updateOne()" method. || we need cartID and user_id so that one user can not modify the another user's cart.
    await CartModel.updateOne(
      { _id: cartID, userID: user_id },
      { $set: reqBody } // using the $set operator we will update the request body.
    );
    return { status: "success", message: "Cart List Update Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

//-------------------- func to remove the cart list || export this function at the end------------------//
const RemoveCartListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user_id from the postman url's request header / frontend.
    let reqBody = req.body; // catching the request body.
    reqBody.userID = user_id; // adding the User_id to the request body.
    //  import "CartModel" at the top.
    await CartModel.deleteOne(reqBody); // call the deleteOne() method and pass the request body. || for deleting cart list from the postman's body pass productID and user_id both.
    return { status: "success", message: "Cart List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

module.exports = {
  UpdateCartListService,
  CartListService,
  SaveCartListService,
  RemoveCartListService,
};
