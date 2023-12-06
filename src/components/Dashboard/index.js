// DashboardPage.js
import React, { useEffect, useState } from "react";

import PieChartDemo from "../PieCharts";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!storedUser) {
      return () => navigate("/");
    }
  }, []);

  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <nav
        className="w-full flex justify-content-between"
        style={{ backgroundColor: "black", height: "63px" }}
      >
        <div className="logo flex">
          <i
            className="pi pi-apple text-white flex mt-2"
            style={{
              fontSize: "40px",
            }}
          ></i>
          <p className="text-white">BTI</p>
        </div>
        <div className="flex">
          <h2 className="text-white mr-3">
            Welcome {storedUser ? storedUser.username : "Guest"}!
          </h2>
          <button
            className="mt-2"
            onClick={handlelogout}
            style={{
              backgroundColor: "yellow",
              color: "white",
              border: "none",
              width: "90px",
              height: "50px",
              borderRadius: "7px",
              fontSize: "medium",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex w-full">
        <div
          className="dashboard"
          style={{
            width: "300px",
            backgroundColor: "yellow",
          }}
        >
          <h1 className="ml-3">dashboard</h1>
        </div>
        <div className="ml-8">
          <PieChartDemo />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
