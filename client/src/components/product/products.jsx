import React from "react";
import ProductStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";
import { Link } from "react-router-dom";
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
const Products = () => {
  const { ListByRemark, ListByRemarkRequest } = ProductStore(); // using the "ListByRemark, ListByRemarkRequest" property from the "ProductStore()"
  // ----------- UI Portion -------------//
  return (
    <div className="section">
      <div className="container-fluid py-5 bg-white">
        <div className="row">
          <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
          <span className="bodySmall mb-3 text-center">
            Explore a World of Choices Across Our Most Popular
          </span>
          <div className="col-12">
            <div>
              <ul
                className="nav nav-pills  p-3  justify-content-center mb-3"
                id="pills-tab"
                role="tablist"
              >
                {/* ======================= New =========================== */}
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ListByRemarkRequest("new"); // executing list by remark.
                    }}
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-new"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    New
                  </button>
                </li>
                {/* =========================== Trending ====================== */}
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ListByRemarkRequest("trending");
                    }}
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-trending"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Trending
                  </button>
                </li>
                {/* ============================= Popular ======================= */}
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ListByRemarkRequest("popular");
                    }}
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-popular"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    Popular
                  </button>
                </li>
                {/* ========================== Top ============================= */}
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ListByRemarkRequest("top");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-top"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Top
                  </button>
                </li>
                {/* ============================== Special ========================= */}
                <li className="nav-item" role="presentation">
                  <button
                    onClick={() => {
                      ListByRemarkRequest("special");
                    }}
                    className="nav-link"
                    id="pills-disabled-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-special"
                    type="button"
                    role="tab"
                    aria-controls="pills-disabled"
                    aria-selected="false"
                  >
                    Special
                  </button>
                </li>
              </ul>
              <div className="tab-content" id="pills-tabContent">
                {/* ------------------------------------- 1st tab ( New ) -------------------------------- */}
                <div
                  className="tab-pane fade show active"
                  id="pills-new"
                  role="tabpanel"
                  aria-labelledby="pills-home-tab"
                  tabIndex="0"
                >
                  {/* ------------------ as long as the products are not loaded we will show the skeleton and once the products are loaded we will show the products -------------------------- */}
                  {ListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {/* =============== here we will show the products according to the specific (Remark) ============================== */}
                        {ListByRemark.map((item, i) => {
                          //---------------------- managing price tag and storing that in a variable --------------------//
                          let price = (
                            // ------------------- calling the api to show the price ---------------------//
                            <p className="bodyMedium  text-dark my-1">
                              Price: ${item["price"]}{" "}
                            </p>
                          );
                          // -------------- if discount property is true, then we will draw a line through the normal price and show the discount price ---------------//
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
                                to={`/details/${item["_id"]}`} // /details = routing. || according to the "_id" we will go to that specific product's details page.
                                className="card shadow-sm h-100 rounded-3 bg-white"
                              >
                                {/*-------- calling the rest API we will show the (image) --------- */}
                                <img
                                  className="w-100 rounded-top-2"
                                  src={item["image"]} // give the property name according to the db.
                                />
                                <div className="card-body">
                                  {/*-------- calling the rest API we will show the (title) --------- */}
                                  <p className="bodySmal text-secondary my-1">
                                    {item["title"]}
                                  </p>
                                  {/* ------------ showing the price ( just provide the variable name. and manage the "price" tag above )---------------- */}
                                  {price}
                                  {/* ------------ showing the Star Ratings ------------- */}
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
                {/* ------------------------------------- 2nd tab (Repeat same thing) ( Trending ) -------------------------------- */}
                <div
                  className="tab-pane fade"
                  id="pills-trending"
                  role="tabpanel"
                  aria-labelledby="pills-profile-tab"
                  tabIndex="0"
                >
                  {ListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ListByRemark.map((item, i) => {
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
                {/* ------------------------------------- 3rd tab (Repeat same thing) ( Popular )-------------------------------- */}
                <div
                  className="tab-pane fade"
                  id="pills-popular"
                  role="tabpanel"
                  aria-labelledby="pills-contact-tab"
                  tabIndex="0"
                >
                  {ListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ListByRemark.map((item, i) => {
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
                {/* ------------------------------------- 4th tab (Repeat same thing) ( Top )-------------------------------- */}
                <div
                  className="tab-pane fade"
                  id="pills-top"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {ListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ListByRemark.map((item, i) => {
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
                {/* ------------------------------------- 5th tab (Repeat same thing) ( Special )-------------------------------- */}
                <div
                  className="tab-pane fade"
                  id="pills-special"
                  role="tabpanel"
                  aria-labelledby="pills-disabled-tab"
                  tabIndex="0"
                >
                  {ListByRemark === null ? (
                    <ProductsSkeleton />
                  ) : (
                    <div className="container">
                      <div className="row">
                        {ListByRemark.map((item, i) => {
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
      </div>
    </div>
  );
};

export default Products;
