import React, { useState } from "react";
import bannerSignup from "../../assets/signup/banner_signup.png";
import logo from "../../assets/signup/logo.png";
import Footer from "../../component/Footer";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import "./signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(true);
  const [toggleShowPasswordConfirm, setToggleShowPasswordConfirm] =
    useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleToggleShowPassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const handleToggleShowPasswordConfirm = () => {
    setToggleShowPasswordConfirm(!toggleShowPasswordConfirm);
  };

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (form.password !== form.passwordConfirm) {
        return toast.error("password and confirm password did not match", {
          theme: "colored",
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      const user = await axios.post("/auth/register", form);
      const data = await user.data;
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
      setForm({ username: "", email: "", password: "", passwordConfirm: "" });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg, {
        theme: "colored",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <>
      <main className="container-fluid">
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
        <div className="row signup">
          <div className="signup__banner col-lg-8 d-lg-flex justify-content-center align-items-center">
            <img src={bannerSignup} className="img-fluid" alt="image signup" />
          </div>
          <div className="signup__form col-lg-4 mt-4">
            <div className="signup__box d-flex justify-content-start sign-up__form--direction">
              <img
                src={logo}
                alt="logo event"
                className="img-fluid signup__form--logo"
              />
              <h1 className="mt-5 signup__title">Sign Up</h1>
              <p className="mt-4">
                Already have an account ? <Link to="/signin">Log in</Link>
              </p>
              <form className="" onSubmit={handleSignUp}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control mt-5"
                    id="fullName"
                    aria-describedby="fullname"
                    placeholder="Full Name"
                    name="username"
                    onChange={handleChange}
                    value={form.username}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    id="password"
                    name="password"
                    type={toggleShowPassword ? "password" : "text"}
                    placeholder="Password"
                    onChange={handleChange}
                    value={form.password}
                    style={{ borderRight: "none" }}
                  />
                  <span
                    onClick={handleToggleShowPassword}
                    className="input-group-text signup__input-field--eye"
                  >
                    <i
                      className={
                        toggleShowPassword
                          ? "bi bi-eye-slash signup__input--pointer"
                          : "bi bi-eye signup__input--pointer"
                      }
                      id="togglePassword"
                    ></i>
                  </span>
                </div>
                <div className="input-group mb-3">
                  <input
                    className="form-control"
                    type={toggleShowPasswordConfirm ? "password" : "text"}
                    id="passwordConfirm"
                    name="passwordConfirm"
                    placeholder="Password Confirm"
                    value={form.passwordConfirm}
                    onChange={handleChange}
                    style={{ borderRight: "none" }}
                  />
                  <span
                    onClick={handleToggleShowPasswordConfirm}
                    className="input-group-text signup__input-field--eye"
                  >
                    <i
                      className={
                        toggleShowPasswordConfirm
                          ? "bi bi-eye-slash signup__input--pointer"
                          : "bi bi-eye signup__input--pointer"
                      }
                      id="togglePassword"
                    ></i>
                  </span>
                </div>
                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Accept terms and condition
                  </label>
                </div>
                <button type="submit" className="btn signup__button text-white">
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
