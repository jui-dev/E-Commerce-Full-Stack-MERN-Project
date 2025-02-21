import React, { useEffect } from "react";
import ProductStore from "../store/ProductStore.js";
import { useParams } from "react-router-dom";
import Layout from "../components/layout/layout.jsx";
import ProductList from "../components/product/product-list.jsx";

const ProductByCategory = () => {
  const { ListByCategoryRequest } = ProductStore(); // using the "ListByCategoryRequest" property from the "ProductStore()" and call it inside the useEffect Hook.
  const { id } = useParams(); // we will send "id" at the url parameter.

  // we will call API inside the UseEffect.
  useEffect(() => {
    (async () => {
      await ListByCategoryRequest(id); // calling the "ListByCategoryRequest(id)" method inside the useEffect Hook.
    })();
  }, [id]); // if we use "id" as (dependency array) so that product will re render to the same page.

  return (
    <Layout>
      {/* ------------- Rendering the "ProductList" component ------------------- */}
      <ProductList />
    </Layout>
  );
};

export default ProductByCategory;
