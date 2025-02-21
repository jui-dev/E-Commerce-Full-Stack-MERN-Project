const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PamentSettingModel");
const ObjectID = mongoose.Types.ObjectId;

// we have installed this 2 packages because when we will create invoice , after creating invoice we will send that to the "sslcommerz" payment gateway so that user can pay. || to initiate payment in the "sslcommerz" we need this "form-data" package. || using this package we will prepare a form data for ssl commerz and using "axios" in the ssl commerz backend , business to business we will create a request for payment using axios.
const FormData = require("form-data"); // Import form-data. this package has already been installed.
const axios = require("axios"); // Import axios. this package has already been installed.

//---------------- Create Invoice Service function || export this function at the end-------------------//

const CreateInvoiceService = async (req) => {
  let user_id = new ObjectID(req.headers.user_id); // catching a specific user. // catch the user_id from  the postman's req header / frontend and converting that to object.|| using token encoded we kept the email and "user_id" in the request header.
  let cus_email = req.headers.email; // catch the email from  the postman's req header / frontend .

  // =============Step 01: Calculate Total , Payable & Vat =====================================================================================

  //   for calculating total we will use the "CartModel" . || we will apply "Vat" on the total || total + vat = Payable

  let matchStage = { $match: { userID: user_id } }; // match the db's "carts" userID with the request header's user_id. || using this we will select which user's product list we want to fetch.
  // after going to the "products" with the "carts" collection "productID"  we will check whether there is any discount or not. || if discount = true (then we will catch the discount price) || if discount = false (we will catch the regular price ) and then calculate.

  // using the "carts" "productID" we will go to the "products table / collection "

  // Joining stage with product. || for joining we use "$lookup" operator.
  // "carts" table's "productID" will match with the "products" table "_id".
  let JoinStageProduct = {
    $lookup: {
      from: "products", // products = db collection name. || we will join with "products" collection.
      localField: "productID", // while joining with "products" collection/table we will use "productID" column/field as the local field. || this "productID"column is in the "carts" collection.
      foreignField: "_id", // this carts collection's productID will match with the "product's" table "_id" column
      as: "product", // we will take the products as object and name it as "product".
    },
  };
  // after joining we will get data as an array . but we don't want that. that's why we will use $unwind operator.
  let unwindStage = { $unwind: "$product" }; // against one productID there will be only one product.|| that's why we will not take json array but json object.|| using $unwind operator we are unwinding the "product".

  // import "CartModel" at the top || inside aggregation pipeline we will set the stages.
  // that's how we will get the cart's products.
  let CartProducts = await CartModel.aggregate([
    matchStage,
    JoinStageProduct,
    unwindStage,
  ]);

  let totalAmount = 0;
  // ------------ 1. calculating total price-----------------
  //   we will run foreach loop over the cart's products and will get element one by one.
  CartProducts.forEach((element) => {
    let price; // the price will vary based on discount and no discount.
    // inside the "product" array check if discount is true or not.
    if (element["product"]["discount"]) {
      price = parseFloat(element["product"]["discountPrice"]); // in the database we stored the price as string. so here we are converting the string to float. || element["product"]["discountPrice"] = from element we are going to "product" and from "product" we are going to "discountPrice".
    } else {
      price = parseFloat(element["product"]["price"]); // if the discount is false --> || element["product"]["price"] = from element we are going to "product" and from "product" we are going to "price". || and converting the "price" string to Float.
    }
    totalAmount += parseFloat(element["qty"]) * price; // in the db we have stored the "qty" as string . that's why converting string to "float".
  });

  // ---------- 2. calculating vat ----------------------
  let vat = totalAmount * 0.05; // 5% Vat
  // ---------- 3. calculating payable ----------------------
  let payable = totalAmount + vat;

  // ============= Step 02: Prepare  Customer Details & Shipping Details=====================================================================================

  // import "ProfileModel" at the top.
  // we are getting the "Profile" detail.
  let Profile = await ProfileModel.aggregate([matchStage]); // the matching stage we have used in step 1 we will use the same matching stage in step 2 as well.
  // the "Profile's" 0 no index we will get the customer name. || we will get the "customers email" from the header. ||the "Profile's" 0 no index we will get the customer address.||the "Profile's" 0 no index we will get the customer Phone.
  let cus_details = `Name:${Profile[0]["cus_name"]}, Email:${cus_email}, Address:${Profile[0]["cus_add"]}, Phone:${Profile[0]["cus_phone"]}`;
  // in the same way we will prepare the shipping details.
  let ship_details = `Name:${Profile[0]["ship_name"]}, City:${Profile[0]["ship_city"]}, Address:${Profile[0]["ship_add"]}, Phone:${Profile[0]["ship_phone"]}`;

  // =============Step 03: Transaction & Other's ID=====================================================================================

  // against each invoice we will need an transaction id.
  let tran_id = Math.floor(10000000 + Math.random() * 90000000); // generating a random trans_id .
  let val_id = 0; // initially setting the payment validation id to 0.
  let delivery_status = "pending"; // initially setting the delivery_status  to pending.
  let payment_status = "pending"; // initially setting the payment_status to pending.

  // =============Step 04: Create Invoice =====================================================================================

  // import "InvoiceModel" at the top
  let createInvoice = await InvoiceModel.create({
    userID: user_id,
    payable: payable,
    cus_details: cus_details,
    ship_details: ship_details,
    tran_id: tran_id,
    val_id: val_id,
    payment_status: payment_status,
    delivery_status: delivery_status,
    total: totalAmount,
    vat: vat,
  });

  // =============Step 05: Create Invoice Product=====================================================================================

  let invoice_id = createInvoice["_id"]; // in step for we have created "createInvoice" || form here we are getting the primary key of the invoice "_id"

  // we have created this "CartProducts" in the step  1.
  //   we will run foreach loop over the cart's products and will get element one by one.
  // inside this loop we will do a "insert query". || we will insert in the InvoiceProductModel.
  CartProducts.forEach(async (element) => {
    // import "InvoiceProductModel" at the top || call the create method.
    await InvoiceProductModel.create({
      userID: user_id, // user_id = in the header
      productID: element["productID"], // productID = in the cart list.
      invoiceID: invoice_id, // step 5.
      qty: element["qty"], // qty = in the cart list.
      // to work with "price" we will use if else based on discount.
      price: element["product"]["discount"]
        ? element["product"]["discountPrice"]
        : element["product"]["price"],
      color: element["color"], // color = in the cart list.
      size: element["size"], // size = in the cart list.
    });
  });

  //=============Step 06: Remove Carts=====================================================================================

  // import "CartModel" at the top || once the invoice is created we will not store the products in the cart list.|| tha's why we will remove the products from the cart list.
  // from the CartModel call the deleteMany() method. || using the "user_id" we will remove everything from the cart.
  await CartModel.deleteMany({ userID: user_id });

  //=============Step 07: Prepare SSL Payment====================================================================================

  // import "PaymentSettingModel" at the top.
  // 7.1 find all the data / settings from the PaymentSettingModel.
  let PaymentSettings = await PaymentSettingModel.find();

  //    creating a new form data . one by one we will keep adding data.
  const form = new FormData();
  // prepare the fields according to the sslcommerz documentation.
  form.append("store_id", PaymentSettings[0]["store_id"]); // "store_id"= "paymentsettings collection"    || this field are already set in the sslcommerz developers documentation. we have to be careful with the naming.
  form.append("store_passwd", PaymentSettings[0]["store_passwd"]); // "store_passwd"= "paymentsettings collection"
  form.append("total_amount", payable.toString()); // developer documentation. || payable = we have calculated it in the upper portion of this file.
  form.append("currency", PaymentSettings[0]["currency"]);
  form.append("tran_id", tran_id); // tran_id = we have calculated it in the upper portion of this file.

  // if we send "tran_id" then sslcommerz will redirect us to the url after completing the payment, from that url we can easily catch the transiction id / invoice number .
  form.append("success_url", `${PaymentSettings[0]["success_url"]}/${tran_id}`); // attach invoice's "tran_id" with success_url.
  form.append("fail_url", `${PaymentSettings[0]["fail_url"]}/${tran_id}`); // attach invoice's tran_id with fail_url
  form.append("cancel_url", `${PaymentSettings[0]["cancel_url"]}/${tran_id}`); // attach invoice's tran_id with cancel_url
  form.append("ipn_url", `${PaymentSettings[0]["ipn_url"]}/${tran_id}`); // attach invoice's tran_id with ipn_url
  // customer details. || in step 02 we have already got the customer's profile details. || whatever fields  we need for the sslcommerz payment, create field with the same name in the " profiles" collection.
  form.append("cus_name", Profile[0]["cus_name"]);
  form.append("cus_email", cus_email); // "cus_email" is in the header.
  form.append("cus_add1", Profile[0]["cus_add"]);
  form.append("cus_add2", Profile[0]["cus_add"]);
  form.append("cus_city", Profile[0]["cus_city"]);
  form.append("cus_state", Profile[0]["cus_state"]);
  form.append("cus_postcode", Profile[0]["cus_postcode"]);
  form.append("cus_country", Profile[0]["cus_country"]);
  form.append("cus_phone", Profile[0]["cus_phone"]);
  form.append("cus_fax", Profile[0]["cus_phone"]);
  // shipping related info.
  form.append("shipping_method", "YES");
  form.append("ship_name", Profile[0]["ship_name"]);
  form.append("ship_add1", Profile[0]["ship_add"]);
  form.append("ship_add2", Profile[0]["ship_add"]);
  form.append("ship_city", Profile[0]["ship_city"]);
  form.append("ship_state", Profile[0]["ship_state"]);
  form.append("ship_country", Profile[0]["ship_country"]);
  form.append("ship_postcode", Profile[0]["ship_postcode"]);

  form.append("product_name", "According Invoice"); // According Invoice = this "product_name" is already in the "Invoice" . // you can add specific product.
  form.append("product_category", "According Invoice"); // According Invoice = this "product_category" is already in the "Invoice" .
  form.append("product_profile", "According Invoice"); // According Invoice = this "product_profile" is already in the "Invoice".
  form.append("product_amount", "According Invoice"); // According Invoice = this "product_amount" is already in the "Invoice".

  // receiving response from sslcommerz.
  let SSLRes = await axios.post(PaymentSettings[0]["init_url"], form); // sending request to sslcommerz using axios || posting the form data to "init_url" and storing the response. || we can get "init_url" in the db's "paymentsettings" collection.

  return { status: "success", data: SSLRes.data };
};

