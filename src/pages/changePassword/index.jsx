import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../stores/action/user";
import "./changePassword.css";

const ChangePassword = () => {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const dispatch = useDispatch();
  const userPasswordChange = useSelector((state) => state.user);
  console.log(userPasswordChange);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword(localStorage.getItem("idUser"), form))
      .then(() => {
        alert(userPasswordChange.data.msg);
        setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
      })
      .catch(() => {
        alert(userPasswordChange.message);
      });
  };

  console.log(form);
  return (
    <div className="col-12">
      <p>Change Password</p>
      <form className="changepassword--form__component" onSubmit={handleSubmit}>
        <div className="form-group d-flex ">
          <label htmlFor="exampleInputEmail1">Old Password</label>
          <input
            required
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter old password"
          />
        </div>
        <div className="form-group d-flex">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            required
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="enter new password"
          />
        </div>
        <div className="form-group d-flex">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            required
            type="password"
            className="form-control"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            id="exampleInputPassword1"
            placeholder="confirm password"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
