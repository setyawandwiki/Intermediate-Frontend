import React, { useEffect, useState } from "react";
import "./detail.css";
// import detailPage from "../../assets/landingPage/card1.jpg";
import bookings from "../../assets/detail/bookings.png";
import map from "../../assets/detail/map.png";
import axios from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";
// import moment from "moment";

const Detail = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [wishList, setWishList] = useState([]);
  const [toggle, setToggle] = useState(wishList.length > 0 || false);
  // const [userWishList, setUserWishList] = useState([]);
  // const [addWishList, setAddWishList] = useState(false);
  const [userId] = useState(localStorage.getItem("idUser") || "");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const getDataEventById = async () => {
    try {
      const res = await axios.get(`/event/${id}`);
      const data = await res.data;
      setEvent(data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const createWishList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post("/wishlist", {
        userId,
        eventId: event.eventId,
      });
      const data = await res.data;
      getWishListId();
      toast.success(data.msg, {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWishList = () => {
    if (wishList.length === 0) {
      createWishList();
    } else {
      deleteWishList();
    }
  };

  const getWishListId = async () => {
    try {
      const res = await axios.get("/wishlist");
      const data = await res.data;
      const wishListId = data.data.filter(
        (elem) => elem.eventId === id && elem.user.userId === userId
      );
      setWishList(wishListId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/order", {
      state: {
        eventId: event.eventId,
      },
    });
  };

  const deleteWishList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.delete(`/wishlist/${wishList[0].wishListId}`);
      toast.success("Success remove this WishList", {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    getDataEventById();
    getWishListId();
  }, [toggle]);

  console.log(wishList);
  return (
    <div
      className="container-fluid detail--mobile__height"
      style={{ background: "#F4F7FF" }}
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      <div className="row detail__container">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="container detail--page__container row px-0">
            {isLoading ? (
              <div className="col-lg-5 px-0 mt-5 col-12 detail--page__container--mobile">
                <div
                  className="detail--card__container"
                  style={{
                    margin: "0 auto",
                    cursor: "pointer",
                    pointerEvents: "none",
                    opacity: 0.7,
                  }}
                  onClick={() => {
                    toggleWishList();
                    handleToggle();
                  }}
                >
                  <img
                    src={`https://res.cloudinary.com/atma-jaya-yogyakarta/image/upload/v1665484897/${event.image}`}
                    alt=""
                  />
                  <div className="detail__overlay"></div>
                  <div className="detail--wishListPage">
                    <div className="detail--wishListPage__content none__desktop d-lg-none">
                      <h1>{event.name}</h1>
                      <div className="detail--wishListPage__container">
                        <i className="bi bi-geo-alt"></i>
                        <p style={{ display: "inline" }}>
                          {event.location}, Indonesia
                        </p>
                      </div>
                      <div className="detail--wishListPage__container">
                        <i className="bi bi bi-clock"></i>
                        <p style={{ display: "inline" }}>
                          {moment(
                            event.dateTimeShow?.split("T").join(" ")
                          ).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                      </div>
                      <div className="detail--wishListPage__container">
                        <p
                          style={{
                            fontWeight: 600,
                            letterSpacing: "1px",
                            color: "#373A42",
                          }}
                        >
                          Attendees
                        </p>
                        <img
                          src={`https://res.cloudinary.com/atma-jaya-yogyakarta/image/upload/v1665484897/${event.image}`}
                          alt=""
                          style={{ width: "10%", cursor: "pointer" }}
                        />
                      </div>
                    </div>
                    <div className="detail--wishListPage__icon none__desktop d-lg-none">
                      <i className="bi-heart m-2"></i>
                    </div>
                  </div>
                </div>
                <div className="detail__addWishList">
                  <div className="text-center detail--card__content mt-4 detail--mobile__none">
                    <i
                      // className={`${
                      //   wishList.length === 0
                      //     ? "bi-heart m-2"
                      //     : "bi-heart-fill m-2"
                      // }`}
                      className={`${
                        wishList.length > 0
                          ? "bi-heart-fill text-danger m-2"
                          : "bi-heart m-2"
                      }`}
                    ></i>
                    <p>Add to Wishlist</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-lg-5 px-0 col-12 detail--page__container--mobile">
                <div
                  className="detail--card__container"
                  style={{
                    margin: "0 auto",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    toggleWishList();
                    handleToggle();
                  }}
                >
                  <img
                    src={`https://res.cloudinary.com/atma-jaya-yogyakarta/image/upload/v1665484897/${event.image}`}
                    alt=""
                  />
                  <div className="detail__overlay"></div>
                  <div className="detail--wishListPage">
                    <div className="detail--wishListPage__content none__desktop d-lg-none">
                      <h1>{event.name}</h1>
                      <div className="detail--wishListPage__container">
                        <i className="bi bi-geo-alt"></i>
                        <p style={{ display: "inline" }}>{event.location}</p>
                      </div>
                      <div className="detail--wishListPage__container">
                        <i className="bi bi bi-clock"></i>
                        <p style={{ display: "inline" }}>
                          {moment(
                            event.dateTimeShow?.split("T").join(" ")
                          ).format("MMMM Do YYYY, h:mm:ss a")}
                        </p>
                      </div>
                      <div className="detail--wishListPage__container">
                        <p
                          style={{
                            fontWeight: 600,
                            letterSpacing: "1px",
                            color: "#373A42",
                          }}
                        >
                          Attendees1
                        </p>
                      </div>
                    </div>
                    <div className="detail--wishListPage__icon none__desktop d-lg-none">
                      <i
                        className={`${
                          wishList.length > 0
                            ? "bi-heart-fill text-danger m-2"
                            : "bi-heart m-2"
                        }`}
                      ></i>
                    </div>
                  </div>
                </div>
                <div className="detail__addWishList">
                  <div className="text-center detail--card__content mt-4 detail--mobile__none">
                    <i
                      // className={`${
                      //   wishList.length === 0
                      //     ? "bi-heart m-2"
                      //     : "bi-heart-fill m-2"
                      // }`}
                      className={`${
                        wishList.length > 0
                          ? "bi-heart-fill text-danger m-2"
                          : "bi-heart m-2"
                      }`}
                    ></i>
                    <p>Add to Wishlist</p>
                  </div>
                </div>
              </div>
            )}
            <div
              className="col-lg-7 col-12 mt-5 detail--page__container--mobile2"
              style={{ paddingRight: "5rem" }}
            >
              <div className="row">
                <div className="col-12 detail--title__size detail--mobile__none">
                  <h1>{event.name}</h1>
                </div>
              </div>
              <div className="row my-4 ">
                <div className="col-6 detail--mobile__none">
                  <div className="detail--content--icon__container">
                    <i className="bi bi-geo-alt"></i>
                    <p style={{ display: "inline" }}>{event.location}</p>
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="detail--content--icon__container detail--mobile__none">
                    <i className="bi bi bi-clock"></i>
                    <p style={{ display: "inline" }}>
                      {moment(event.dateTimeShow?.split("T").join(" ")).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row ">
                <div className="col-12  detail--mobile__none">
                  <p
                    style={{
                      fontWeight: 600,
                      letterSpacing: "1px",
                      color: "#373A42",
                    }}
                  >
                    Attendees
                  </p>
                </div>
              </div>
              <div className="row mb-2 ">
                <div className="col-12 detail--mobile__none">
                  <img src={bookings} alt="" />
                  <hr
                    className="mt-4"
                    style={{ width: "80%", color: "#C1C5D0" }}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p
                    style={{
                      letterSpacing: "1.3px",
                      fontWeight: 600,
                      fontSize: "1.5rem",
                      color: "#373A42",
                    }}
                  >
                    Event Detail
                  </p>
                  <p
                    style={{
                      fontWeight: 400,
                      color: "rgba(55, 58, 66, 0.75)",
                      letterSpacing: "1px",
                      lineHeight: "20px",
                      fontSize: "0.82rem",
                    }}
                  >
                    {event.detail}
                  </p>
                  <a
                    href=""
                    style={{
                      textDecoration: "none",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                      color: "#3366FF",
                      fontSize: "0.82rem",
                    }}
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4">
                  <p
                    style={{
                      color: "#373A42",
                      fontWeight: 600,
                      fontSize: "1.5rem",
                      letterSpacing: "1px",
                    }}
                  >
                    Location
                  </p>
                  <img src={map} alt="" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 my-4">
                  <a
                    onClick={handleNavigate}
                    className="btn detail--button__style"
                  >
                    Buy Tickets
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
