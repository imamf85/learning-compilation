import { Col, Form, Button, Row, Nav } from "react-bootstrap";
import "./atom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import menuHamburger from "../assest/fi_menu.svg";
import chevronDown from "../assest/Vector.svg";

const TopBar = () => {
  return (
    <Col className="dashboard-nav-top">
      <Col>
        <Nav className="short-brand"></Nav>
        <Nav className="long-brand"></Nav>
        <img src={menuHamburger} alt="hamburger-icon" />
      </Col>
      <Col>
        <Form className="d-flex">
          <FontAwesomeIcon icon={faSearch} />
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            style={{ margin: 0, borderRadius: 2 }}
          />

          <Button
            variant="outline-success"
            style={{
              color: "#0D28A6",
              fontWeight: 700,
              borderColor: "#0D28A6",
              borderRadius: 2,
            }}
          >
            Search
          </Button>
        </Form>
        <Col className="profile-name">
          <Row>U</Row>
          <Row>Unis Badri</Row>
          <img src={chevronDown} alt="chevron-down" />
        </Col>
      </Col>
    </Col>
  );
};

export default TopBar;