//---------------- Payment Success Service function || export this function at the end-------------------//

const PaymentSuccessService = async (req) => {
  try {
    let trxID = req.params.trxID; // catching the transaction id from the request parameter.
    // import "InvoiceModel" at the top. call the updateOne() method.
    // by using the transaction Id we will update the payment_status.
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "success" }
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
//---------------- Payment Failed Service function || export this function at the end-------------------//
const PaymentFailService = async (req) => {
  try {
    let trxID = req.params.trxID; // catching the transaction id from the request parameter.
    // import "InvoiceModel" at the top || call the updateOne() method.
    // by using the transaction Id we will update the payment_status.
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "fail" }
    );
    return { status: "fail" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
//---------------- Payment Cancel Service function || export this function at the end-------------------//
const PaymentCancelService = async (req) => {
  try {
    let trxID = req.params.trxID; // catching the transaction id from the request parameter.
    // import "InvoiceModel" at the top || call the updateOne() method.
    // by using the transaction Id we will update the payment_status.
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: "cancel" }
    );
    return { status: "cancel" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

//---------------- Payment IPN Service function || export this function at the end-------------------//

// if the user payment is not success / failed / canceled in that case we will take the transaction id and sslcommerz will post the invoice status in our request body using the transaction id.
// sometimes user get stuck at the payment gateway / user internet connection got lost....
const PaymentIPNService = async (req) => {
  try {
    let trxID = req.params.trxID;
    let status = req.body["status"];
    // import "InvoiceModel" at the top
    await InvoiceModel.updateOne(
      { tran_id: trxID },
      { payment_status: status }
    );
    return { status: "success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
//---------------- Invoice List Service function || export this function at the end-------------------//
const InvoiceListService = async (req) => {
  try {
    let user_id = req.headers.user_id; // catch the user_id from  the postman's req header / frontend. || we will get the "user_id" from the "authmiddleware" as after authentication / logging in we have encoded the token with "email" and "user_id".
    // import "InvoiceModel" at the top
    let invoice = await InvoiceModel.find({ userID: user_id }); // getting the invoice list according to the "user_id".
    return { status: "success", data: invoice };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

//---------------- Invoice Product List Service function || export this function at the end-------------------//
const InvoiceProductListService = async (req) => {
  try {
    let user_id = new ObjectID(req.headers.user_id); // catching a specific user. // catch the user_id from  the postman's req header / frontend and converting that to object. || we will get the "user_id" from the "authmiddleware" as after authentication / logging in we have encoded the token with "email" and "user_id".
    let invoice_id = new ObjectID(req.params.invoice_id); // catching a specific user. // catch the invoice_id from  the postman's req header / frontend and converting that to object.

    // matching stage.
    let matchStage = { $match: { userID: user_id, invoiceID: invoice_id } }; // check using user_id and invoice_id. || "invoiceID" this field is in the mongodb "invoiceproducts" collection.
    // joining stage.
    let JoinStageProduct = {
      $lookup: {
        from: "products", // products = db collection name.
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };
    let unwindStage = { $unwind: "$product" };

    // import "InvoiceProductModel" at the top
    // now we will get to see the products list against that invoice.
    let products = await InvoiceProductModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindStage,
    ]);

    return { status: "success", data: products };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

module.exports = {
  CreateInvoiceService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  PaymentSuccessService,
  InvoiceListService,
  InvoiceProductListService,
};
