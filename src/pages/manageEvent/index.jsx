import React, { useEffect } from "react";
import "./manageEvent.css";
import { useSelector, useDispatch } from "react-redux";
import { getDataEvent } from "../../stores/action/event";
// import moment from "moment";
import ManageEventComponent from "../../component/ManageEventComponent";

const ManageEvent = () => {
  const event = useSelector((state) => state.event);

  // const [form, setForm] = useState({
  //   price: 0,
  //   date: moment().format("YYYY-MM-DD"),
  // });

  // const [formUpdate, setFormUpdate] = useState({});
  // const [eventId, setEventId] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);
  // const [image, setImage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataEvent());
  }, []);

  // const getAllEvent = () => {
  //   const arr = [];
  //   event.data.forEach((elem) => arr.push(elem.eventId));
  //   console.log(event);
  //   const result = event.data?.filter((elem) => arr.includes(elem.eventId));
  //   // setData(true);
  //   return result;
  // };

  // const handleChangeForm = (e) => {
  //   if (e.target.name === "image") {
  //     setForm({ ...form, [e.target.name]: e.target.files[0] });
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   } else {
  //     setForm({ ...form, [e.target.name]: e.target.value });
  //   }
  // };

  // const handleChangeFormUpdate = (e) => {
  //   if (e.target.name === "image") {
  //     setFormUpdate({ ...formUpdate, [e.target.name]: e.target.files[0] });
  //     setImage(URL.createObjectURL(e.target.files[0]));
  //   } else {
  //     setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
  //   }
  // };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   // formData.append("name", form.name);
  //   for (const data in formUpdate) {
  //     formData.append(data, formUpdate[data]);
  //   }

  //   dispatch(updateEvent(formData, eventId)).then(() => {
  //     // resetFormUpdate();
  //     setTimeout(() => {
  //       dispatch({ type: "RESET_MESSAGE" });
  //       window.location.reload(true);
  //     }, 3000);
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // jika ada inputan tipenya file, maka harus di handle dengan formdata
  //   const formData = new FormData();
  //   // formData.append("name", form.name);
  //   for (const data in form) {
  //     formData.append(data, form[data]);
  //   }

  //   dispatch(createEvent(formData)).then(() => {
  //     resetForm();
  //     setTimeout(() => {
  //       dispatch({ type: "RESET_MESSAGE" });
  //       window.location.reload();
  //     }, 5000);
  //   });
  // };

  // const resetForm = () => {
  //   setForm({
  //     name: "",
  //     category: "",
  //     price: 0,
  //     location: "",
  //     date: moment().format("YYYY-MM-DD"),
  //     image: "",
  //     detail: "",
  //   });
  //   setImage("");
  // };

  // const resetFormUpdate = () => {
  //   setFormUpdate({
  //     name: "",
  //     category: "",
  //     price: 0,
  //     location: "",
  //     date: moment().format("YYYY-MM-DD"),
  //     image: "",
  //     detail: "",
  //   });
  //   setImage("");
  // };

  // console.log(event);

  console.log(event.data);
  return (
    <>
      <div className="col-12 d-flex justify-content-between">
        <p className="">My Booking</p>
        <button
          onClick={() => {}}
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Create
        </button>
      </div>

      {event.data.length === 0 ? (
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
          {/* <div
            className="modal fade"
            id="exampleModalCenter"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered "
              role="document"
            >
              <div className="modal-content" style={{ width: "100vw" }}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Create Event
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {event.message && (
                    <div
                      className={`alert alert-dismissible fade show ${
                        event.isError ? "alert-danger" : "alert-primary"
                      }`}
                      role="alert"
                    >
                      {event.message}
                    </div>
                  )}
                  <form onSubmit={handleSubmit}>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                          onChange={handleChangeForm}
                          type="text"
                          name="name"
                          value={form.name}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">category</label>
                        <input
                          onChange={handleChangeForm}
                          name="category"
                          type="text"
                          value={form.category}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        <input
                          onChange={handleChangeForm}
                          name="location"
                          type="text"
                          value={form.location}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Date Time Show
                        </label>
                        <input
                          onChange={handleChangeForm}
                          type="date"
                          value={form.date}
                          name="date"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Price</label>
                        <input
                          onChange={handleChangeForm}
                          type="text"
                          name="price"
                          value={form.price}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Image</label>
                        <input
                          onChange={handleChangeForm}
                          type="file"
                          name="image"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                        {image && <img src={image} alt="view image" />}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Detail</label>
                      <input
                        onChange={handleChangeForm}
                        type="textarea"
                        value={form.detail}
                        name="detail"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {event.isLoading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only text-white"></span>
                        </div>
                      ) : (
                        <>Submit</>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div
            className="modal fade"
            id="modal-2"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div
              className="modal-dialog modal-dialog-centered "
              role="document"
            >
              <div className="modal-content" style={{ width: "100vw" }}>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">
                    Update Event
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  {event.message && (
                    <div
                      className={`alert alert-dismissible fade show ${
                        event.isError ? "alert-danger" : "alert-primary"
                      }`}
                      role="alert"
                    >
                      {event.message}
                    </div>
                  )}
                  <form onSubmit={handleUpdate}>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input
                          onChange={handleChangeFormUpdate}
                          type="text"
                          name="name"
                          value={formUpdate.name}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">category</label>
                        <input
                          onChange={handleChangeFormUpdate}
                          name="category"
                          type="text"
                          value={formUpdate.category}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Location</label>
                        <input
                          onChange={handleChangeFormUpdate}
                          name="location"
                          type="text"
                          value={formUpdate.location}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Date Time Show
                        </label>
                        <input
                          onChange={handleChangeFormUpdate}
                          type="date"
                          value={formUpdate.date}
                          name="date"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                    </div>
                    <div className="d-flex gap-5">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Price</label>
                        <input
                          onChange={handleChangeFormUpdate}
                          type="text"
                          name="price"
                          value={formUpdate.price}
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Image</label>
                        <input
                          onChange={handleChangeFormUpdate}
                          type="file"
                          name="image"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                        />
                        {image && <img src={image} alt="view image" />}
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Detail</label>
                      <input
                        onChange={handleChangeFormUpdate}
                        type="textarea"
                        value={formUpdate.detail}
                        name="detail"
                        className="form-control"
                        id="exampleInputPassword1"
                        placeholder="Password"
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      {event.isLoading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only text-white"></span>
                        </div>
                      ) : (
                        <>Update</>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div> */}
          <ManageEventComponent data={event.data} event={event} />
          {/* {event.data.map((elem, index) => (
            <li
              key={index}
              className="d-flex py-3"
              style={{ borderBottom: "1px solid rgba(193, 197, 208, 0.25)" }}
            >
              <div
                className="myBooking--date__container text-center"
                style={{ height: "80px" }}
              >
                <p style={{ color: "#FF8900" }}>
                  {moment(elem.dateTimeShow).format("MMM DD YY").split(" ")[1]}
                </p>
                <p
                  style={{
                    color: "#C1C5D0",
                    fontWeight: 500,
                    fontSize: "12px",
                  }}
                >
                  {
                    moment(elem.dateTimeShow)
                      .format("yyyy-ddd-mm")
                      .split("-")[1]
                  }
                </p>
              </div>
              <div className="myBooking--content__container">
                <p>{elem.name}</p>
                <p>{elem.location}</p>
                <p>
                  {
                    moment(elem.dateTimeShow)
                      .format("yyyy-ddd-mm")
                      .split("-")[1]
                  }
                  {`, `}
                  {moment(elem.dateTimeShow.split("T").join(" ")).format(
                    "DD MMM YYYY, h:mm a"
                  )}
                </p>
                <div className="manageBooking--menu--action__style d-flex gap-3">
                  <a href="">Detail</a>
                  <a
                    onClick={() => {
                      setUpdate(elem);
                      // setIsUpdate(true);
                    }}
                    data-toggle="modal"
                    data-target="#modal-2"
                  >
                    Update
                  </a>
                  <a href="" onClick={() => handleDelete(elem.eventId)}>
                    Delete
                  </a>
                </div>
              </div>
              <hr />
            </li> */}
          {/* ))} */}
        </ul>
      )}
    </>
  );
};

export default ManageEvent;
