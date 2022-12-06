import { Col, Nav, Row, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import homeIcon from "../assets/fi_home.svg";
import truck from "../assets/fi_truck.svg";
import "./atom.css";

const Sidebar = () => {
  const dataNameOnDashboard = ["Dashboard", "Cars", "List Car"];
  let location = useLocation();
  return (
    <Col>
      <Col className="dashboard-nav">
        <Nav.Link as={Link} to={{ pathname: "/dashboard" }}>
          <img src={homeIcon} alt="car-pic" />
          <Col>{dataNameOnDashboard[0]}</Col>
        </Nav.Link>
        <Nav.Link as={Link} to={{ pathname: "/car-list" }}>
          <img src={truck} alt="truck-pic" />
          <Col>{dataNameOnDashboard[1]}</Col>
        </Nav.Link>
      </Col>
      <Col className="dashboard-nav-child">
        <Row></Row>
        <Navbar>
          <Nav>{dataNameOnDashboard[location.pathname === "/dashboard" ? 0 : 1]}</Nav>
          <Nav.Link
            as={Link}
            to={{
              pathname: location.pathname,
            }}
          >
            {dataNameOnDashboard[location.pathname === "/dashboard" ? 0 : 2]}
          </Nav.Link>
        </Navbar>
      </Col>
    </Col>
  );
};

export default Sidebar;
