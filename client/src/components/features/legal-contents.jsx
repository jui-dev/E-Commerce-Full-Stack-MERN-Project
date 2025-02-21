import React from "react";
import FeatureStore from "../../store/FeatureStore.js";
import LegalContentSkeleton from "../../skeleton/legal-content-skeleton.jsx";
import parse from "html-react-parser";

// ----------- LegalContents Component -----------//
const LegalContents = () => {
  const { LegalDetails } = FeatureStore();

  if (LegalDetails === null) {
    // ------------- as long as the data is not fetched after calling the API , we will show the legal content skeleton -------------//
    return <LegalContentSkeleton />;
  } else {
    //  after fetching the data we will show the legal contents / details.
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card p-4">
              {/* the data we will get from the "LegalDetails"-> "0 index" -> "description" will be html data . thats why we need to use the (html parse) */}
              {parse(LegalDetails[0]["description"])}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default LegalContents;
