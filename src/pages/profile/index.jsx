import React, { useEffect, useState } from "react";
import "./profile.css";
import user1 from "../../assets/profile/Avatar.png";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDataUser, userLogOut } from "../../stores/action/user";
import { getDataEvent } from "../../stores/action/event";

const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const [isActive, setIsActive] = useState("main");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleIsActive = (toggle) => {
    setIsActive(toggle);
  };

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataUser(localStorage.getItem("idUser")));
  }, []);

  const handleLogout = async () => {
    dispatch(userLogOut());
    alert("succes log out");
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "#F4F7FF", height: "210vh !important" }}
    >
      <div className="row" style={{ height: "130vh" }}>
        <div className="col-12 col-md-3 col-lg-3 profile--page__container">
          <div className="profile--foto__container d-flex justify-content-between">
            <div
              className="profile--user--photo__container "
              style={{ flex: 1 }}
            >
              <img
                src={
                  !user.data?.data?.image
                    ? user1
                    : `${process.env.REACT_APP_CLOUDINARY_IMAGE_URL}${user.data?.data?.image}`
                }
                alt="user"
                className="img-fluid h-100 w-75 profile--user__photo"
              />
            </div>
            <div className="profile--user__container" style={{ flex: 3 }}>
              <p>{user.data.data?.name}</p>
              <p className="">
                {user.data.data?.profession}, {user.data.data?.nationality}
              </p>
            </div>
          </div>
          <div className="profile--list--menu__container">
            <ul className="profile--list--menu__button">
              <li>
                <span onClick={handleToggle}>
                  <i className="bi bi-person-circle"></i>
                  <p style={{ display: "inline" }}>Profile</p>
                </span>
                {toggle && (
                  <ul className="profile--detail--menus__button">
                    <Link to="/profile/edit" style={{ textDecoration: "none" }}>
                      <li
                        onClick={() => {
                          handleIsActive("edit");
                          dispatch(getDataUser(localStorage.getItem("idUser")));
                        }}
                      >
                        <i
                          className={`bi bi-pen-fill ${
                            isActive === "edit" ? "text-primary" : ""
                          }`}
                        ></i>
                        <p
                          style={{ display: "inline" }}
                          className={isActive === "edit" ? "text-primary" : ""}
                        >
                          {" "}
                          Edit Profile
                        </p>
                      </li>
                    </Link>
                    <Link
                      to="/profile/changePassword"
                      style={{ textDecoration: "none" }}
                    >
                      <li onClick={() => handleIsActive("change")}>
                        <i
                          className={`bi bi-unlock-fill ${
                            isActive === "change" ? "text-primary" : ""
                          }`}
                        ></i>
                        <p
                          style={{ display: "inline" }}
                          className={
                            isActive === "change" ? "text-primary" : ""
                          }
                        >
                          Change Password
                        </p>
                      </li>
                    </Link>
                  </ul>
                )}
              </li>
              {user.data?.data?.role === "admin" && (
                <Link
                  to="/profile/manageEvent"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    handleIsActive("manage");
                    dispatch(getDataEvent());
                  }}
                >
                  <li>
                    <span>
                      <i
                        className={`bi bi-plus-circle-fill ${
                          isActive === "manage" ? "text-primary" : ""
                        }`}
                      ></i>
                      <p
                        style={{ display: "inline" }}
                        className={isActive === "manage" ? "text-primary" : ""}
                      >
                        Create Event
                      </p>
                    </span>
                  </li>
                </Link>
              )}

              <Link
                to="/profile/myBooking"
                style={{ textDecoration: "none" }}
                onClick={() => handleIsActive("book")}
              >
                <li>
                  <span>
                    <i
                      className={`bi bi-list-check ${
                        isActive === "book" ? "text-primary" : ""
                      }`}
                    ></i>
                    <p
                      style={{ display: "inline" }}
                      className={isActive === "book" ? "text-primary" : ""}
                    >
                      My Booking
                    </p>
                  </span>
                </li>
              </Link>
              <Link
                to="/profile/myWishlist"
                style={{ textDecoration: "none" }}
                onClick={() => handleIsActive("wishlist")}
              >
                <li>
                  <span>
                    {" "}
                    <i
                      className={`bi bi-heart-fill ${
                        isActive === "wishlist" ? "text-primary" : ""
                      }`}
                    ></i>
                    <p
                      style={{ display: "inline" }}
                      className={isActive === "wishlist" ? "text-primary" : ""}
                    >
                      My Wishlist
                    </p>
                  </span>
                </li>
              </Link>
              <li>
                <span>
                  <i className="bi bi-gear-fill"></i>
                  <p style={{ display: "inline" }}>Settings</p>
                </span>
              </li>
              <li>
                <span>
                  <i className="bi bi-box-arrow-right"></i>
                  <p style={{ display: "inline" }} onClick={handleLogout}>
                    Logout
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-9 col-lg-9  profile--page__container">
          <div className="container bg-white profile--container--right__size">
            <div className="row container--for-profile">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
