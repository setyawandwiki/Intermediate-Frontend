import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookingUserId } from "../../stores/action/booking";
import { getAllEvent } from "../../stores/action/event";
import "./mybooking.css";
import Booking from "../../component/Booking";

const MyBooking = () => {
  const dispatch = useDispatch();
  const booking = useSelector((state) => state.booking);
  // const [data, setData] = useState(false);

  useEffect(() => {
    (async () =>
      await dispatch(getBookingUserId(localStorage.getItem("idUser"))))();
    (async () => await dispatch(getAllEvent()))();
    // getAllEventBooking();
  }, []);

  console.log(booking.data);

  // useEffect(() => {
  //   getAllEventBooking();
  // }, [data]);

  // console.log(getAllEventBooking());
  // console.log(booking.data);
  // console.log(event.data);
  return (
    <>
      <div className="col-12 d-flex justify-content-between">
        <p className="">My Booking</p>
        <div className="change--password--month__container">
          <div className="h6 d-flex change--password--month__div gap-3 mt-4 px-3">
            <i className="bi bi-calendar"></i>
            <p style={{ color: "#3366ff", margin: "auto" }}>March</p>
          </div>
        </div>
      </div>
      {booking.data?.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center container--profile--user__size d-flex align-items-center flex-column justify-content-center">
            <p>No Tickets bought</p>
            <p className="text-secondary">
              it appears you havent bought any tickets
            </p>
            <p className="text-secondary">yet. Maybe try searching these?</p>
          </div>
        </div>
      ) : (
        <ul>
          <Booking data={booking.data} />
        </ul>
      )}
    </>
  );
};

export default MyBooking;
