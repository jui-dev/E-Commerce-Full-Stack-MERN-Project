import { create } from "zustand"; // we will create store using zustand.
import axios from "axios"; // we will call the API using axios.

// creating store.
// "create is the feature of zustand". use "store" as the parameter.
// inside this use object.
const FeatureStore = create((set) => ({
  FeatureList: null, // initially set the "FeatureList" property to null.
  // use async function in the "FeatureListRequest" Property.
  FeatureListRequest: async () => {
    // using this function send a request using Axios to the Already created "Postman"->"FeaturesList" API.
    let res = await axios.get(`/api/v1/FeaturesList`); //setting the backend API path. || now we will get the data and store that data inside the "res" variable.
    if (res.data["status"] === "success") {
      set({ FeatureList: res.data["data"] }); // if the response status is success , then set the "data" property from the "res.data" to the " FeatureList" property which was initillay set as null.
    } // now a store is created to use the Feature API.
  },

  // take a property called "LegalDetails" and initially set that to null.
  LegalDetails: null,
  // create a request called "LegalDetailsRequest" and pass "type" as the parameter.
  LegalDetailsRequest: async (type) => {
    set({ LegalDetails: null });
    let res = await axios.get(`/api/v1/LegalDetails/${type}`); // the request will go to "LegalDetails" and pass "type" as a url parameter.
    if (res.data["status"] === "success") {
      set({ LegalDetails: res.data["data"] });
    }
  },
}));

export default FeatureStore; // export this so that we can use this.
