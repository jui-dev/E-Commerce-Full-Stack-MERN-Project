import ProductStore from "../../store/ProductStore.js";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"; // css for image gallery.

const ProductImages = () => {
  const { Details } = ProductStore(); // take "Details" property from the "ProductStore.js"
  //--------- here we are going to work with product image --------------//
  let images = [
    {
      original: Details[0]["details"]["img1"],
      thumbnail: Details[0]["details"]["img1"],
    },
    {
      original: Details[0]["details"]["img2"],
      thumbnail: Details[0]["details"]["img2"],
    },
    {
      original: Details[0]["details"]["img3"],
      thumbnail: Details[0]["details"]["img3"],
    },
    {
      original: Details[0]["details"]["img4"],
      thumbnail: Details[0]["details"]["img4"],
    },
    {
      original: Details[0]["details"]["img5"],
      thumbnail: Details[0]["details"]["img5"],
    },
    {
      original: Details[0]["details"]["img6"],
      thumbnail: Details[0]["details"]["img6"],
    },
    {
      original: Details[0]["details"]["img7"],
      thumbnail: Details[0]["details"]["img7"],
    },
    {
      original: Details[0]["details"]["img8"],
      thumbnail: Details[0]["details"]["img8"],
    },
  ];

  return (
    <div>
      {/* ----- import this "ImageGallery" from "react-image-gallery" ------*/}
      {/* -------- if we set the "autoPlay" to "true" then  the images will move left to right or vice versa. || and if we set the "autoplay" to false then the images will not move. ----------*/}
      {/* ------ items = setting the array of images ( here we will use our own images ) ------------ */}
      <ImageGallery autoPlay={true} items={images} />
    </div>
  );
};
export default ProductImages;
