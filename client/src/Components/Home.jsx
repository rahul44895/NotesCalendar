import React, { useEffect } from "react";
import Calendar from "./Calendar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, []);
  return (
    <div
      style={{
        color: "white",
        position: "relative",
      }}
    >
      <Calendar />
      <div className="overlay"></div>
    </div>
  );
}
