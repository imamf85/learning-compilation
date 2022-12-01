import React, { useState, useEffect } from "react";
import axios from "axios";
import useTable from "./useTable";
import styles from "./table.module.css";
import TableFooter from "./TableFooter";

const CarsTable = ({ data, rowsPerPage }) => {
  const [carsData, setCarsData] = useState([]);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(carsData, page, rowsPerPage);

  useEffect(() => {
    axios
      .get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/order", {
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImltYW05MDBAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNjY5NzE4MjQ3fQ.YoS0P5vfm6qoIENnjKOJH5YUruLjfXFDZ0C52VSWZT0",
        },
      })
      .then((response) => {
        setCarsData(
          response.data.orders.map((order) => {
            const modifyStartRentDate = new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
              timeStyle: "long",
              timeZone: "Asia/Jakarta",
            }).format(new Date(order.start_rent_at));
            const modifyFinishRentDate = new Intl.DateTimeFormat("id-ID", {
              dateStyle: "full",
              timeStyle: "long",
              timeZone: "Asia/Jakarta",
            }).format(new Date(order.finish_rent_at));
            return {
              ...order,
              start_rent_at: modifyStartRentDate,
              finish_rent_at: modifyFinishRentDate,
            };
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>No</th>
            <th className={styles.tableHeader}>User Email</th>
            <th className={styles.tableHeader}>Car</th>
            <th className={styles.tableHeader}>Start Rent</th>
            <th className={styles.tableHeader}>Finish Rent</th>
            <th className={styles.tableHeader}>Price</th>
            <th className={styles.tableHeader}>Category</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((carDatum) => (
            <tr className={styles.tableRowItems} key={carDatum.id}>
              <td className={styles.tableCell}>{carDatum.id}</td>
              <td className={styles.tableCell}>{carDatum.User.email}</td>
              <td className={styles.tableCell}>{carDatum.Car}</td>
              <td className={styles.tableCell}>{carDatum.start_rent_at}</td>
              <td className={styles.tableCell}>{carDatum.finish_rent_at}</td>
              <td className={styles.tableCell}>{carDatum.total_price}</td>
              <td className={styles.tableCell}>{carDatum.language}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default CarsTable;
