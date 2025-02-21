import React from "react";
import ProductStore from "../../store/ProductStore.js";
import SliderSkeleton from "../../skeleton/slider-skeleton.jsx";
import { Link } from "react-router-dom";

const Slider = () => {
  const { SliderList } = ProductStore();

  // ----------- UI Portion -------------//
  if (SliderList === null) {
    return <SliderSkeleton />;
  } else {
    return (
      <div>
        <div
          id="carouselExampleDark"
          className="carousel hero-bg carousel-light slide"
        >
          {/* ========================= Carousel indicator sign ========================== */}
          <div className="carousel-indicators">
            {SliderList.map((item, i) => {
              return (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to={i} // --> which item the indicator will go to.
                  className="active bg-white"
                  aria-current="true"
                  aria-label=""
                ></button>
              );
            })}
          </div>
          <div className="carousel-inner py-5">
            {/* ================================= slider body in the home page ======================== */}
            {SliderList.map((item, i) => {
              let active = "carousel-item"; // bootstrap css class for carousel.
              //------- for the 1st item we will keep the carousel active for the 1st slider-------//
              if (i === 0) {
                active = "carousel-item active"; // bootstrap active css class.
              }
              return (
                // initially one slider will be active || so we need to manage active css class.
                <div key={i} className={active} data-bs-interval="10000">
                  <div className="container-fluid ">
                    <div className="row px-5 justify-content-center">
                      {/* ======================= Left side column ====================== */}
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        {/*-------- calling the rest API we will show the (title) --------- */}
                        <h1 className="headline-1 fw-bolder  text-white">
                          {item["title"]}
                        </h1>
                        {/*-------- calling the rest API we will show the (price) --------- */}
                        <p className="h2 fw-bolder">{item["price"]}</p>
                        {/*--------- calling the rest API we will show the (description) ---------*/}
                        <p className="text-dark">{item["des"]}</p>
                        {/* ------- link to see the products details --------- */}

                        <Link
                          to={`/details/${item["productID"]}`} // details= routing
                          className="btn text-white btn-dark mt-1 px-5"
                        >
                          Buy Now
                        </Link>
                      </div>
                      {/* ======================= Right side Column ==================== */}
                      <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                        {/*-------- calling the rest API we will show the (image) on the right side------------- */}
                        <img src={item["image"]} className="w-100" alt="..." />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev btn rounded-5"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next btn"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    );
  }
};

export default Slider;
