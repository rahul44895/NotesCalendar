import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4321/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email, password: user.password }),
    });
    const json = await res.json();
    if (res.status === 200) {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("username", json.username);
      navigate("/");
    } else {
      alert(json.msg);
    }
  };
  return (
    <>
      <div
        className="containerLogin"
        style={{
          backgroundImage: `url(${require("../images/loginBG.png")})`,
        }}
      >
        <div className="loginArea">
          <h1 className="text-light">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex flex-column text-light">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                className="form-control"
                onChange={(e) => onChange(e)}
                value={user.email}
              />
            </div>
            <div className="mb-3 d-flex flex-column text-light">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={(e) => onChange(e)}
                value={user.password}
              />
            </div>
            <button className="btn btn-success" type="Submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
