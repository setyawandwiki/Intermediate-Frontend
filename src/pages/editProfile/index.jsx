import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import user from "../../assets/profile/Avatar.png";
import { updateDataUser, updateImageUser } from "../../stores/action/user";
import "./index.css";
import noPhoto from "../../assets/profile/blank.png";
// import moment from "moment";

const EditProfile = () => {
  const [disableUsername, setDisableUsername] = useState(true);
  const [disableForm, setDisableForm] = useState(true);
  const [updateImage, setUpdateImage] = useState({ image: "" });
  const [image, setImage] = useState("");

  const userProfile = useSelector((state) => state.user);

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    profession: "",
    nationality: "",
    dateOfBirth: "",
    image: "",
  });

  const handleTogglePhone = (e) => {
    e.preventDefault();
    setDisableForm(false);
  };
  const handleToggleUserName = (e) => {
    e.preventDefault();
    setDisableUsername(false);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    setForm({
      name: userProfile.data?.data?.name,
      username: userProfile.data?.data?.username,
      phoneNumber: userProfile.data?.data?.phoneNumber,
      gender: userProfile.data?.data?.gender,
      profession: userProfile.data?.data?.profession,
      nationality: userProfile.data?.data?.nationality,
      dateOfBirth: userProfile.data?.data?.dateOfBirth,
      image: userProfile.data?.data?.image,
    });
  }, [userProfile]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateDataUser(localStorage.getItem("idUser"), form)).then(() => {
      alert(userProfile.data.msg);
    });
  };

  console.log(userProfile.data);

  const handleChange = (e) => {
    return setForm((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImage = (e) => {
    setUpdateImage({ image: e.target.files[0] });
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  console.log(image);

  const handleUpdateImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", updateImage.image);
    dispatch(updateImageUser(localStorage.getItem("idUser"), formData))
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="col-8 ">
        <div
          className="profile--section-form__container"
          style={{ background: "white", borderRadius: "20px" }}
        >
          <h1>Profile</h1>
          <form className="profile--form--input" onSubmit={handleUpdate}>
            <div className="form-group d-flex align-items-center">
              <label htmlFor="exampleInputEmail1">Name</label>
              <input
                type="text"
                value={form.name}
                className="form-control"
                placeholder="Enter name"
                onChange={handleChange}
                name="name"
              />
            </div>
            <div className="form-group d-flex align-items-center">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                type="text"
                className={`${
                  disableUsername ? "profile--no--border" : "form-control"
                }`}
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                value={form.username}
                disabled={disableUsername}
              />
              {disableUsername && (
                <a
                  onClick={handleToggleUserName}
                  style={{ textDecoration: "none" }}
                  href=""
                >
                  Edit
                </a>
              )}
            </div>
            <div className="form-group d-flex align-items-center">
              <label htmlFor="exampleInputEmail1">email</label>
              <input
                type="email"
                className="profile--no--border w-100"
                placeholder="Enter email"
                name="email"
                onChange={handleChange}
                value={userProfile.data.data?.email}
                disabled
              />
            </div>
            <div className="form-group d-flex align-items-center">
              <label htmlFor="exampleInputEmail1">Phone Number</label>
              <input
                disabled={disableForm}
                type="text"
                onChange={handleChange}
                value={form.phoneNumber}
                className={`${
                  disableForm ? "profile--no--border" : "form-control"
                }`}
                // placeholder="Enter phone number"
                name="phoneNumber"
              />
              {disableForm && (
                <a
                  onClick={handleTogglePhone}
                  href=""
                  style={{ textDecoration: "none" }}
                >
                  Edit
                </a>
              )}
            </div>
            <div
              className="form-group d-flex gap-5"
              name="gender"
              onChange={handleChange}
            >
              <label htmlFor="exampleInputEmail1">Gender</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={form.gender === "Male"}
                  value="Male"
                  name="gender"
                  // checked={gender === "Male"}
                />{" "}
                Male
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={form.gender === "Female"}
                  value="Female"
                  name="gender"
                  // checked={gender === "Male"}
                />{" "}
                Female
              </div>
            </div>
            <div className="form-group d-flex">
              <label htmlFor="">Profession</label>
              <select
                className="custom-select form-control"
                name="profession"
                onChange={handleChange}
                defaultValue={form.profession}
              >
                <option selected disabled>
                  Open this select menu
                </option>
                <option
                  value="programmer"
                  selected={form.profession === "programmer"}
                >
                  programmer
                </option>
                <option
                  value="architect"
                  selected={form.profession === "architect"}
                >
                  architect
                </option>
                <option
                  value="athlete"
                  selected={form.profession === "athlete"}
                >
                  athlete
                </option>
                <option
                  value="musician"
                  selected={form.profession === "musician"}
                >
                  musician
                </option>
              </select>
            </div>
            <div className="form-group d-flex">
              <label htmlFor="">Nationality</label>
              <select
                className="custom-select form-control"
                name="nationality"
                onChange={handleChange}
                defaultValue={form.nationality}
              >
                <option selected>Open this select menu</option>
                <option
                  value="indonesia"
                  selected={form.nationality === "indonesia"}
                >
                  Indonesia
                </option>
                <option
                  value="thailand"
                  selected={form.nationality === "thailand"}
                >
                  Thailand
                </option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="">Birthday Date</label>
              <input
                type="date"
                style={{ border: "none" }}
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="col-4 ">
        <form
          action=""
          encType="multipart/form-data"
          onSubmit={updateImage.image ? handleUpdateImage : ""}
        >
          <div className="profile--change--user--profile__container">
            <label
              className="profile--change--user--profile__container--image"
              htmlFor="file"
            >
              <i className="bi bi-camera-fill fa-2x profile--image__icon"></i>
              {form.image && !image && (
                <img
                  src={`https://res.cloudinary.com/atma-jaya-yogyakarta/image/upload/v1665891304/${userProfile.data?.data?.image}`}
                  alt="user image"
                  className="profile--container--image--user__photo"
                />
              )}
              {!image && !form.image ? (
                <img
                  src={noPhoto}
                  alt="user image"
                  className="profile--container--image--user__photo"
                />
              ) : (
                <img
                  src={image}
                  alt="user image"
                  className={`profile--container--image--user__photo ${
                    image ? "d-block" : "d-none"
                  }`}
                />
              )}
            </label>
            <input
              type="file"
              id="file"
              name="image"
              className="d-none"
              onChange={handleImage}
            />
            {image && <img src={image} alt="view image" className="d-none" />}

            {!updateImage.image ? (
              <label
                htmlFor="file"
                className="btn profile--button--chose--photo__style"
              >
                Choose Photo
              </label>
            ) : (
              <button
                htmlFor="file"
                type="submit"
                className="btn profile--button--chose--photo__style"
              >
                Save
              </button>
            )}

            <p
              style={{
                color: "rgba(55, 58, 66, 0.75)",
                fontSize: "0.9rem",
                fontWeight: 400,
                paddingTop: "2rem",
              }}
            >
              Image size: max, 2 MB
            </p>
            <p
              style={{
                color: "rgba(55, 58, 66, 0.75)",
                fontSize: "0.9rem",
                fontWeight: 400,
                marginTop: 0,
              }}
            >
              Image formats: .JPG, .JPEG, .PNG
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
