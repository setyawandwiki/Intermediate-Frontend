import React from "react";
import logo from "../assets/signup/logo.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="container mt-5 footer__detail">
      <div className="row">
        <div className="col-lg-12">
          <div className="footer__section d-flex justify-content-around">
            <div className="footer__section--links w-25">
              <img src={logo} alt="image we ticket" />
              <p className="mt-3" style={{ fontWeight: 500 }}>
                Find events you love with our
              </p>
              <div className="footer__section--social">
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-square-whatsapp"></i>
                <i className="fa-brands fa-square-instagram"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
              <h1 className="h6 footer__title" style={{ fontWeight: 600 }}>
                &#169; 2020 Wetick All Rights Reserved
              </h1>
            </div>
            <div className="footer__Section--wetick text-start">
              <h1 className="h6" style={{ fontWeight: 600 }}>
                Wetick
              </h1>
              <ul className="mt-3 px-0">
                <li>About Us</li>
                <li>Features</li>
                <li>Blog</li>
                <li>Payments</li>
                <li>Mobile App</li>
              </ul>
            </div>
            <div className="footer__Section--wetick">
              <h1 className="h6" style={{ fontWeight: 600 }}>
                Features
              </h1>
              <ul className="mt-3 px-0">
                <li>Booking</li>
                <li>Create Event</li>
                <li>Discover</li>
                <li>Register</li>
              </ul>
            </div>
            <div className="footer__Section--wetick">
              <h1 className="h6" style={{ fontWeight: 600 }}>
                Company
              </h1>
              <ul className="mt-3 px-0">
                <li>Partnership</li>
                <li>Terms of service</li>
                <li>Privacy Policy</li>
                <li>Sitemap</li>
              </ul>
            </div>
            <h1 className="h6 desktop__none" style={{ fontWeight: 600 }}>
              &#169; 2020 Wetick All Rights Reserved
            </h1>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
