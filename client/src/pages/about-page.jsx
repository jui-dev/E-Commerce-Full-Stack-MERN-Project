import React, { useEffect } from "react";
import Layout from "../components/layout/layout.jsx";
import LegalContents from "../components/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.js";

const AboutPage = () => {
  const { LegalDetailsRequest } = FeatureStore(); // import "LegalDetailsRequest" from the "FeatureStore.js"
  // use the useEffect.
  useEffect(() => {
    (async () => {
      // after calling this API we will get the "Legal Contents"
      await LegalDetailsRequest("about"); // execute the "LegalDetailsRequest" from the "useEffect"|| and pass the "about" parameter as the "type"
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

export default AboutPage;
