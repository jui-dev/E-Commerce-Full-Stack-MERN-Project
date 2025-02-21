import ProductImages from "./ProductImages.jsx";
import ProductStore from "../../store/ProductStore.js";
import DetailsSkeleton from "../../skeleton/details-skeleton.jsx";
import parse from "html-react-parser";
import { useState } from "react";
import Reviews from "./reviews.jsx";
import CartSubmitButton from "../cart/CartSubmitButton.jsx";
import CartStore from "../../store/CartStore.js";
import toast from "react-hot-toast";
import WishStore from "../../store/WishStore.js";
import WishSubmitButton from "../wish/WishSubmitButton.jsx";

const Details = () => {
  const { Details } = ProductStore();
  const [quantity, SetQuantity] = useState(1); // creating state for quantity variable and initially setting that with 1.

  const { CartFormChange, CartForm, CartSaveRequest, CartListRequest } =
    CartStore();
  const { WishSaveRequest, WishListRequest } = WishStore();

  //--------- incrementQuantity() method to increment the quantity ----------//
  const incrementQuantity = () => {
    SetQuantity((quantity) => quantity + 1); // this "SetQuantity" method we have take in the "useState." to perform increment operation.
  };

  //--------- decrementQuantity() method to decrement the quantity ----------//
  const decrementQuantity = () => {
    if (quantity > 1) {
      SetQuantity((quantity) => quantity - 1); // this "SetQuantity" method we have take in the "useState." to perform decrement operation.
    }
  };

  const AddWish = async (productID) => {
    let res = await WishSaveRequest(productID);
    if (res) {
      toast.success("Wish Item Added");
      await WishListRequest();
    }
  };

  const AddCart = async (productID) => {
    let res = await CartSaveRequest(CartForm, productID, quantity);
    if (res) {
      toast.success("Cart Item Added");
      await CartListRequest();
    }
  };

  // if Details is null then we will show the Skeleton otherwise we will show the details / products view.
  if (Details === null) {
    return <DetailsSkeleton />;
  } else {
    return (
      <div className="section-top m-0 p-0 bg-white">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-7 p-3">
              {/* ======================== Rendering Product Images ============================= */}
              <ProductImages />
            </div>
            <div className="col-md-5 p-3">
              <h4>{Details[0]["title"]}</h4>
              <p className="text-muted bodySmal my-1">
                {/* -- from product details to category to categoryName -- */}
                Category: {Details[0]["category"]["categoryName"]}
              </p>
              <p className="text-muted bodySmal my-1">
                {/* -- from product details to Brand to brandName -- */}
                Brand: {Details[0]["brand"]["brandName"]}
              </p>
              {/* -- from product details to short description -- */}
              <p className="bodySmal mb-2 mt-1">{Details[0]["shortDes"]}</p>

              {/* -------------- Now we need to work with price . while picking the price we need to set up some conditions to check whether there is any discount applied on the price or not ----------- */}
              {Details[0]["discount"] ? (
                <span className="bodyXLarge">
                  Price:{" "}
                  {/* --------- regular Price with a strike through --------------- */}
                  <strike class="text-secondary">{Details[0]["price"]}</strike>{" "}
                  {/* --------- Discounted Price ----------------------------- */}
                  {Details[0]["discountPrice"]}{" "}
                </span>
              ) : (
                <span className="bodyXLarge">Price: {Details[0]["price"]}</span>
              )}
              <div className="row">
                <div className="col-4 p-2">
                  <label className="bodySmal">Size</label>
                  {/* ==================== Size drop down ====================== */}
                  <select
                    value={CartForm.size}
                    onChange={(e) => {
                      CartFormChange("size", e.target.value);
                    }}
                    className="form-control my-2 form-select"
                  >
                    <option value="">Size</option>
                    {/* ------ from product details to size -> split the sizes with coma ( now we will get an array . || now we will run a map over that array ) */}
                    {Details[0]["details"]["size"].split(",").map((item, i) => {
                      // after running map / loop over the array the item we will get we will set that item as value to the options of the drop down.
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                </div>
                {/* ==================== Color drop down ( The way we have worked with the products size we will work the same way with the products size ) ====================== */}
                <div className="col-4  p-2">
                  <label className="bodySmal">Color</label>
                  <select
                    value={CartForm.color}
                    onChange={(e) => {
                      CartFormChange("color", e.target.value);
                    }}
                    className="form-control my-2 form-select"
                  >
                    <option value="">Color</option>
                    {Details[0]["details"]["color"]
                      .split(",")
                      .map((item, i) => {
                        return <option value={item}>{item}</option>;
                      })}
                  </select>
                </div>
                {/* ==================== Quantity increment decrement ====================== */}
                <div className="col-4  p-2">
                  <label className="bodySmal">Quantity</label>
                  <div className="input-group my-2">
                    {/* ---- "decrementQuantity" method will be performed at the button's onClick event. */}
                    <button
                      onClick={decrementQuantity}
                      className="btn btn-outline-secondary"
                    >
                      -
                    </button>
                    {/* set useState's "quantity" variable as value. */}
                    <input
                      value={quantity} // initially 1 will be visible.
                      type="text"
                      className="form-control bg-light text-center"
                      readOnly
                    />
                    {/* ---- "incrementQuantity" method will be performed at the button's onClick event. */}
                    <button
                      onClick={incrementQuantity}
                      className="btn btn-outline-secondary"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="col-4  p-2">
                  <CartSubmitButton
                    onClick={async () => {
                      await AddCart(Details[0]["_id"]);
                    }}
                    className="btn w-100 btn-success"
                    text="Add to Cart"
                  />
                </div>
                <div className="col-4  p-2">
                  <WishSubmitButton
                    onClick={async () => {
                      await AddWish(Details[0]["_id"]);
                    }}
                    className="btn w-100 btn-success"
                    text="Add to Wish"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* ============================ user's specification part ============================== */}
          <div className="row mt-3">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                {/* ------------------------ specification tab ( for specification we need to do html parse || need to import parse at the top from "html-react-parser") -------------------- */}
                <button
                  className="nav-link active"
                  id="Speci-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Speci-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Speci-tab-pane"
                  aria-selected="true"
                >
                  Specifications
                </button>
              </li>
              <li className="nav-item" role="presentation">
                {/* --------------------- Review Tab -------------------------- */}
                <button
                  className="nav-link"
                  id="Review-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#Review-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="Review-tab-pane"
                  aria-selected="false"
                >
                  Review
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              {/* -------------- For Specification -------------- */}
              <div
                className="tab-pane fade show active"
                id="Speci-tab-pane"
                role="tabpanel"
                aria-labelledby="Speci-tab"
                tabIndex="0"
              >
                {/* ----------------------- we need to show the specification after parsing -------------------- */}
                {/* -------- call the "Parse" -> details -> 0 no index -> "details" property -> "description"-------- */}
                {parse(Details[0]["details"]["des"])}
              </div>

              {/* ================================== Reviews Part =================== */}
              <div
                className="tab-pane fade"
                id="Review-tab-pane"
                role="tabpanel"
                aria-labelledby="Review-tab"
                tabIndex="0"
              >
                {/*-------------- Render "Reviews" component inside "Details" component -------------*/}
                <Reviews />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Details;
