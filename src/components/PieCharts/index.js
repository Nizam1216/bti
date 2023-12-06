import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import "../../App.css";
export default function PieChartDemo() {
  const [userData, setUserData] = useState([]);
  const [genderChartData, setGenderChartData] = useState({});
  const [employmentChartData, setEmploymentChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api/?results=1024"
        );

        // Extract relevant data from the response
        const users = response.data.results;

        setUserData(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Create pie chart data for gender
    const genderCounts = calculateGenderCounts();
    const genderData = {
      labels: Object.keys(genderCounts),
      datasets: [
        {
          data: Object.values(genderCounts),
          backgroundColor: [
            "rgb(0, 123, 255)", // Blue
            "rgb(255, 193, 7)", // Yellow
            "rgb(40, 167, 69)", // Green
          ],
          hoverBackgroundColor: [
            "rgb(23, 162, 184)", // Light Blue
            "rgb(255, 203, 5)", // Light Yellow
            "rgb(16, 135, 59)", // Light Green
          ],
        },
      ],
    };

    setGenderChartData(genderData);
  }, [userData]);

  useEffect(() => {
    // Create pie chart data for employment type
    const employmentCounts = calculateEmploymentCounts();
    const employmentData = {
      labels: Object.keys(employmentCounts),
      datasets: [
        {
          data: Object.values(employmentCounts),
          backgroundColor: [
            "rgb(255, 99, 132)", // Red
            "rgb(54, 162, 235)", // Blue
            "rgb(255, 205, 86)", // Yellow
          ],
          hoverBackgroundColor: [
            "rgb(255, 79, 116)", // Light Red
            "rgb(46, 137, 189)", // Light Blue
            "rgb(255, 192, 63)", // Light Yellow
          ],
        },
      ],
    };

    setEmploymentChartData(employmentData);
  }, [userData]);

  useEffect(() => {
    const options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: false,
          },
        },
      },
    };

    setChartOptions(options);
  }, []);

  const calculateGenderCounts = () => {
    return userData.reduce((acc, user) => {
      const gender = user.gender;
      acc[gender] = (acc[gender] || 0) + 1;
      return acc;
    }, {});
  };

  const calculateEmploymentCounts = () => {
    return userData.reduce((acc, user) => {
      let employmentType;

      if (user.dob.age < 25) {
        employmentType = "Part-time";
      } else if (user.dob.age >= 25 && user.dob.age <= 35) {
        employmentType = "Full-time";
      } else {
        employmentType = "Hourly Basis";
      }

      acc[employmentType] = (acc[employmentType] || 0) + 1;
      return acc;
    }, {});
  };

  const totalUsers = userData.length;
  const maleUsers = calculateGenderCounts().male || 0;
  const femaleUsers = calculateGenderCounts().female || 0;
  const partTimeUsers = calculateEmploymentCounts()["Part-time"] || 0;
  const fullTimeUsers = calculateEmploymentCounts()["Full-time"] || 0;
  const hourlyBasisUsers = calculateEmploymentCounts()["Hourly Basis"] || 0;

  return (
    <div>
      <p className="heading">Gender Distribution</p>
      <div
        className="card flex justify-content-center"
        style={{ width: "800px" }}
      >
        <div
          className="flex w-full"
          style={{
            border: "1px solid grey",
            backgroundColor: "#eeecec",
            borderRadius: "15px",
            color: "white",
          }}
        >
          <Chart
            type="pie"
            data={genderChartData}
            options={chartOptions}
            className="w-full md:w-25rem"
          />
          <div className="details flex flex-column justify-content-center">
            <h3 className="sub-text">Total Users: {totalUsers}</h3>
            <h3 className="sub-text">Male Users: {maleUsers}</h3>
            <h3 className="sub-text">Female Users: {femaleUsers}</h3>
          </div>
        </div>
      </div>
      <p className="heading">Employment Type Distribution</p>
      <div
        className="card flex justify-content-center"
        style={{
          width: "800px",
          border: "1px solid grey",
          backgroundColor: "#eeecec",
          borderRadius: "15px",
          color: "white",
        }}
      >
        <Chart
          type="pie"
          data={employmentChartData}
          options={chartOptions}
          className="w-full md:w-25rem"
        />
        <div className="flex flex-column justify-content-center details">
          <h3 className="sub-text">Part-time Users: {partTimeUsers}</h3>
          <h3 className="sub-text">Full-time Users: {fullTimeUsers}</h3>
          <h3 className="sub-text">Hourly Basis Users: {hourlyBasisUsers}</h3>
        </div>
      </div>
    </div>
  );
}
