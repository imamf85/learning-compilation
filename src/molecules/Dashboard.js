import { Col, Container, Breadcrumb, Row } from "react-bootstrap";
import CarsGraph from "../atom/CarsGraph";
import Index from "../atom/cars_table/Index";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";
import "../style.css";

const Dashboard = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <Col className="dashboard">
        <Col className="empty-area"></Col>
        <Container style={{ width: "80vw", marginTop: 32 }}>
          <Breadcrumb>
            <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <Col>
            <CarsGraph />
            <Col>
              <Col style={{ marginTop: 84, fontWeight: 700 }}>Dashboard</Col>
              <Col className="grafic-title d-flex align-items-center">
                <Row></Row>
                <Col>List Order</Col>
              </Col>
            </Col>
            <Index />
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default Dashboard;
