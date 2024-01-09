import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const host = process.env.REACT_APP_HOST;
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${host}/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        email: user.email,
        password: user.password,
      }),
    });
    const json = await res.json();
    if (res.status === 200) {
      localStorage.setItem("authToken", json.authToken);
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
          <h1 className="text-light">SignUp</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex flex-column text-light">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username "
                className="form-control"
                onChange={onChange}
                value={user.username}
              />
            </div>
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
                onChange={onChange}
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
                onChange={onChange}
                value={user.password}
              />
            </div>
            <button className="btn btn-success" type="Submit">
              SignUp
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
