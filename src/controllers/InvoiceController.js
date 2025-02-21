const {
  CreateInvoiceService,
  PaymentSuccessService,
  PaymentFailService,
  PaymentCancelService,
  PaymentIPNService,
  InvoiceListService,
  InvoiceProductListService,
} = require("../services/InvoiceServices");

//-------------------- func to create Invoice  ------------------//
exports.CreateInvoice = async (req, res) => {
  let result = await CreateInvoiceService(req); // import the "CreateInvoiceService" at the top and call this function here.
  return res.status(200).json(result);
};

//-------------------- func for successful payment ------------------//
exports.PaymentSuccess = async (req, res) => {
  let result = await PaymentSuccessService(req); // import the "PaymentSuccessService" at the top and call this function here.
  return res.redirect("/orders");
};
//-------------------- func for failed payment  ------------------//
exports.PaymentFail = async (req, res) => {
  let result = await PaymentFailService(req); // import the "PaymentFailService" at the top and call this function here.
  return res.redirect("/orders");
};

//-------------------- func for canceled payment ------------------//
exports.PaymentCancel = async (req, res) => {
  let result = await PaymentCancelService(req); // import the "PaymentCancelService" at the top and call this function here.
  return res.redirect("/orders");
};

//-------------------- func for IPN payment ------------------//
exports.PaymentIPN = async (req, res) => {
  let result = await PaymentIPNService(req); // import the "PaymentIPNService" at the top and call this function here.
  return res.status(200).json(result);
};

//-------------------- func to see the invoice list ------------------//

exports.InvoiceList = async (req, res) => {
  let result = await InvoiceListService(req); // import the "InvoiceListService" at the top and call this function here.
  return res.status(200).json(result);
};
//-------------------- func to see the invoice product list ------------------//
exports.InvoiceProductList = async (req, res) => {
  let result = await InvoiceProductListService(req); // import the "InvoiceProductListService" at the top and call this function here.
  return res.status(200).json(result);
};
