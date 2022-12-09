import React, { useEffect, useState } from "react";
import bannerSignup from "../../assets/signup/banner_signup.png";
import logoSignup from "../../assets/signup/logo.png";
import facebook from "../../assets/signin/facebook.png";
import google from "../../assets/signin/google.png";
import "../Signin/signin.css";
import Footer from "../../component/Footer";
import axios from "../../utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDataUser } from "../../stores/action/user";

const Signin = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const handleToggleShowPassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const dispatch = useDispatch();

  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await axios.post("/auth/login", form);
      const data = await user.data;
      setToken(data.data.token);
      dispatch(getDataUser(data.data.userId));
      localStorage.setItem("idUser", data.data.userId);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      toast.success(data.data.message, {
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
    } catch (error) {
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <main className="container-fluid mb-5">
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
        <div className="row signin">
          <div className="signin__banner col-lg-8 d-lg-flex justify-content-center align-items-center">
            <img src={bannerSignup} className="img-fluid" alt="image signin" />
          </div>
          <div className="signin__form col-lg-4">
            <div className="signin__box d-flex justify-content-center sign-up__form--direction">
              <img
                src={logoSignup}
                alt="logo event"
                className="img-fluid signin__form--logo"
              />
              <h1 className="mt-5 signin__title" style={{ fontWeight: 600 }}>
                Sign In
              </h1>
              <p className="mt-4">Hi, Welcome back to urticket!</p>
              <form className="" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    disabled={isLoading}
                    type="text"
                    className="form-control mt-5"
                    id="username"
                    aria-describedby="username"
                    placeholder="username"
                  />
                </div>
                <div className="mb-3">
                  <input
                    disabled={isLoading}
                    onChange={handleFormChange}
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={form.email}
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    disabled={isLoading}
                    className="form-control"
                    id="password"
                    name="password"
                    type={toggleShowPassword ? "password" : "text"}
                    onChange={handleFormChange}
                    placeholder="Password"
                    value={form.password}
                    style={{ borderRight: "none" }}
                  />
                  <span
                    className="signup__input-field--eye input-group-text signin__input-field--eye"
                    onClick={handleToggleShowPassword}
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className={
                        toggleShowPassword
                          ? "bi bi-eye-slash signin__input--pointer"
                          : "bi bi-eye signin__input--pointer"
                      }
                      id="togglePassword"
                    ></i>
                  </span>
                </div>

                <div className="mb-3 form-check">
                  <h1
                    className="h6"
                    style={{ textAlign: "end", fontWeight: 600 }}
                  >
                    <a href="" style={{ textDecoration: "none" }}>
                      Forgot Password?
                    </a>
                  </h1>
                </div>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="btn signin__button text-white"
                >
                  <h2
                    className="text-white h6 my-0"
                    style={{ fontWeight: "600" }}
                  >
                    Sign In
                  </h2>
                </button>
                <div className="signin__form--another-login text-center mt-5">
                  <p>Or Sign in with</p>
                  <div className="signin__form--single--login mt-3 d-flex justify-content-evenly">
                    <a href="">
                      <img src={google} alt="google image" />
                    </a>
                    <a href="">
                      <img src={facebook} alt="facebook image" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signin;
