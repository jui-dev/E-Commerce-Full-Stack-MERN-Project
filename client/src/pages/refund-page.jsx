import React, { useEffect } from "react";
import FeatureStore from "../store/FeatureStore.js";
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";

const RefundPage = () => {
  const { LegalDetailsRequest } = FeatureStore(); // import "LegalDetailsRequest" from the "FeatureStore.js"
  // use the useEffect.
  useEffect(() => {
    (async () => {
      // after calling this API we will get the "Legal Contents"
      await LegalDetailsRequest("refund"); // execute the "LegalDetailsRequest" from the "useEffect"|| and pass the "refund" parameter as the "type"
    })();
  }, []);
  // after executing the "useEffect()" we will get the "legal contents" and now we need to show that in the page.
  //-------------- UI portion --------------//
  return (
    <Layout>
      {/* render "LegalContents" component */}
      <LegalContents />
    </Layout>
  );
};

export default RefundPage;
