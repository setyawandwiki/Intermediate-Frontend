// import axios from "../../utils/axios";
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import bankLogo from "../../assets/payment/bank logo.png";
import debit from "../../assets/payment/debit.png";
import eMoney from "../../assets/payment/e-money logo.png";
import logoCard from "../../assets/payment/logo card.png";
import retail from "../../assets/payment/retail logo.png";
import { useDispatch, useSelector } from "react-redux";
import "./payment.css";
import { createBooking } from "../../stores/action/booking";
import axios from "../../utils/axios";
import { useEffect, useState } from "react";
import currencyFormatter from "currency-formatter";
import { toast, ToastContainer } from "react-toastify";

const Payment = () => {
  // const [dataOrder] = useState(JSON.parse(localStorage.getItem("order")) || "");
  // const [event, setEvent] = useState({});
  // const { state } = useLocation();
  // console.log(state);
  // // console.log(dataOrder[dataOrder.length - 2].totalPayment);
  // console.log(dataOrder[dataOrder.length - 1].eventId);
  // const getDataEvent = async () => {
  //   try {
  //     console.log("test");
  //     const event = await axios.get(
  //       `/event/${dataOrder[dataOrder.length - 1].eventId}`
  //     );
  //     const data = await event.data;
  //     setEvent(data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     await getDataEvent();
  //   })();
  // }, []);

  const [event, setEvent] = useState("");
  const [form, setForm] = useState({ paymentMethod: "" });

  const getBooking = useSelector((state) => state.booking);
  console.log(getBooking);

  const dispatch = useDispatch();
  const { state } = useLocation();
  // const counterData = useSelector(({ counter }) => counter);
  // console.log(counterData);
  console.log(state);

  const navigate = useNavigate();

  // const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ paymentMethod: e.target.value });
  };

  const getDataByEventId = async () => {
    try {
      const res = await axios.get(`/event/${state.eventId}`);
      const data = await res.data;
      setEvent(data.data.name);
    } catch (error) {
      console.log(error.response);
    }
  };

  const ticketSection = () => {
    if (state.data.length > 0) {
      const match = ["REG", "VIP", "VVIP"];
      const mapData = state.data.map((elem) => elem.seat.slice(0, -3));
      const filterData = match.filter((elem) => mapData.includes(elem));
      return filterData.join(", ");
    } else {
      return "Empty";
    }
  };

  const quantityOrder = () => {
    const total = state.data
      .map((elem) => elem.qty)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    return total;
  };

  const totalOrder = () => {
    const total = state.data
      .map((elem) => elem.price)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    return total;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const newTicketSection = state.data.map((elem) => elem.seat);
    try {
      toast.success("Success create this booking", {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });

      const midtransUrl = await dispatch(
        createBooking({
          section: newTicketSection.join(", "),
          totalPayment: totalOrder(),
          totalTicket: quantityOrder(),
          eventId: state.eventId,
          userId: localStorage.getItem("idUser"),
          paymentMethod: form.paymentMethod,
        })
      );
      window.open(
        midtransUrl.action.payload.data.data.redirectUrl.redirect_url,
        "_blank"
      );

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(form);

  useEffect(() => {
    (async () => await getDataByEventId())();
  });

  return (
    <div className="container bg-white" style={{ borderRadius: "20px" }}>
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
      <form action="" onSubmit={handleCheckout}>
        <div className="row flex-column flex-md-row flex-lg-row margin__top px-0">
          <div
            className="col-12 col-md-6 col-lg-6 payment__method--container"
            onChange={handleChange}
          >
            <p
              className="h3 px-5 pt-5"
              style={{ fontWeight: 600, color: "#5a7184" }}
            >
              Payment Method
            </p>

            <div className="m-5 container__card--logo">
              <input type="radio" id="card" name="drone" value="card" />
              <label className="p-2 w-50" htmlFor="card">
                <img src={logoCard} alt="" /> Card
              </label>
              <span className="arrow__click">
                <i className="bi bi-chevron-up"></i>
              </span>
              <div className="card__booking">
                <img src={debit} alt="debit" />
                <span
                  style={{ border: "1px dotted blue", borderRadius: "10px" }}
                  className="p-3"
                >
                  +
                </span>
              </div>
            </div>

            <div className="m-5 container__card--logo">
              <input type="radio" id="bank" name="drone" value="bank" />
              <label className="p-2 w-50" htmlFor="bank">
                <img src={bankLogo} alt="" /> bank Transfer
              </label>
              <span>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>

            <div className="m-5 container__card--logo">
              <input type="radio" id="retail" name="drone" value="retail" />
              <label className="p-2 w-50" htmlFor="retail">
                <img src={retail} alt="" />
                Retail
              </label>
              <span>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>

            <div className="m-5 container__card--logo">
              <input type="radio" id="e-money" name="drone" value="e-money" />
              <label className="p-2 w-50" htmlFor="e-money">
                <img src={eMoney} alt="" />
                E-money
              </label>
              <span>
                <i className="bi bi-chevron-down"></i>
              </span>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 ticket__detail--container">
            <div className="row">
              <div className="col-12">
                <p
                  className="h3 pt-5 px-4"
                  style={{ fontWeight: 600, color: "#5a7184" }}
                >
                  Ticket Detail
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 px-5">
                <div className="event__detail pt-5 d-flex justify-content-between">
                  <p>Event</p>
                  {/* <p>{event.name}</p> */}
                  <p>{event}</p>
                </div>
                <div className="event__detail d-flex justify-content-between">
                  <p>Ticket Section</p>
                  <p>{ticketSection()}</p>
                </div>
                <div className="event__detail d-flex justify-content-between">
                  <p>Quantity</p>
                  {/* <p>{dataOrder.slice(0, dataOrder.length - 2).length}</p> */}
                  <p>{quantityOrder()}</p>
                </div>
                <div className="event__detail d-flex justify-content-between">
                  <p>Total Payment</p>
                  {/* <p>${dataOrder[dataOrder.length - 2].totalPayment}</p> */}
                  <p>
                    ${" "}
                    {currencyFormatter.format(totalOrder(), {
                      code: "USD",
                    })}
                  </p>
                </div>
                <div>
                  <button
                    href=""
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
