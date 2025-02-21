import React, { useEffect, useState } from "react";
import ProductStore from "../../store/ProductStore.js";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const ProductList = () => {
  const {
    ListProduct,
    BrandListRequest,
    BrandList,
    CategoryList,
    CategoryListRequest,
    ListByFilterRequest,
  } = ProductStore(); /// import all these methods from the "ProductStore()"

  // taking the filter's parameters using which we will send the request.
  // initially all the properties will remain empty.
  let [Filter, SetFilter] = useState({
    brandID: "",
    categoryID: "",
    priceMax: "",
    priceMin: "",
  });

  // Now we are going to work with OnChange event.
  // creating a function named "inputOnChange".
  const inputOnChange = async (name, value) => {
    // setting the filter.
    SetFilter((data) => ({
      ...data, // getting the data using spread operator.
      [name]: value, // which properties value we want to change.
    }));
  };

  //------------ using useEffect (  -------------------------- )
  useEffect(() => {
    (async () => {
      BrandList === null ? await BrandListRequest() : null; //if in the page there is no BrandList Loaded then we will call the "BrandListRequest()" method to call the corresponding API.
      CategoryList === null ? await CategoryListRequest() : null; // and in the same way if in the page there is no CategoryList Loaded then we will call the "CategoryListRequest()" method to call the corresponding API.

      // if all the properties are empty then we will not call the APIs. || using "Object's" "every()" method we can check the values. || this "Filter" variable is inside the useState().
      let isEveryFilterPropertyEmpty = Object.values(Filter).every(
        (value) => value === ""
      );
      // if all the properties are not empty then we will call the APIs.
      !isEveryFilterPropertyEmpty ? await ListByFilterRequest(Filter) : null; // executing "ListByFilterRequest" to call the API. || we will pass "Filter" post body in the request parameter. otherwise null means no APIs will be called.
    })();
  }, [Filter]);

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-3 p-2">
          <div className="card vh-100 p-3 shadow-sm">
            <label className="form-label mt-3">Brands</label>
            {/* ======================================================= Brands Drop Down ========================================= */}
            <select
              value={Filter.brandID} // initial value of the Brand would be "Filter's" --> "brandID"
              onChange={async (e) => {
                await inputOnChange("brandID", e.target.value); // executing the "inputOnChange" function. || we are sending the "brandID" and e.target.value.
              }}
              className="form-control form-select"
            >
              <option value="">Choose Brand</option>
              {/* -------- Running a map / loop over the Brandlist if the Brandlist is not null ----------- */}
              {BrandList !== null ? (
                BrandList.map((item, i) => {
                  // -------------- returning BrandList's each item as an option for the drop down of Brands --------------------//
                  return (
                    <option value={item["_id"]}>{item["brandName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            <label className="form-label mt-3">Categories</label>
            {/* ======================================================= Categories Drop Down ========================================= */}
            <select
              value={Filter.categoryID} // initial value of the Category would be "Filter's" --> "categoryID"
              onChange={async (e) => {
                await inputOnChange("categoryID", e.target.value); // executing the "inputOnChange" function. || we are sending the "categoryID" and e.target.value.
              }}
              className="form-control form-select"
            >
              <option value="">Choose Category</option>
              {/* -------- Running a map / loop over the CategoryList if the CategoryList is not null ----------- */}
              {CategoryList !== null ? (
                CategoryList.map((item, i) => {
                  // -------------- returning CategoryList's each item as an option for the drop down of Categories --------------------//
                  return (
                    <option value={item["_id"]}>{item["categoryName"]}</option>
                  );
                })
              ) : (
                <option></option>
              )}
            </select>
            {/* ======================================================= Maximum Price ========================================= */}
            <label className="form-label mt-3">
              Maximum Price ${Filter.priceMax}
            </label>
            <input
              value={Filter.priceMax} // initial value of the Maximum Price would be "Filter's" --> "priceMax"
              onChange={async (e) => {
                await inputOnChange("priceMax", e.target.value); // executing the "inputOnChange" function. || we are sending the "priceMax" and e.target.value.
              }}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />

            {/* ======================================================= Minimum Price ========================================= */}

            <label className="form-label mt-3">
              Minimum Price ${Filter.priceMin}
            </label>
            <input
              value={Filter.priceMin} // initial value of the Minimum Price would be "Filter's" --> "priceMin"
              onChange={async (e) => {
                await inputOnChange("priceMin", e.target.value); // executing the "inputOnChange" function. || we are sending the "priceMin" and e.target.value.
              }}
              min={0}
              max={1000000}
              step={1000}
              type="range"
              className="form-range"
            />
          </div>
        </div>
        <div className="col-md-9 p-2">
          <div className="container">
            <div className="row">
              {/* ------------------------------------------------------------------- */}
              {ListProduct === null ? (
                <ProductsSkeleton />
              ) : (
                <div className="container">
                  <div className="row">
                    {ListProduct.map((item, i) => {
                      let price = (
                        <p className="bodyMedium  text-dark my-1">
                          Price: ${item["price"]}{" "}
                        </p>
                      );
                      if (item["discount"] === true) {
                        price = (
                          <p className="bodyMedium  text-dark my-1">
                            Price:<strike> ${item["price"]} </strike> $
                            {item["discountPrice"]}{" "}
                          </p>
                        );
                      }
                      return (
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                          <Link
                            to={`/details/${item["_id"]}`}
                            className="card shadow-sm h-100 rounded-3 bg-white"
                          >
                            <img
                              className="w-100 rounded-top-2"
                              src={item["image"]}
                            />
                            <div className="card-body">
                              <p className="bodySmal text-secondary my-1">
                                {item["title"]}
                              </p>
                              {price}
                              <StarRatings
                                rating={parseFloat(item["star"])}
                                starRatedColor="red"
                                starDimension="15px"
                                starSpacing="2px"
                              />
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
