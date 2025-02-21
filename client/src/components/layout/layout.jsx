import React from "react";
import AppNavBar from "./appNavBar.jsx";
import Footer from "./footer.jsx";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <>
      {/* AppNavBar will be at the top || common Component || import the component at the top*/}
      <AppNavBar />
      {/* inside the body we will take the children || here we will push children */}
      {props.children}
      <Toaster position="bottom-center" />
      {/* Footer will be at the last || Common Component|| import the component at the top*/}
      <Footer />
    </>
  );
};

export default Layout;
