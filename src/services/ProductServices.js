// 1. at 1st import all the products related "models" from the "models" folder.
//* to manage the services 1st import all the models at the top..
//* create different methods / functions to manage the services / business logics.
//* export all the functions at the end.
// * inside each service functions we are going to use the "models".

const BrandModel = require("../models/BrandModel");
const CategoryModel = require("../models/CategoryModel");
const ProductSliderModel = require("../models/ProductSliderModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
const ReviewModel = require("../models/ReviewModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId; // catching the ObjectID property from "mongoose".

//--------------------------------------------------------------------------------------------------------//

// 1. function to (get / select all the brand lists) from the mongodb database.|| export this function at the end // call this function inside "ProductController"
const BrandListService = async () => {
  try {
    //  import "BrandModel" at the top.
    let data = await BrandModel.find(); // in the "BrandModel.js" use the "find()" method to get all the brand list data.
    return { status: "success", data: data }; // return a json object.
  } catch (e) {
    return { status: "fail", data: e }.toString(); // if error occurs.
  }
};

// 2. function to (get the category lists) from the mongodb database. || export this function at the end
const CategoryListService = async () => {
  try {
    //  import "CategoryModel" at the top.
    let data = await CategoryModel.find(); // in the "CategoryModel.js" use the "find()" method to get all the category list data.
    return { status: "success", data: data }; // return a json object.
  } catch (e) {
    return { status: "fail", data: e }.toString(); // if error occurs.
  }
};
// 3. function to ( get the sliders lists) from the mongodb database.|| export this function at the end
const SliderListService = async () => {
  try {
    //  import "ProductSliderModel" at the top.
    let data = await ProductSliderModel.find(); // in the "ProductSliderModel.js" use the "find()" method to get all the product slides data.
    return { status: "success", data: data }; // return a json object.
  } catch (e) {
    return { status: "fail", data: e }.toString(); // if error occurs.
  }
};

//-----------------------------------------------------------------------------------------------------------------------------//

// 4. function to (get the products lists by brand) from the mongodb database.|| export this function at the end
const ListByBrandService = async (req) => {
  try {
    let BrandID = new ObjectId(req.params.BrandID); // catching the "BrandID" from postman request parameter and converting it to ObjectID.

    // to work with mongodb aggregation we will need a matching stage.
    // matching stage.
    let MatchStage = { $match: { brandID: BrandID } }; // match mongodb collection's "brandID" with "url parameter's" BrandID.""

    // Joining stage with product. || for joining we use "lookup" operator.
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands", // the collection with which we will be joining. || brands = db collection name.
        localField: "brandID", // ( use the foreign key )using "brandID" as local field.
        foreignField: "_id", // join with brands collection's _id. || using _id as foreign field.
        as: "brand", // the object we are going to store it we are going to name that brand || now we will get the brand.
      },
    };

    // Joining stage with category. || for joining we use "lookup" operator.
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" }; // use mongodb "unwind" operator|| for this the brand will not come as array but will come as object.
    let UnwindCategoryStage = { $unwind: "$category" }; // use mongodb "unwind" operator || for this the category will not come as array but will come as object.

    // using $project operator we will set which columns / filed we do not want. || if we don't want any specific property then set the value to 0 and if we want then set the value to 1.
    // projection for which data we want and which data we do not want. || use mongodb "project" operator.
    let ProjectionStage = {
      $project: {
        "brand._id": 0, // don't want this brand "_id "property
        "category._id": 0, // don't want this category "_id "property
        categoryID: 0, // don't want this "categoryID "property
        brandID: 0, // don't want this "brandID "property
      },
    };

    // Query || for complex query use "aggregate" function.|| use try catch block. || mongodb aggregation works with multiple stages.
    // inside the aggregation pipeline keep all the stages.
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
// 5. function to (get the products lists by category) from the mongodb database. || similar as "ListByBrandService"|| export this function at the end
const ListByCategoryService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID); // catching the "CategoryID" from postman request parameter and converting it to ObjectID.
    // to work with mongodb aggregation we will need a matching stage.
    // matching stage.// match mongodb collection's "categoryID" with "url parameter's" CategoryID""
    let MatchStage = { $match: { categoryID: CategoryID } };
    // Joining stage with product. || for joining we use "lookup" operator.
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands", // the collection with which we will be joining. || brands = db collection name.
        localField: "brandID", // ( use the foreign key )using "productID" as local field.
        foreignField: "_id", // join with brands collection's _id. || using _id as foreign field.
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" }; // use mongodb "unwind" operator|| for this the brand will not come as array but will come as object.
    let UnwindCategoryStage = { $unwind: "$category" }; // use mongodb "unwind" operator || for this the category will not come as array but will come as object.
    // using $project operator we will set which columns / filed we do not want. || if we don't want any specific property then set the value to 0 and if we want then set the value to 1.
    // projection for which data we want and which data we do not want. || use mongodb "project" operator.
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    // Query || for complex query use "aggregate" function.|| use try catch block. || mongodb aggregation works with multiple stages.
    // inside the aggregation pipeline keep all the stages.
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
// 6. function to (get the products lists by Remark) from the mongodb database.|| similar as "ListByBrandService"|| export this function at the end
const ListByRemarkService = async (req) => {
  try {
    let Remark = req.params.Remark; //catching the remark from the postman request url parameter. we will be getting the remark as string so we do not need to convert that to object.
    // to work with mongodb aggregation we will need a matching stage.
    // matching stage.// match mongodb collection's "remark" with "url parameter's" Remark""
    let MatchStage = { $match: { remark: Remark } };

    //------ similar as before ----------//
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

//-----------------------------------------------------------------------------------------------------------------------------------------------------//

// 7. function to (get the products lists by similar) from the mongodb database. || similar as "ListByBrandService"|| export this function at the end
const ListBySimilarService = async (req) => {
  try {
    let CategoryID = new ObjectId(req.params.CategoryID); // catch the "CategoryID" from  the postman's req header / frontend and converting that to object.

    // to work with mongodb aggregation we will need a matching stage.
    // matching stage.// match mongodb collection's "categoryID" with "url parameter's" CategoryID""
    let MatchStage = { $match: { categoryID: CategoryID } };

    let limitStage = { $limit: 20 }; // add this limit stage to show only 20 products.

    //------------- similar as before -------------------//
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    let data = await ProductModel.aggregate([
      MatchStage,
      limitStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
// 8. function to (get the product's detail) from the mongodb database.|| similar as "ListByBrandService"|| export this function at the end
const DetailsService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID); // catch the "ProductID" from the postman request url parameter and converting it to object.

    // to work with mongodb aggregation we will need a matching stage.
    // matching stage.// match mongodb collection's "_id" with "url parameter's" ProductID""
    let MatchStage = { $match: { _id: ProductID } };

    //----------- similar as before -------------//
    // -- joining with Brand ---------//
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands", //brands = db collection name.
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    // -- joining with Category ---------//
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories", // categories = db collection name.
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    // -- joining with Product Details ---------//
    let JoinWithDetailsStage = {
      $lookup: {
        from: "productdetails", // productdetails = db collection name.
        localField: "_id",
        foreignField: "productID",
        as: "details", // object
      },
    };

    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };
    let UnwindDetailsStage = { $unwind: "$details" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };

    // import "ProductModel"
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      JoinWithDetailsStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      UnwindDetailsStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

// 9. function to (get the product lists by keyword) from the mongodb database. || for searching purpose.|| export this function at the end
const ListByKeywordService = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.Keyword, $options: "i" }; // // catching the Keyword from the postman url's request header / frontend.//convert the keyword to "regex". || $options: "i" = case insensitive.
    let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]; // search on title , search on short Description.

    let SearchQuery = { $or: SearchParams };

    let MatchStage = { $match: SearchQuery };

    //------------- same as before -----------------//
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let UnwindBrandStage = { $unwind: "$brand" };
    let UnwindCategoryStage = { $unwind: "$category" };

    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    // import the "ProductModel".
    let data = await ProductModel.aggregate([
      MatchStage,
      JoinWithBrandStage,
      JoinWithCategoryStage,
      UnwindBrandStage,
      UnwindCategoryStage,
      ProjectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

// 10. function to ( get the product's review lists) from the mongodb database.|| export this function at the end
const ReviewListService = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.ProductID); // catch ProductID
    let MatchStage = { $match: { productID: ProductID } };

    // ---- joining with profile ----//
    let JoinWithProfileStage = {
      $lookup: {
        from: "profiles",
        localField: "userID",
        foreignField: "userID",
        as: "profile",
      },
    };
    let UnwindProfileStage = { $unwind: "$profile" }; // so that we can get only one profile.

    let ProjectionStage = {
      $project: { des: 1, rating: 1, "profile.cus_name": 1 }, // 1 = means we will get that.
    };
    //  we will use "ReviewModel" . and perform aggregation query on that.
    let data = await ReviewModel.aggregate([
      MatchStage,
      JoinWithProfileStage,
      UnwindProfileStage,
      ProjectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};
//---------------------------- create Review --------------------------//

// 11. function to (get the product create review lists) from the mongodb database.|| export this function at the end
const CreateReviewService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catch the user_id from the request header.
    let reqBody = req.body;
    // import the "ReviewModel" at the top.
    let data = await ReviewModel.create({
      productID: reqBody["productID"],
      userID: user_id, // for the header.
      des: reqBody["des"],
      rating: reqBody["rating"],
    });
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

// 12. function to (get the product by filtering ) from the mongodb database.|| export this function at the end.
const ListByFilterService = async (req) => {
  try {
    let matchConditions = {}; // we are providing empty matching condition. because matching condition can be 1, 2, 3, or any amount( according to the postman url's body property ).

    // if request body has "categoryID" , then we will add that to the "matchConditions".
    if (req.body["categoryID"]) {
      matchConditions.categoryID = new ObjectId(req.body["categoryID"]);
    }
    // if request body has "brandID" , then we will add that to the "matchConditions".
    if (req.body["brandID"]) {
      matchConditions.brandID = new ObjectId(req.body["brandID"]);
    }
    //====================================== 1st matching stage =======================================//
    // now based on "categoryID" and "brandID" we are creating a matching stage.
    let MatchStage = { $match: matchConditions };
    // now sort the data based on maximum price and minimum price. ( if the product price is stored as string in the database then we can not put max and min condition to that price )

    //-------------- from here based on max and min price we will create matching condition ---------------//
    let AddFieldsStage = {
      $addFields: { numericPrice: { $toInt: "$price" } }, // converting the string price to int price.
    };
    let priceMin = parseInt(req.body["priceMin"]); // picking the minimum price from the body.
    let priceMax = parseInt(req.body["priceMax"]); // picking the maximum price from the body.
    // now setting the pricing condition.
    // at 1st set the matching condition for price to empty.
    let PriceMatchConditions = {};
    // if we have minimum price then we will set that price to the "PriceMatchConditions" using $gte operator ( greater than equal )
    if (!isNaN(priceMin)) {
      PriceMatchConditions["numericPrice"] = { $gte: priceMin };
    }
    // if we have maximum price then we will set that price to the "PriceMatchConditions" using $lte operator ( less than equal )
    if (!isNaN(priceMax)) {
      PriceMatchConditions["numericPrice"] = {
        ...(PriceMatchConditions["numericPrice"] || {}),
        $lte: priceMax,
      };
    }
    //====================================== 2nd matching stage =======================================//
    // now based on "priceMin" and "priceMax" we are creating a price matching stage.
    let PriceMatchStage = { $match: PriceMatchConditions };

    // join with Brand Stage
    let JoinWithBrandStage = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    // join with Category Stage
    let JoinWithCategoryStage = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    // unwind Brand Stage
    let UnwindBrandStage = { $unwind: "$brand" };
    // unwind Category Stage
    let UnwindCategoryStage = { $unwind: "$category" };
    // projection stage ( set up the properties that we don't want to show )
    let ProjectionStage = {
      $project: {
        "brand._id": 0,
        "category._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    // import the "ProductModel" at the top. and run "Aggregation" query on them.
    let data = await ProductModel.aggregate([
      MatchStage, // this stage will sort based on "BrandID" and "categoryID"
      AddFieldsStage, // in this stage we converted string price to int price.
      PriceMatchStage, // this stage will sort based on "priceMin" and "priceMax"
      // after completing the stages the products we get we will join them with different collections.
      JoinWithBrandStage, // join the products with Brand Stage.
      JoinWithCategoryStage, // join the products with Category stage.
      UnwindBrandStage, // after joining unwind the Brand Stage.
      UnwindCategoryStage, // after joining unwind the Category Stage.
      ProjectionStage, // set up Projection
    ]);
    // after completing the aggregation return the data.
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e }.toString();
  }
};

// export all the functions so that we can use them from other files as well.
module.exports = {
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
};
