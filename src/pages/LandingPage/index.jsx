import React, { useEffect, useState } from "react";
import "./landingPage.css";
import rectangle from "../../assets/landingPage/rectangle.png";
import partners from "../../assets/landingPage/partners.png";
import card1 from "../../assets/landingPage/card1.jpg";
import gambar1 from "../../assets/landingPage/gambar1.jpg";
import gambar2 from "../../assets/landingPage/gambar1.jpg";
import gambar3 from "../../assets/landingPage/gambar3.jpg";
import gambar4 from "../../assets/landingPage/gambar4.jpg";
import gambar5 from "../../assets/landingPage/gambar5.jpg";
import gambar6 from "../../assets/landingPage/gambar6.jpg";
import gambar7 from "../../assets/landingPage/gambar7.jpg";
import bookings from "../../assets/landingPage/bookings.png";
import partner1 from "../../assets/landingPage/partner1 (1).png";
import partner2 from "../../assets/landingPage/partner1 (2).png";
import partner4 from "../../assets/landingPage/partner1 (3).png";
import logoSignUp from "../../assets/signup/banner_signup.png";
import elipse1 from "../../assets/landingPage/Ellipse 4.png";
import ellipse3 from "../../assets/landingPage/Ellipse 3.png";
import elipse2 from "../../assets/landingPage/Ellipse 4(1).png";
import latestEllipse from "../../assets/landingPage/latest_ellipse.png";
import latestEllipse2 from "../../assets/landingPage/latest_ellipse2.png";
import latestEllipse3 from "../../assets/landingPage/latest_ellipse3.png";
import partnersEllipse from "../../assets/landingPage/partners_ellipse.png";
import partnersEllipse2 from "../../assets/landingPage/partners_ellipse2.png";
import partnersEllipse3 from "../../assets/landingPage/partners_ellipse3.png";
import moment from "moment";
import axios from "../../utils/axios";
// import { LinkContainer } from "react-router-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const LandingPage = () => {
  const [dateShow, setDateShow] = useState(moment().format("YYYY-MM-DD")); // 2022-10-04
  const [listDateShow, setListDateShow] = useState([]);
  const [event, setEvent] = useState([]);
  const [searchEvent, setSearchEvent] = useState("");
  const [sort, setSort] = useState("sort");

  useEffect(() => {
    generateDate();
  }, [dateShow]);

  const generateDate = () => {
    let listDate = [
      moment(dateShow).subtract(2, "days"),
      moment(dateShow).subtract(1, "days"),
      dateShow,
      moment(dateShow).subtract(-1, "days"),
      moment(dateShow).subtract(-2, "days"),
    ];
    setListDateShow(listDate);
  };

  const selectDate = (date) => {
    setDateShow(date);
  };

  const nextDate = () => {
    setDateShow(moment(dateShow).subtract(-1, "days"));
  };

  const prevDate = () => {
    setDateShow(moment(dateShow).subtract(1, "days"));
  };

  const handleSearchChange = (e) => {
    setSearchEvent(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getDataEvent();
    setSearchEvent("");
  };

  const getDataEvent = async () => {
    try {
      const event = await axios.get(
        `/event?page=1&limit=5&searchName=${searchEvent}&searchDateShow=${dateShow}&sort=name ${sort}`
      );
      const data = await event.data;
      setEvent(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataEvent();
  }, [dateShow]);

  console.log(sort);
  // console.log(process.env.REACT_APP_CLOUDINARY_IMAGE_URL);

  return (
    <>
      <main className="container-fluid px-0" style={{ overflow: "hidden" }}>
        <div className="row mx-0">
          <div
            className="col-12 px-0 landingPage__banner--container w-100"
            style={{ background: "#3366ff" }}
          >
            <img
              src={elipse1}
              className="landingPage__banner--ellipse1"
              alt="elipse"
            />
            <img
              src={elipse2}
              className="landingPage__banner--ellipse2"
              alt="elipse"
            />
            <img
              src={ellipse3}
              className="landingPage__banner--ellipse3"
              alt="elipse"
            />
            <img
              src={logoSignUp}
              className="landingPage__banner--size"
              alt="image home banner"
            />
            <div className="row mx-0 landingPage--banner__content w-100">
              <div className="col-lg-6 landingPage--banner__container">
                <h2
                  className="h1 text-white banner__title"
                  style={{ fontWeight: 600, fontSize: "5rem" }}
                >
                  Find events you love with our
                </h2>
                <form
                  className="landingPaage--from__size"
                  action=""
                  onSubmit={handleSearch}
                >
                  <div className="input-group w-75 mt-5 home__banner--search w-100">
                    <span
                      className="input-group-text bg-white landingPage--form__span--icon"
                      style={{
                        borderTopLeftRadius: "12px",
                        borderBottomLeftRadius: "12px",
                      }}
                    >
                      <i
                        className="bi bi-search"
                        style={{
                          fontSize: "0.85rem",
                          color: "#C1C5D0",
                          opacity: "75%",
                        }}
                        id="togglePassword"
                      ></i>
                    </span>
                    <input
                      className="form-control landingPage--form--input__size"
                      id="event"
                      name="event"
                      type="text"
                      value={searchEvent}
                      onChange={handleSearchChange}
                      placeholder="Search Event ..."
                      style={{ borderLeft: "none", borderRight: "none" }}
                    />
                    <span
                      className="input-group-text bg-white landingPage--form__span--icon"
                      style={{ background: "white" }}
                    >
                      <i
                        className="bi bi-geo-alt"
                        style={{
                          fontSize: "0.85rem",
                          color: "#C1C5D0",
                          opacity: "75%",
                        }}
                        id="togglePassword"
                      ></i>
                    </span>
                    <select
                      defaultValue={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="form-select landingPage--form--input__size"
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Where ?"
                      style={{ borderLeft: "none", borderRight: "none" }}
                    >
                      <option disabled value="sort">
                        Sort
                      </option>
                      <option value="asc">Latest</option>
                      <option value="desc">Oldest</option>
                    </select>
                    <button
                      type="submit"
                      className="input-group-text bg-white landingPage--form__span--icon"
                      style={{
                        // background: "blue",
                        borderBottomRightRadius: "12px",
                        borderTopRightRadius: "12px",
                      }}
                    >
                      <i
                        className="bi text-white bi-arrow-right pb-2 pt-1 px-2 rounded-2"
                        id="togglePassword"
                        style={{ background: "#FF3D71" }}
                      ></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-lg-6"></div>
            </div>
          </div>
        </div>
      </main>
      <div className="container landing__main my-5">
        <div className="row">
          <div className="col-12 text-center landing__main--title">
            <p
              style={{
                background: "rgba(255, 61, 113, 0.25)",
                color: "#FF3D71",
                padding: "0.5rem",
                fontSize: "0.8rem",
                fontWeight: "600",
                letterSpacing: "5px",
              }}
              className="landpage--date__event h6"
            >
              EVENT
            </p>
          </div>
        </div>
        <div className="row px-0 mx-0">
          <div className="col-12 mt-2 landing__main--titl px-0 mx-0">
            <span className="h2" style={{ fontWeight: 600, color: "#333333" }}>
              Events For You
            </span>
          </div>
        </div>
        <div className="row mt-5 container__date text-center">
          <div className="col-6 px-0">
            <div className="home__date d-flex gap-3">
              <div
                onClick={prevDate}
                className="arrow__container--home d-flex justify-content-center align-items-center"
              >
                <span className="landingPage__arrow--button d-flex mobile__none justify-content-center align-items-center">
                  <i className="bi bi-arrow-left"></i>
                </span>
              </div>
              <ul className="d-flex gap-4 align-items-center px-0 landingPage--date__unordered">
                {listDateShow.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      margin: "0 10px",
                      color: "#c1c5d0",
                      border: "none",
                      cursor: "pointer",
                    }}
                    className={index === 2 ? "active" : ""}
                    onClick={() => {
                      selectDate(moment(item).format("YYYY-MM-DD"));
                    }}
                  >
                    <div className="text-center px-3 pt-2 pb-3">
                      {moment(item).format("DD")}
                    </div>
                    <div className="text-center">
                      {moment(item).format("ddd")}
                    </div>
                  </li>
                ))}
              </ul>

              <div
                onClick={nextDate}
                className="arrow__container--home d-flex justify-content-center align-items-center"
              >
                <span className="landingPage__arrow--button d-flex mobile__none justify-content-center align-items-center">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
            <div className="container__arrow--mobile d-flex justify-content-center gap-5">
              <div className="arrow__container--mobile d-flex d-lg-none justify-content-center align-items-center">
                <span className="landingPage__arrow--button  d-flex justify-content-center align-items-center">
                  <i className="bi bi-arrow-left"></i>
                </span>
              </div>
              <div className="arrow__container--mobile d-flex d-lg-none justify-content-center align-items-center">
                <span className="landingPage__arrow--button  d-flex justify-content-center align-items-center">
                  <i className="bi bi-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="col-6 landingPage--date__container">
            <span
              className="h6 landingPage--home__calendar d-flex text-center gap-3 mt-4 px-3"
              style={{ marginLeft: "auto" }}
            >
              <i
                className="bi  bi-calendar"
                style={{
                  margin: "auto",
                }}
              ></i>
              <p style={{ color: "#3366ff", margin: "auto" }}>March</p>
            </span>
          </div>
        </div>
        <div className="row mt-5">
          <div
            className="col-12 d-flex gap-5 home__cards--container"
            style={{
              width: "100vw",
              // height: "130px",
              overflowX: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {event?.length === 0 ? (
              <div className="col-12 d-flex gap-5 landingPage--cards__container">
                <div
                  className="card landingPage--cards__image"
                  style={{ borderRadius: "50px" }}
                >
                  <img
                    src={gambar1}
                    className="card-img landingPage--card__img"
                    alt="image card 1"
                    style={{ borderRadius: "50px" }}
                  />
                  <div className="overlay"></div>
                  <div className="card-img-overlay landingPage--cards__content">
                    <p className="card-text text-white">Wed, 15 Nov, 4:00 PM</p>
                    <h5
                      className="card-title text-white"
                      style={{ letterSpacing: "0.5px", fontWeight: "700" }}
                    >
                      Sights & Sounds Exhibition
                    </h5>
                    <img
                      src={bookings}
                      className="img-fluid w-25 pb-3"
                      alt="bookings image"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="col-12 d-flex gap-5 landingPage--cards__container">
                {event?.map((elem) => (
                  <LinkContainer
                    key={elem.eventId}
                    // className="card cards__image w-25"
                    to={`/detail/${elem.eventId}`}
                    className="test"
                    style={{ borderRadius: "50px" }}
                  >
                    <div
                      className="card landingPage--cards__image"
                      style={{ borderRadius: "50px" }}
                    >
                      <img
                        src={`${process.env.REACT_APP_CLOUDINARY_IMAGE_URL}${elem.image}`}
                        className="card-img landingPage--card__img h-100"
                        alt="image card 1"
                        style={{ borderRadius: "32px" }}
                      />
                      <div className="overlay "></div>
                      <div className="card-img-overlay landingPage--cards__content">
                        <p className="card-text text-white p">
                          {moment(
                            elem.dateTimeShow.split("T").join(" ")
                          ).format("MMM Do YYYY, h:mm a")}
                        </p>
                        <h5
                          className="card-title text-white"
                          style={{ letterSpacing: "0.5px", fontWeight: "700" }}
                        >
                          {elem.name}
                        </h5>
                        <img
                          src={bookings}
                          className="img-fluid w-25 pb-3"
                          alt="bookings image"
                        />
                      </div>
                    </div>
                    {/* <div className="card cards__image w-25 text-bg-dark">
                    <img
                      src={`https://res.cloudinary.com/atma-jaya-yogyakarta/image/upload/v1665028925/${elem.image}`}
                      className="card-img"
                      alt="image card 1"
                      style={{ borderRadius: "50px" }}
                      />
                    <div className="overlay"></div>
                    <div className="card-img-overlay cards__text">
                    <p className="card-text text-white">
                        {elem.dateTimeShow.split("T").join(" ")}
                      </p>
                      <h5
                        className="card-title"
                        style={{ letterSpacing: "0.5px", fontWeight: "700" }}
                      >
                      {elem.name}
                      </h5>
                      <img
                      src={bookings}
                        className="img-fluid w-25 pb-3"
                        alt="bookings image"
                      />
                    </div>
                  </div> */}
                  </LinkContainer>
                ))}
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-12 text-center mt-5">
              <a className="btn landingPage--button__seeAll" href="">
                See All
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container my-5" style={{ overflow: "hidden" }}>
        <div
          className="row discover__event--container"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div
            style={{ backgroundImage: ` url(${rectangle})` }}
            className="col-lg-12 discover__event--background d-lg-flex flex-lg-column justify-content-evenly"
          >
            <div className="row">
              <div className="col-lg-12 p-5">
                <span className="title__discover text-white">
                  &#8212; PARTNER
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 landingPage--disocverEvents__container">
                <img
                  src={latestEllipse}
                  className="landingPage--ellipse__events"
                  alt=""
                />
                <img
                  src={latestEllipse2}
                  className="landingPage--ellipse__events2"
                  alt=""
                />
                <img
                  src={latestEllipse3}
                  className="landingPage--ellipse__events3"
                  alt=""
                />
                <div
                  className=" d-lg-flex justify-content-lg-around event"
                  style={{ zIndex: "99999 !important" }}
                >
                  <p
                    className="h2 text-white "
                    style={{ flex: 0.38, fontWeight: 600, lineHeight: "3rem" }}
                  >
                    Discover Events Near Your
                  </p>
                  <div className="landinPage--image__discover--events text-center">
                    <img
                      src={gambar1}
                      className="discover__border--image"
                      alt="image 1"
                    />
                    <p className="text-white" style={{ fontWeight: 500 }}>
                      Jakarta
                    </p>
                  </div>
                  <div className="landinPage--image__discover--events text-center">
                    <img
                      src={gambar2}
                      className="discover__border--image"
                      alt="image 2"
                    />
                    <p className="text-white" style={{ fontWeight: 500 }}>
                      Bandung
                    </p>
                  </div>
                  <div className="landinPage--image__discover--events text-center">
                    <img
                      src={gambar3}
                      className="discover__border--image"
                      alt="image 3"
                    />
                    <p className="text-white" style={{ fontWeight: 500 }}>
                      Bali
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div
                className="col-lg-12 d-lg-flex justify-content-lg-around event1"
                style={{ zIndex: 99999 }}
              >
                <div className="landinPage--image__discover--events text-center">
                  <img
                    src={gambar4}
                    className="discover__border--image"
                    alt="image 1"
                  />
                  <p className="text-white" style={{ fontWeight: 500 }}>
                    Aceh
                  </p>
                </div>
                <div className="landinPage--image__discover--events text-center">
                  <img
                    src={gambar5}
                    className="discover__border--image"
                    alt="image 1"
                  />
                  <p className="text-white" style={{ fontWeight: 500 }}>
                    Solo
                  </p>
                </div>
                <div className="landinPage--image__discover--events text-center">
                  <img
                    src={gambar6}
                    className="discover__border--image"
                    alt="image 2"
                  />
                  <p className="text-white" style={{ fontWeight: 500 }}>
                    Yogyakarta
                  </p>
                </div>
                <div className="landinPage--image__discover--events text-center">
                  <img
                    src={gambar7}
                    className="discover__border--image"
                    alt="image 3"
                  />
                  <p className="text-white" style={{ fontWeight: 500 }}>
                    Semarang
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <a
                  href=""
                  style={{ color: "#3366ff", fontWeight: 600 }}
                  className="btn bg-white padding__button"
                >
                  See All
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container" style={{ overflowX: "scroll" }}>
        <div className="row">
          <div className="col-12 text-center mt-5">
            <span
              className="mt-5 px-5 py-2"
              style={{
                background: "rgba(255, 61, 113, 0.25)",
                color: "#FF3D71",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              &#8212; CATEGORY
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-5">
            <p className="h2" style={{ fontWeight: 600, color: "#373a42" }}>
              Browse Events By Category
            </p>
          </div>
        </div>
        <div className="row" style={{ overflowX: "scroll" }}>
          <div className="col-12">
            <ul className="d-flex px-0 justify-content-around mt-5 nav__events--category">
              <li>Music</li>
              <li>Arts</li>
              <li>Outdoors</li>
              <li>Workshop</li>
              <li>Sport</li>
              <li>Festival</li>
              <li>Fashion</li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div
            className="col-12 d-flex justify-content-center container__event gap-3 mt-5 "
            style={{ overflow: "scroll" }}
          >
            <span className="home__arrow--button mobile__none d-flex justify-content-center align-items-center ">
              <i className="bi bi-arrow-left"></i>
            </span>
            <div
              className="card card__second w-sm-100"
              style={{ width: "18rem", border: "20px" }}
            >
              <img
                src={card1}
                className="card-img-top laindPage--main__card--second"
                alt="gambar card 1"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <div
                className="card-body card-bg bg-primary"
                style={{
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <img
                  src={bookings}
                  className="card__bookings"
                  alt="card bookings"
                />
                <p
                  className="card-text text-white"
                  style={{
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    letterSpacing: "2px",
                  }}
                >
                  Wed, 15 Nov, 4:00 PM
                </p>
                <p
                  className="h4 text-white"
                  style={{ fontWeight: 600, letterSpacing: "2px" }}
                >
                  Sights & Sounds Exhibition
                </p>
              </div>
            </div>
            <div
              className="card card__second"
              style={{ width: "18rem", border: "20px" }}
            >
              <img
                src={card1}
                className="card-img-top laindPage--main__card--second"
                alt="gambar card 1"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <div
                className="card-body card-bg bg-primary"
                style={{
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <img
                  src={bookings}
                  className="card__bookings"
                  alt="card bookings"
                />
                <p
                  className="card-text text-white"
                  style={{
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    letterSpacing: "2px",
                  }}
                >
                  Wed, 15 Nov, 4:00 PM
                </p>
                <p
                  className="h4 text-white"
                  style={{ fontWeight: 600, letterSpacing: "2px" }}
                >
                  Sights & Sounds Exhibition
                </p>
              </div>
            </div>
            <div
              className="card card__second"
              style={{ width: "18rem", border: "20px" }}
            >
              <img
                src={card1}
                className="card-img-top laindPage--main__card--second"
                alt="gambar card 1"
                style={{
                  borderTopLeftRadius: "20px",
                  borderTopRightRadius: "20px",
                }}
              />
              <div
                className="card-body card-bg bg-primary"
                style={{
                  borderBottomLeftRadius: "20px",
                  borderBottomRightRadius: "20px",
                }}
              >
                <img
                  src={bookings}
                  className="card__bookings"
                  alt="card bookings"
                />
                <p
                  className="card-text text-white"
                  style={{
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    letterSpacing: "2px",
                  }}
                >
                  Wed, 15 Nov, 4:00 PM
                </p>
                <p
                  className="h4 text-white"
                  style={{ fontWeight: 600, letterSpacing: "2px" }}
                >
                  Sights & Sounds Exhibition
                </p>
              </div>
            </div>

            <span className="home__arrow--button mobile__none d-flex justify-content-center align-items-center">
              <i className="bi bi-arrow-right"></i>
            </span>
          </div>
          <div className="container__arrow--mobile d-flex justify-content-center gap-5 mb-5">
            <div className="arrow__container--mobile d-flex d-lg-none justify-content-center align-items-center">
              <span className="home__arrow--button d-flex justify-content-center align-items-center">
                <i className="bi bi-arrow-left"></i>
              </span>
            </div>
            <div className="arrow__container--mobile d-flex d-lg-none justify-content-center align-items-center">
              <span className="home__arrow--button d-flex justify-content-center align-items-center">
                <i className="bi bi-arrow-right"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${partners})` }}
        className="container-fluid partners__background"
      >
        <img
          src={partnersEllipse}
          className="landingPage--partners--ellipse__image1"
          alt=""
        />
        <img
          src={partnersEllipse2}
          className="landingPage--partners--ellipse__image2"
          alt=""
        />
        <img
          src={partnersEllipse3}
          className="landingPage--partners--ellipse__image3"
          alt=""
        />
        <div className="row">
          <div className="col-12"></div>
          <div className="col-12 text-center mt-5">
            <span className="title__discover text-white">&#8212; PARTNER</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-5">
            <p
              className="h2 text-white text-center"
              style={{ fontWeight: 600, letterSpacing: "1px" }}
            >
              Our Trusted Partners
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-5">
            <p className="h6 text-center" style={{ color: "#C1C5D0" }}>
              By Companies like :
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mt-5 d-lg-flex  justify-content-evenly home__partners--flex">
            <img src={partner1} alt="" />
            <img src={partner2} alt="" />
            <img src={partner4} alt="" />
            <img src={partner2} alt="" />
            <img src={partner1} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
