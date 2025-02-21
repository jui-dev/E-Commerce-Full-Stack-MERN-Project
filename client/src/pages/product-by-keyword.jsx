import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore.js";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByKeyword = () => {
  const { ListByKeywordRequest } = ProductStore(); // using the "ListByKeywordRequest" property from the "ProductStore()" and call it inside the useEffect Hook.
  const { keyword } = useParams(); // we will send "keyword" at the url parameter. || if we use keyword then product will re render to the same page.

  // we will call API inside the UseEffect.
  useEffect(() => {
    (async () => {
      await ListByKeywordRequest(keyword); // calling the "ListByKeywordRequest(keyword)" method inside the useEffect Hook.
    })();
  }, [keyword]); // if we use "keyword" as (dependency array) so that product will re render to the same page.

  return (
    <Layout>
      {/* ------------- Rendering the "ProductList" component ------------------- */}
      <ProductList />
    </Layout>
  );
};

export default ProductByKeyword;
