import React, { useState, useEffect } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale);
const months = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];
const CarsGraph = () => {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [startDateRent, setStartDateRent] = useState(`2022-01-01`);
  const [finishDateRent, setFinishDateRent] = useState(`2022-01-31`);

  useEffect(() => {
    axios
      .get(
        `https://bootcamp-rent-cars.herokuapp.com/admin/order/reports?from=${startDateRent}$&until=${finishDateRent}`,
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImltYW05MDBAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY5NzE4MjQ3fQ.YoS0P5vfm6qoIENnjKOJH5YUruLjfXFDZ0C52VSWZT0",
          },
        }
      )
      .then((response) => {
        let labels = [];
        let amounts = [];
        response.data.map((report) => {
          labels.push(report.day);
          amounts.push(report.orderCount);
        });
        setLabels(labels);
        setAmounts(amounts);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [startDateRent, finishDateRent]);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cars List Report",
        backgroundColor: "#586B90",
        borderColor: "rgb(255, 99, 132)",
        data: amounts,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 0,
    },
    scales: {
      y: {
        display: true,
        title: {
          text: "Amount of Car Rented",
          display: true,
          font: {
            family: "Arial",
            size: 12,
            style: "normal",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
    plugins: {
      tooltip: {},
    },
  };
  return (
    <>
      <Col className="grafic-title d-flex align-items-center">
        <Row></Row>
        <Col>Rented Car Data Visualization</Col>
      </Col>
      <Col>
        <Col style={{ marginBottom: 8 }}>Month</Col>
        <Form className="d-flex">
          <Form.Select
            aria-label="Default select example"
            style={{ width: 122, borderRadius: 2, fontSize: 12 }}
            onChange={(e) => {
              let date = new Date(e.target.value);
              let lastDay = new Date(2022, date.getMonth() + 1, 0);
              setStartDateRent(`2022-${e.target.value}-1`);
              setFinishDateRent(`2022-${e.target.value}-${lastDay.getDate()}`);
            }}
          >
            <option disabled>Open this select menu</option>
            {months.map((month) => (
              <option value={month.id} key={month.id}>
                {month.name} - 2022
              </option>
            ))}
          </Form.Select>

          <Button
            variant="outline-success"
            style={{
              backgroundColor: "#0D28A6",
              color: "#FFF",
              fontWeight: 700,
              borderColor: "#0D28A6",
              borderRadius: 2,
            }}
          >
            Go
          </Button>
        </Form>
      </Col>
      <div>
        <Bar data={data} width={200} height={400} options={options} />
      </div>
    </>
  );
};

export default CarsGraph;
