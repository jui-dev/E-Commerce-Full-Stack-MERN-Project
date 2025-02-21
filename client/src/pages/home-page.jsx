import React, { useEffect } from "react";
import Layout from "../components/layout/layout.jsx";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";
import FeatureStore from "../store/FeatureStore.js";
import Slider from "../components/product/slider.jsx";
import Features from "../components/features/features.jsx";
import Categories from "../components/product/categories.jsx";
import Products from "../components/product/products.jsx";

const HomePage = () => {
  const {
    BrandListRequest,
    CategoryListRequest,
    SliderListRequest,
    ListByRemarkRequest,
  } = ProductStore(); // import all of these from "ProductStore.js"'s "ProductStore" method. || import "ProductStore()" at the top.

  const { FeatureListRequest } = FeatureStore(); // import "FeatureStore" at the top. || import "FeatureListRequest" from "FeatureStore.js"'s "FeatureStore" method.

  // useEffect() Hook to call the API. ( Whenever Home Page will Load this function will work )
  useEffect(() => {
    (async () => {
      // call all the methods(APIs) sequentially.
      await SliderListRequest(); // at 1st we will show the Slider List.
      await FeatureListRequest(); // then we will show the Feature List.
      await CategoryListRequest(); // then we will show the Top Categories List.
      await ListByRemarkRequest("new"); // then we will show the List by Remark . || initially only the "new" products will be visible.
      await BrandListRequest(); // then we will show the Top Brands List.
    })();
  }, []);

  return (
    // Wrap the application with the "Layout". || import this at the top.
    <Layout>
      {/* Render All the components that are going to be there in the Home page. */}
      <Slider />
      <Features />
      <Categories />
      <Products />
      <Brands />
    </Layout>
  );
};

export default HomePage;
