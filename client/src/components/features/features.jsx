import React from "react";
import FeatureStore from "../../store/FeatureStore.js";
import FeaturesSkeleton from "../../skeleton/features-skeleton.jsx";

const Features = () => {
  const { FeatureList } = FeatureStore();

  // ----------- UI Portion -------------//
  if (FeatureList === null) {
    return <FeaturesSkeleton />;
  } else {
    return (
      <div className="container section">
        <div className="row">
          {FeatureList.map((item, i) => {
            return (
              <div key={i} className="col-6 p-2 col-md-3 col-lg-3 col-sm-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-3">
                        {/* ------ getting feature's img------- */}
                        <img alt="img" className="w-100" src={item["img"]} />
                      </div>
                      <div className="col-9">
                        {/* ------- getting feature's name ----- */}
                        <h3 className="bodyXLarge">{item["name"]}</h3>
                        {/* ------- getting feature's description ----- */}
                        <span className="bodySmall">{item["description"]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Features;
