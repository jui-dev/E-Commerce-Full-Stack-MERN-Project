import { create } from "zustand"; // we will create store using zustand.
import axios from "axios"; // we will call the API using axios.
// creating store.
// "create is the feature of zustand". use "store" as the parameter.
// inside this use object.
// ------------- For Home Page API ----------//
const ProductStore = create((set) => ({
  BrandList: null, // we need "BrandList" for "brands" component. || initially set the "BrandList" property to null.
  // use async function in the "BrandListRequest" Property.
  BrandListRequest: async () => {
    // using this function send a request using Axios to the Already created "Postman"->"ProductBrandList" API.
    let res = await axios.get(`/api/v1/ProductBrandList`); // calling the Postman "ProductBrandList" API. //setting the backend API path. || now we will get the data and store that data inside the "res" variable.
    if (res.data["status"] === "success") {
      set({ BrandList: res.data["data"] }); // if the response status is success , then set the "data" property from the "res.data" to the " FeatureList" property which was initillay set as null.
    } // now a store is created to use the Feature API.
  },
  // ------------- For Home Page API ----------//
  CategoryList: null, // we need "CategoryList" for "Category" component.
  CategoryListRequest: async () => {
    // using this function send a request using Axios to the Already created "Postman"->"ProductCategoryList" API.
    let res = await axios.get(`/api/v1/ProductCategoryList`); // calling the Postman "ProductCategoryList" API.
    if (res.data["status"] === "success") {
      set({ CategoryList: res.data["data"] });
    }
  },
  // ------------- For Home Page API ----------//
  SliderList: null, // we need "SliderList" for "Slider" component.
  SliderListRequest: async () => {
    let res = await axios.get(`/api/v1/ProductSliderList`); // calling the Postman "ProductSliderList" API.
    if (res.data["status"] === "success") {
      set({ SliderList: res.data["data"] });
    }
  },
  // ------------- For Home Page API ----------//
  ListByRemark: null, // we need "ListByRemark" for "products" component.
  ListByRemarkRequest: async (Remark) => {
    set({ ListByRemark: null });
    let res = await axios.get(`/api/v1/ProductListByRemark/${Remark}`); // calling the Postman "ProductListByRemark" API. and passing the "Remark".
    if (res.data["status"] === "success") {
      set({ ListByRemark: res.data["data"] });
    }
  },

  //------------------------------ working with List Product -----------------------//
  //--- whatever way we list the products ( by brand , by category , by keyword , by filter ) , after fetching the products will store at "ListProduct" variable.
  ListProduct: null, // we need "ListProduct" for "products" component.
  ListByBrandRequest: async (BrandID) => {
    set({ ListProduct: null });
    let res = await axios.get(`/api/v1/ProductListByBrand/${BrandID}`); // calling the Postman "ProductListByBrand" API. and passing the "BrandID".
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },
  ListByCategoryRequest: async (CategoryID) => {
    set({ ListProduct: null });
    let res = await axios.get(`/api/v1/ProductListByCategory/${CategoryID}`); // calling the Postman "ProductListByCategory" API. and passing the "CategoryID".
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },
  ListByKeywordRequest: async (Keyword) => {
    set({ ListProduct: null });
    let res = await axios.get(`/api/v1/ProductListByKeyword/${Keyword}`); // calling the Postman "ProductListByKeyword" API. and passing the "Keyword".
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },
  ListByFilterRequest: async (postBody) => {
    set({ ListProduct: null });
    let res = await axios.post(`/api/v1/ProductListByFilter`, postBody); // calling the Postman "ProductListByFilter" API. and passing the "postBody".
    if (res.data["status"] === "success") {
      set({ ListProduct: res.data["data"] });
    }
  },

  // --------------- for searching ------------//
  SearchKeyword: "",
  SetSearchKeyword: async (keyword) => {
    set({ SearchKeyword: keyword }); // using "keyword" parameter , and "set" feature , we will use url parameter "keyword" in the "SearchKeyword".
  },
  //-------------------- For showing Product Details ------------------------//
  Details: null,
  DetailsRequest: async (id) => {
    let res = await axios.get(`/api/v1/ProductDetails/${id}`); // calling the Postman "ProductDetails" API. and passing the "id".
    if (res.data["status"] === "success") {
      set({ Details: res.data["data"] });
    }
  },

  //-------------------- For showing product's reviews -----------------//
  ReviewList: null,
  ReviewListRequest: async (id) => {
    let res = await axios.get(`/api/v1/ProductReviewList/${id}`); // calling the Postman "ProductReviewList" API. and passing the "id".
    if (res.data["status"] === "success") {
      set({ ReviewList: res.data["data"] });
    }
  },
}));

export default ProductStore;
