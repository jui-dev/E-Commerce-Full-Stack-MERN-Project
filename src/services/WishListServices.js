const WishModel = require("../models/WishModel");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

//---------------- function to select / read wish list || need to export this func at the end-----------------//
const WishListService = async (req) => {
  try {
    let user_id = new ObjectID(req.headers.user_id); // catch the user_id from the postman / frontend request headers parameter.
    let matchStage = { $match: { userID: user_id } }; // match the database's "userID" with the header's "user_id".

    // Joining. for joining we will use "lookup" operator. || joining with product it will catch the data.
    let JoinStageProduct = {
      $lookup: {
        from: "products", // products = db collection name. from here we are going to join.
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindProductStage = { $unwind: "$product" }; // inside one wishlist it will hold only one product.|| that's why we will not take json array but json object. || using $unwind operator we are unwinding the "product".

    // joining with the Brand.
    let JoinStageBrand = {
      $lookup: {
        from: "brands", // brands = db collection name . from here we are going to join.
        localField: "product.brandID", // product's brandID will work as local Field.
        foreignField: "_id", // _id is working as foreign field.
        as: "brand", // the object we are going to store it we are going to name that brand.  || now we will get the brand of the product.
      },
    };
    let unwindBrandStage = { $unwind: "$brand" }; // inside one wishlist it will hold only one brand.|| that's why we will not take json array but json object. || using $unwind operator we are unwinding the "brand".

    let JoinStageCategory = {
      $lookup: {
        from: "categories", // categories = db collection name . from here we are going to join.
        localField: "product.categoryID", // product's categoryID will work as local Field.
        foreignField: "_id", // _id is working as foreign field.
        as: "category", // the object we are going to store it we are going to name that category  || now we will get the category of the product.
      },
    };
    let unwindCategoryStage = { $unwind: "$category" }; // inside one wishlist it will hold only one category.|| that's why we will not take json array but json object. || using $unwind operator we are unwinding the "category".

    // using $project operator we will set which columns / filed we do not want. || if we don't want any specific property then set the value to 0 and if we want then set the value to 1.
    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };
    // import "WishModel" at the top. || call the "aggregate" function.( inside the aggregation pipeline set all the stages.)
    let data = await WishModel.aggregate([
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

//---------------- function to create + update wish list ( here we will create + update ) || || need to export this func at the end-----------------//

const SaveWishListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user id from the Postman's url parameter header / Front end.
    let reqBody = req.body; // catching the request body
    reqBody.userID = user_id; // add the user_id with the request body.
    // import "WishModel".
    await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true }); // import "WishModel" at the top. // call the "updateOne()" method on the "WishModel" || 1st according to the request body data will be filtered. if data matches then using the $set operator data will be updated and if no matching found in that case we will set the "upsert" to true that means new data will be created.
    return { status: "success", message: "Wish List Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};
//---------------- function to remove wish list || need to export this func at the end-----------------//
const RemoveWishListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catching the user id from the Postman's url parameter header / Front end.
    let reqBody = req.body; // catching the request body
    reqBody.userID = user_id; // add the user_id with the request body.
    // import "WishModel".
    await WishModel.deleteOne(reqBody); // import "WishModel" at the top. // call the "deleteOne()" method on the "WishModel" || using the request body the wish list will be deleted. || from the frontend / postman just send the productID in the body.
    return { status: "success", message: "Wish List Remove Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

module.exports = {
  WishListService,
  SaveWishListService,
  RemoveWishListService,
};
