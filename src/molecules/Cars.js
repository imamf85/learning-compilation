import { Col, Container } from "react-bootstrap";
import "../style.css";

const Dashboard = () => {
  return (
    <>
      <Col className="dashboard">
        <Col className="empty-area"></Col>
        <Container style={{ width: "80vw", marginTop: 32 }}>
          <Col>Cars Test</Col>
        </Container>
      </Col>
    </>
  );
};

export default Dashboard;
