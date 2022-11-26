import { Col, Nav, Navbar } from "react-bootstrap";
import './dashboard.css';
import { dataNameOnDashboard } from "../data";

const Sidebar2 = () => {
    return ( 
       <Col className="test">
       <Col>{dataNameOnDashboard[0]}</Col>
       <Navbar className="dashboard-nav-child">
        <Nav>Dashboard</Nav>
        <Nav.Link>Dashboard</Nav.Link>
       </Navbar>
       </Col>
       
     );
}
 
export default Sidebar2;