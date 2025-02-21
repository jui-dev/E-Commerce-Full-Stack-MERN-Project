import React from "react";
import ProductStore from "../../store/ProductStore.js";
import StarRatings from "react-star-ratings/build/star-ratings.js";

const Reviews = () => {
  const { ReviewList } = ProductStore();
  // =========== UI Portion ==================//
  return (
    <div>
      {/* --------------- we will use the bootstrap UI to show the products --------------------- */}
      <ul className="list-group mt-4 list-group-flush">
        {/* ----------- we will use map over the "Review List"  to get each review ( if "ReviewList" is not null then we will run a loop over the Review Lists otherwise we will show nothing )----------- */}
        {ReviewList !== null ? (
          ReviewList.map((item, i) => {
            return (
              <li key={i} className="list-group-item bg-transparent">
                <h6 className="m-0 p-0">
                  {/* --- from "item" to "profile" to "customer name" || using icon before the customer name ---- */}
                  <i className="bi bi-person"></i> {item["profile"]["cus_name"]}
                </h6>
                {/* ----- Ratings of the Reviews ---------- */}
                {/* --- we need to import "StarRatings" from the "react-star-ratings" */}
                <StarRatings
                  rating={parseFloat(item["rating"])} // from "items" to "rating" //
                  starRatedColor="red"
                  starDimension="15px"
                  starSpacing="2px"
                />
                {/* ----- from "items" to "description" */}
                <p> {item["des"]}</p>
              </li>
            );
          })
        ) : (
          <span></span>
        )}
      </ul>
    </div>
  );
};

export default Reviews;
