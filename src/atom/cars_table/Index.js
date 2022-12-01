import React from "react";
import styles from "./table.module.css";
import Table from "./CarsTable";

const Index = () => {
  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        <Table rowsPerPage={5} />
      </div>
    </main>
  );
};

export default Index;
