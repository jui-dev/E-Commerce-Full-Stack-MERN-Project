import React from "react";
import { Link } from "react-router-dom";
import pay from "../../assets/images/pay.png";
const Footer = () => {
  return (
    <div>
      {/* -------------------- Footer Upper Portion ------------- */}
      <div className="section-bottom shadow-sm bg-skyblue">
        <div className="container py-5">
          <div className="row">
            {/* ------------- 1. Left side Column (Legals) ------------- */}
            <div className="col-md-4">
              <h1 className="bodyMedium">Legals</h1>
              {/* --------1.1 ( Legals -> About ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </p>
              {/* --------1.2 ( Legals -> Refund Policy ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/refund">
                  Refund Policy
                </Link>
              </p>
              {/* --------1.3 ( Legals -> Privacy Policy ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/privacy">
                  Privacy Policy
                </Link>
              </p>
              {/* --------1.4 ( Legals -> Terms ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/terms">
                  Terms
                </Link>
              </p>
            </div>
            {/* ------------- 2. Middle Column (Information) ------------- */}
            <div className="col-md-4">
              <h1 className="bodyMedium">Information</h1>
              {/* --------2.1 ( Information -> How to buy ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/how-to-buy">
                  How to buy
                </Link>
              </p>
              {/* --------2.2 ( Information -> Contact ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </p>
              {/* --------2.3 ( Information -> Complain ) --------- */}
              <p className="my-2">
                <Link className="nav-link" to="/complain">
                  Complain
                </Link>
              </p>
            </div>
            {/* ------------- 3. Right Side Column (About) ------------- */}
            <div className="col-md-4">
              <h1 className="bodyMedium">About</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum{" "}
              </p>
              {/* import "pay" from the assets */}
              <img className="w-100" src={pay} />
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------- Footer Lower Portion -------------------- */}
      <div className="bg-dark py-3 text-center">
        <p className="text-white bodySmall">All Rights Reserved </p>
      </div>
    </div>
  );
};

export default Footer;
