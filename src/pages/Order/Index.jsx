import "./order.css";
import { useState, useEffect } from "react";

import SeatPosition from "../../component/SeatPosition";

import clip1 from "../../assets/order/clip1.png";
import clip2 from "../../assets/order/clip2.png";
import clip3 from "../../assets/order/clip3.png";
import logo from "../../assets/order/LOGO-btn.png";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import currencyFormatter from "currency-formatter";
// import { useNavigate } from "react-router-dom";

// LIST SECTION
// VVIP = VVIP(1...4)-1
// VIP = VIP(1...4)-(1...7)
// REG = REG(1...4)-(1...9)

export default function Order() {
  const [fullSeat, setFullSeat] = useState([]); // DI GUNAKAN UNTUK MENAMPUNG SEAT YANG FULL
  const [activeSeat, setActiveSeat] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SEDANG DIPILIH
  const [dataOrder, setDataOrder] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG SEAT YANG SUDAH TERPILIH
  const [listBooking, setListBooking] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG LIST DATA SEAT YANG SUDAH DI BOOKING
  const [dataEvent, setDataEvent] = useState([]); // DIGUNAKAN UNTUK MENAMPUNG DATA EVENT

  const { state } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    getDataBooking();
    getDataEvent();
  }, []);

  const getDataBooking = async () => {
    // https://www.notion.so/Modul-Booking-293a2b5a8f2b4d09a8e1f25304592c22
    try {
      const res = await axios.get(`/booking/event/${state.eventId}`);
      const data = await res.data;
      let dataFullSeat = data.data.filter((item) => item.statusFull);
      console.log(dataFullSeat);
      dataFullSeat = dataFullSeat.map((item) => item.section);
      setFullSeat(dataFullSeat);
      setListBooking(data.data);
    } catch (error) {
      console.log(error.response);
    }

    console.log(listBooking);
    // const DATADUMMY = {
    //   status: 200,
    //   message: "Success Get Data Section By Event Id",
    //   data: [
    //     {
    //       section: "REG1-1",
    //       booked: 20,
    //       available: 10,
    //       statusFull: false,
    //     },
    //     {
    //       section: "REG1-2",
    //       booked: 15,
    //       available: 15,
    //       statusFull: false,
    //     },
    //     {
    //       section: "REG1-3",
    //       booked: 0,
    //       available: 30,
    //       statusFull: false,
    //     },
    //     {
    //       section: "REG1-4",
    //       booked: 30,
    //       available: 0,
    //       statusFull: true,
    //     },
    //   ],
    // };
    // let dataFullSeat = DATADUMMY.data.filter((item) => item.statusFull);
    // dataFullSeat = dataFullSeat.map((item) => item.section);
    // setFullSeat(dataFullSeat);
    // setListBooking(DATADUMMY.data);
  };

  // console.log(fullSeat);
  // console.log(listBooking);

  // console.log(dataEvent);

  const getDataEvent = async () => {
    // https://www.notion.so/Modul-Event-413ecaad2dd04d4eb0c6c2afc4f50888
    try {
      const res = await axios.get(`/event/${state.eventId}`);
      const data = await res.data;
      console.log(data);
      setDataEvent([data.data]);
    } catch (error) {
      console.log(error.response);
    }
    // const DATADUMMY = {
    //   status: 200,
    //   message: "Success Get Event By Id",
    //   data: [
    //     {
    //       eventId: "e29b8308-d23d-42f0-9071-639403c0c451",
    //       name: "We The Fest",
    //       category: "Music",
    //       location: "Jakarta",
    //       detail: "Lorem ipsum dolor amet",
    //       dateTimeShow: "2022-01-01 10:00:00",
    //       price: 150000,
    //     },
    //   ],
    // };
    // setDataEvent(DATADUMMY.data);
  };

  const handleSelectSeat = (seat) => {
    // PROSES PEMILIHAN SEAT
    const data = seat.split("-");
    if (!fullSeat.includes(seat)) {
      if (activeSeat.includes(seat)) {
        const deleteSeat = activeSeat.filter((item) => item !== seat);
        const deleteDataOrder = dataOrder.filter((item) => item.seat !== seat);
        setActiveSeat(deleteSeat);
        setDataOrder(deleteDataOrder);
      } else {
        setActiveSeat([...activeSeat, seat]);
        setDataOrder([
          ...dataOrder,
          {
            seat,
            qty: 1,
            price: data[0].includes("VVIP")
              ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
              : data[0].includes("VIP")
              ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
              : dataEvent[0].price, // HARGA TIDAK BERUBAH UNTUK REGULAR
          },
        ]);
      }
    }
  };

  const handleOrderSeat = () => {
    // console.log(filterData);
    navigate("/payment", {
      state: {
        eventId: state.eventId,
        data: dataOrder,
      },
    });
  };

  const clearOrderSeat = () => {
    setActiveSeat([]);
    setDataOrder([]);
  };

  const increaseOrderSeat = (section) => {
    const findData = dataOrder.find((item) => item.seat === section.seat);
    const price = section.seat.includes("VVIP")
      ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
      : section.seat.includes("VIP")
      ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
      : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
    findData.qty += 1;
    findData.price = price * findData.qty;
    setDataOrder([...dataOrder]);
  };

  const decreaseOrderSeat = (section) => {
    const findData = dataOrder.find((item) => item.seat === section.seat);
    if (findData.qty === 1) {
      const deleteData = dataOrder.filter((item) => item.seat !== section.seat);
      const deleteSeat = activeSeat.filter((item) => item !== section.seat);
      setDataOrder(deleteData);
      setActiveSeat(deleteSeat);
    } else {
      const price = section.seat.includes("VVIP")
        ? dataEvent[0].price * 3 // HARGA 3 KALI LIPAT UNTUK VVIP
        : section.seat.includes("VIP")
        ? dataEvent[0].price * 2 // HARGA 2 KALI LIPAT UNTUK VIP
        : dataEvent[0].price; // HARGA TIDAK BERUBAH UNTUK REGULAR
      findData.qty -= 1;
      findData.price = price * findData.qty;
      setDataOrder([...dataOrder]);
    }
  };

  const ticketSection = () => {
    if (dataOrder.length > 0) {
      const match = ["REG", "VIP", "VVIP"];
      const mapData = dataOrder.map((elem) => elem.seat.slice(0, -3));
      const filterData = match.filter((elem) => mapData.includes(elem));
      return filterData.join(", ");
    } else {
      return "Empty";
    }
  };

  const quantityOrder = () => {
    const total = dataOrder
      .map((elem) => elem.qty)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    return total;
  };

  // console.log(dataOrder);

  const totalOrder = () => {
    const total = dataOrder
      .map((elem) => elem.price)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);

    return total;
  };

  return (
    <div className="bg-grey">
      <div className="order--main--container">
        <div className="order--card order--container__size">
          <div className="row m-5 order--card--container">
            <div className="col-sm-12 col-md-7 p-0 p-md-4">
              <div className="rotate-seat">
                <SeatPosition
                  width="90%" // MEMBERIKAN BESARAN PADA POLA SEAT
                  height="90%" // MEMBERIKAN TINGGI PADA POLA SEAT
                  fullSeat={fullSeat}
                  activeSeat={activeSeat}
                  handleSelectSeat={handleSelectSeat}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-5 p-0 p-md-4">
              <div className="order--title__container">
                <h4
                  style={{
                    color: "#373A42",
                    fontWeight: 600,
                    letterSpacing: "1px",
                  }}
                >
                  Tickets
                </h4>
                <span>
                  <p
                    style={{
                      color: "#FC1055",
                      fontWeight: 600,
                      letterSpacing: "1px",
                      fontSize: "0.9rem",
                    }}
                  >
                    BY PRICE{" "}
                    <img src={logo} className="order--logo__btn" alt="" />
                  </p>
                </span>
              </div>

              {activeSeat.length > 0 ? (
                <div className="ticket-scrolling">
                  {dataOrder.map((item, index) => {
                    const data = item.seat.split("-");
                    const dataSeat = listBooking.filter(
                      (itemSeat) => itemSeat.section === item.seat
                    );
                    return (
                      <div className="my-3" key={index}>
                        <img
                          src={
                            data[0].includes("VVIP")
                              ? clip3
                              : data[0].includes("VIP")
                              ? clip2
                              : clip1
                          }
                          className="ticket-icon"
                          alt="ticket icon"
                        />
                        <label className="ms-3">
                          <div className="order--section__container d-flex gap-5">
                            <p className="order--section__content">
                              Section {data[0]}, Row {data[1]}
                            </p>
                            <div>
                              <p className="order--section__price">
                                {/* <p>{JSON.stringify(item)}</p> */}
                                {currencyFormatter.format(item.price, {
                                  code: "USD",
                                })}
                              </p>
                              <p className="order--section__price--person">
                                per person
                              </p>
                            </div>
                          </div>
                          <span
                            style={{
                              color: "#BDC0C4",
                              letterSpacing: "1px",
                              fontWeight: 500,
                            }}
                          >
                            <br />[{" "}
                            {dataSeat.length > 0
                              ? dataSeat[0].available
                              : data[0].includes("VVIP")
                              ? 10
                              : data[0].includes("VIP")
                              ? 20
                              : 30}{" "}
                            Seats Available]
                          </span>
                        </label>
                        <br />
                        <div className="order--quantity__container ">
                          <div className="order--quantity__content">
                            <p>Quantity</p>
                          </div>
                          <div className="order--quantity__button ">
                            <button
                              className="btn btn-sm order--quantity--button__style"
                              onClick={() => decreaseOrderSeat(item)}
                            >
                              -
                            </button>
                            <h5 className="d-inline mx-3 order--quantity__style">
                              {item.qty}
                            </h5>
                            <button
                              className="btn btn-sm order--quantity--button__style"
                              onClick={() => increaseOrderSeat(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center h-50">
                  <h6>Select Seat</h6>
                </div>
              )}
              <hr />
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#373A42",
                      letterSpacing: "1px",
                    }}
                  >
                    Ticket Session
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#3366FF",
                    }}
                  >
                    {ticketSection()}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#373A42",
                      letterSpacing: "1px",
                    }}
                  >
                    Quantity
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#3366FF",
                    }}
                  >
                    {quantityOrder()}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 d-flex justify-content-between">
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#373A42",
                      letterSpacing: "1px",
                    }}
                  >
                    Total Payment
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#3366FF",
                    }}
                  >
                    {currencyFormatter.format(totalOrder(), {
                      code: "USD",
                    })}
                  </p>
                </div>
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn"
                  style={{ background: "#3366FF", color: "white" }}
                  onClick={handleOrderSeat}
                  disabled={dataOrder.length === 0}
                >
                  Checkout
                </button>
                <button className="btn btn-danger" onClick={clearOrderSeat}>
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
