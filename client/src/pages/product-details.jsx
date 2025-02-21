import Details from "../components/product/details.jsx";
import Layout from "../components/layout/layout.jsx";
import { useParams } from "react-router-dom";
import Brands from "../components/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";
import { useEffect } from "react";
const ProductDetails = () => {
  const { BrandList, DetailsRequest, ReviewListRequest, BrandListRequest } =
    ProductStore(); // take all the methods from the ProductStore.js using which you want to call the APIs.

  const { id } = useParams();

  // using useEffect
  useEffect(() => {
    (async () => {
      await DetailsRequest(id); // sending request for Details.
      await ReviewListRequest(id); // sending request for Reviews.
      BrandList === null ? await BrandListRequest() : null; // if Brand List does not exists only then we will send request for the Brands List.
    })();
  }, [id]);

  return (
    <Layout>
      {/* Rendering "Details" component */}
      <Details />
      {/* Rendering "Brands" component */}
      <Brands />
    </Layout>
  );
};
export default ProductDetails;
