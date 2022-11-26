import { Col, Nav, Navbar } from "react-bootstrap";
import './dashboard.css';
import homeIcon from '../assest/fi_home.svg';
import truck from '../assest/fi_truck.svg'
import Sidebar2 from "./Sidebar2";

const Sidebar = () => {
    return ( 
       <Col>
       <Navbar className="dashboard-nav">
        <Nav className="brand"></Nav>
        <Nav.Link>
          <img src={homeIcon} alt="car-pic" />
          <Col>Dashboard</Col>
        </Nav.Link>
        <Nav.Link>
          <img src={truck} alt="truck-pic" />
          <Col>Cars</Col>
        </Nav.Link>
       </Navbar>
       <Sidebar2 />
       </Col>
       
     );
}
 
export default Sidebar;