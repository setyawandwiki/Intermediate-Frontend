import React, { useState } from "react";
import axios from "../../utils/axios";

const index2 = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await axios.post("auth/login", form);
      localStorage.setItem("token", result.data.data.token);
      localStorage.setItem("idUser", result.data.data.userId);
      localStorage.setItem("refreshToken", result.data.data.refreshToken);
      alert(result.data.message);
      console.log(result);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };

  const handleChangeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container text-center d-flex flex-column w-25 mt-5">
      <h1>Login Page</h1>
      <br />
      <input
        onChange={handleChangeForm}
        type="email"
        name="email"
        placeholder="input your email..."
        value={form.email}
      />
      <br />
      <div>
        <input
          onChange={handleChangeForm}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="input your password"
          value={form.password}
        />
        <button htmlFor="" onClick={handleShowPassword}>
          {showPassword ? "hide" : "show"} Show password
        </button>
      </div>
      <br />
      <button className="btn btn-primary" onClick={handleLogin}>
        signin
      </button>
    </div>
  );
};

export default index2;
