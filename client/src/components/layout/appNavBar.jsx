import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/plainb-logo.svg";
import ProductStore from "../../store/ProductStore.js";
import UserStore from "../../store/UserStore.js";
import UserSubmitButton from "../user/UserSubmitButton.jsx";
import CartStore from "../../store/CartStore.js";
import WishStore from "../../store/WishStore.js";

const AppNavBar = () => {
  const { SetSearchKeyword, SearchKeyword } = ProductStore(); // import "SetSearchKeyword, SearchKeyword" from the "ProductStore.js" and use this inside search input field onchange event.
  const { isLogin, UserLogoutRequest } = UserStore();
  const { CartCount, CartListRequest } = CartStore();
  const { WishCount, WishListRequest } = WishStore();
  const onLogout = async () => {
    await UserLogoutRequest();
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    (async () => {
      if (isLogin()) {
        await CartListRequest();
        await WishListRequest();
      }
    })();
  }, []);
  return (
    <>
      {/* ------------------------ Upper Portion of the NavBar ------------------ */}
      <div className="container-fluid text-white p-2 bg-dark">
        <div className="container">
          <div className="row justify-content-around">
            {/* --------------- Left side Column Portion ---------------- */}
            <div className="col-md-6">
              <span>
                <span className="f-12">
                  <i className="bi bi-envelope"></i> Support@PlanB.com
                </span>
                <span className="f-12 mx-2">
                  <i className="bi bi-envelope"></i> 01778599910
                </span>
              </span>
            </div>
            {/* --------------- Right side Column Portion ( 3 icons ) ---------------- */}
            <div className="col-md-6">
              <span className="float-end">
                {/* --------- 3 icons ---------- */}
                <span className="bodySmall mx-2">
                  <i className="bi bi-whatsapp"></i>
                </span>
                <span className="bodySmall mx-2">
                  <i className="bi bi-youtube"></i>
                </span>
                <span className="bodySmall mx-2">
                  <i className="bi bi-facebook"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* ----------------------------------- NavBar ------------------------- */}
      <nav className="navbar sticky-top shadow-sm bg-skyblue navbar-expand-lg navbar-light m-0 py-3">
        <div className="container ">
          {/* ---- logo ----- */}
          <Link className="navbar-brand" to="/">
            {/* import the logo from the assets */}
            <img className="img-fluid" src={logo} alt="" width="96px" />
          </Link>
          {/* ------------ navbar toggle button for smaller screen size -------- */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav06"
            aria-controls="nav06"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav06">
            <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
              <span className="nav-item me-4">
                {/* --------- Home ------------- */}
                <Link className="btn ms-2 btn-light position-relative" to="/">
                  <i className="bi bi-house"></i> Home
                </Link>
                {/* --------- Cart ------------- */}
                <Link
                  to="/cart"
                  type="button"
                  className="btn ms-2 btn-light position-relative"
                >
                  <i className="bi text-dark bi-bag"></i> Cart
                  {/* --------- cart count -------- */}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {CartCount}
                  </span>
                </Link>
                {/* ------------- wish ------------- */}
                <Link
                  to="/wish"
                  type="button"
                  className="btn ms-4 btn-light position-relative"
                >
                  <i className="bi text-dark bi-heart"></i> Wish
                  {/* -------------- wish count ---------- */}
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                    {WishCount}
                  </span>
                </Link>

                {/* ------------- Order ------------- */}

                <Link
                  to="/orders"
                  type="button"
                  className="btn ms-4 btn-light position-relative"
                >
                  <i className="bi text-dark  bi-truck"></i> Order
                </Link>
              </span>
            </ul>
          </div>
          <div className="d-lg-flex">
            <div className="input-group">
              {/* ---------------------------- search input field ----------------------- */}
              <input
                onChange={(e) => SetSearchKeyword(e.target.value)} // calling the (SetSearchKeyword()) method in the "onChange" event. and setting (e.target.value) inside the method.
                className="form-control"
                type="search"
                placeholder="Search..."
                aria-label="Search"
              />
              <Link
                to={
                  SearchKeyword.length > 0
                    ? `/by-keyword/${SearchKeyword}` // /by-keyword = routing. || if "SearchKeyword" length is grater than 0 then using the "SearchKeyword" we will go to that page. and otherwise we will go to the home page.
                    : `/`
                }
                className="btn btn-outline-dark"
                type="submit"
              >
                {/* input field search icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ width: 24, height: 24 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </Link>
            </div>

            {isLogin() ? (
              <>
                <UserSubmitButton
                  onClick={onLogout}
                  text="Logout"
                  className="btn ms-3 btn-success d-flex"
                />
                <Link
                  type="button"
                  className="btn ms-3 btn-success d-flex"
                  to="/profile"
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  type="button"
                  className="btn ms-3 btn-success d-flex"
                  to="/login"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default AppNavBar;
