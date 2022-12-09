import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "./Footer";
import logo from "../assets/signup/logo.png";
import avatar from "../assets/profile/blank.png";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../stores/action/user";

const Header = () => {
  const [token] = useState(localStorage.getItem("token") || "");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(userLogOut());
    alert(user.message);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {!token ? (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <div className="header--mobile__toggle--button">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="" />
              </Link>
              <button
                className="navbar-toggler hamburger"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav w-100 d-lg-flex justify-content-between ">
                <li
                  className="nav-item w-100 d-lg-flex justify-content-lg-end"
                  style={{ flex: 1.3 }}
                >
                  <ul className="d-lg-flex ">
                    <li className="">
                      <Link
                        className="nav-link header--nav__list"
                        to="/"
                        style={{ fontWeight: 600, letterSpacing: "2px" }}
                      >
                        Home
                      </Link>
                    </li>
                    {!user.data?.data?.role === "admin" && (
                      <li>
                        <Link
                          to={"/profile/manageEvent"}
                          className="nav-link px-lg-5 header--nav__list"
                          href="#"
                          style={{ fontWeight: 600, letterSpacing: "2px" }}
                        >
                          Create Event
                        </Link>
                      </li>
                    )}

                    <li>
                      <a
                        className="nav-link header--nav__list"
                        href="#"
                        style={{ fontWeight: 600, letterSpacing: "2px" }}
                      >
                        Location
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  className="nav-item w-100 d-lg-flex justify-content-lg-end"
                  style={{ flex: 1 }}
                >
                  <ul className="d-lg-flex">
                    <li className="button__nav1 text-center">
                      <Link
                        className="button__nav1 nav-link px-5"
                        to="/signin"
                        style={{ fontWeight: 600, letterSpacing: "2px" }}
                      >
                        Log in
                      </Link>
                    </li>
                    <li className="button__nav">
                      <Link
                        className="button__nav btn btn-primary px-5"
                        to="/signup"
                        style={{ fontWeight: 600, letterSpacing: "2px" }}
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-fluid">
            <div className="logo ">
              <Link className="navbar-brand" to="/">
                <img src={logo} alt="" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav w-100 d-lg-flex justify-content-between align-items-center">
                <li
                  className="nav-item w-100 d-lg-flex justify-content-lg-end none__mobile"
                  style={{ flex: 1.3 }}
                >
                  <ul className="d-lg-flex mobile__none">
                    <li>
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    {user.data?.data?.role === "admin" && (
                      <li>
                        <Link
                          to={"/profile/manageEvent"}
                          className="nav-link px-lg-5"
                          href="#"
                        >
                          Create Event
                        </Link>
                      </li>
                    )}

                    <li>
                      <a className="nav-link" href="#">
                        Location
                      </a>
                    </li>
                  </ul>
                </li>
                <li
                  className="nav-item w-100 d-lg-flex justify-content-lg-end"
                  style={{ flex: 1 }}
                >
                  <ul className="d-lg-flex user__nav px-0">
                    <li className="d-flex flex-row-reverse justify-content-lg-center w-100 align-items-center mobile__none header--user--photo__size">
                      <div className="d-flex flex-column pt-3">
                        <p
                          className="dropdown-toggle "
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {user.data?.data?.name ? user.data.data.name : null}
                        </p>
                        <div className="dropdown-menu mt-4">
                          <ul className="p-3">
                            <Link
                              to={"/profile"}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <li
                                style={{ cursor: "pointer" }}
                                className="d-flex gap-3"
                              >
                                <span>
                                  <i className="bi bi-person-circle"></i>
                                </span>
                                <p className="pt-1">Profile</p>
                              </li>
                            </Link>
                            <Link
                              to="/profile/myBooking"
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <li
                                style={{ cursor: "pointer" }}
                                className="d-flex gap-3"
                              >
                                <span>
                                  <i className="bi bi-list-check"></i>
                                </span>
                                <p className="pt-1">My Booking</p>
                              </li>
                            </Link>
                            <Link
                              to={"/profile/myWishlist"}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              <li
                                style={{ cursor: "pointer" }}
                                className="d-flex gap-3"
                              >
                                <span>
                                  <i className="bi bi-heart-fill"></i>
                                </span>
                                <p className="pt-1">My Wishlist</p>
                              </li>
                            </Link>
                            <li
                              style={{ cursor: "pointer" }}
                              className="d-flex gap-3"
                            >
                              <span>
                                <i className="bi bi-gear-fill"></i>
                              </span>
                              <p className="pt-1">Settings</p>
                            </li>
                            <li
                              style={{ cursor: "pointer" }}
                              className="d-flex gap-3 text-danger"
                            >
                              <span>
                                <i className="bi bi-box-arrow-right"></i>
                              </span>
                              <p
                                className="pt-1 text-danger"
                                onClick={handleLogout}
                              >
                                Log out
                              </p>
                            </li>
                          </ul>
                        </div>
                        <p
                          className="text-secondary d-lg-none"
                          style={{ fontWeight: 400 }}
                        >
                          Entrpreneur.ID
                        </p>
                      </div>
                      <img
                        src={
                          !user.data?.data?.image
                            ? avatar
                            : `${process.env.REACT_APP_CLOUDINARY_IMAGE_URL}${user.data?.data?.image}`
                        }
                        alt=""
                        className="img-fluid mx-3 header--photo--user__style bg-dark"
                      />
                    </li>
                    <li
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "2rem",
                      }}
                    >
                      <div className="d-none w-75">
                        <a
                          style={{ textDecoration: "none", color: "black" }}
                          className=""
                          href="#"
                        >
                          John Thompson
                        </a>
                        <p className="text-secondary">Entrpreneur.ID</p>
                      </div>
                      <span
                        className="none__desktop d-none"
                        style={{ marginLeft: "4rem", marginBottom: "1rem" }}
                      >
                        <i className="bi bi-chevron-right"></i>
                      </span>
                    </li>
                  </ul>
                  <ul
                    className="px-5 d-lg-none header--list"
                    style={{ paddingLeft: "5rem" }}
                  >
                    <li className="d-flex gap-5 mt-4">
                      <span>
                        <i className="bi bi-person-circle"></i>
                      </span>
                      <p>Profile</p>
                    </li>
                    <li className="d-flex gap-5 mt-4">
                      <span>
                        <i className="bi bi-list-check"></i>
                      </span>
                      <p>My Booking</p>
                    </li>
                    <li className="d-flex gap-5 mt-4">
                      <span>
                        <i className="bi bi-heart-fill"></i>
                      </span>
                      <p>Settings</p>
                    </li>
                    <li className="d-flex gap-5 mt-4">
                      <span>
                        <i className="bi bi-heart-fill"></i>
                      </span>
                      <p>My Wishlist</p>
                    </li>
                    <li className="d-flex gap-5 mt-4">
                      <span>
                        <i className="bi bi-gear-fill"></i>
                      </span>
                      <p>Settings</p>
                    </li>
                    <li className="d-flex gap-5 mt-4 text-danger">
                      <span style={{ fontWeight: 600 }}>
                        <i className="bi bi-box-arrow-right"></i>
                      </span>
                      <p
                        style={{ fontWeight: 600 }}
                        className="text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}

      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
