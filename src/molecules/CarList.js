import { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { NumberFormat } from "../atom/NumberFormat";
import { fetchCars } from "../config/api";

import Button from "react-bootstrap/Button";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import NotFoundImg from "../assets/ImageNotFound.jpeg";
import "../style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CarList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataCars();
  }, []);

  const getDataCars = () => {
    fetchCars()
      .then((res) => setData(res.data.cars))
      .catch((err) => console.error(err));
  };

  const editCar = (id) => {
    navigate(`/edit/${id}`);
  };

  const styles = {
    cardImage: {
      height: "18rem",
      padding: "0.5rem",
      objectFit: "cover",
    }
  };

  return (
    <>
      <Sidebar />
      <TopBar />
      <Container className="w-75">
        <div className="d-flex justify-content-end my-4" style={{ marginRight: "1rem" }}>
          <Link to='/addcar'> <Button className="bg-primary"><FontAwesomeIcon icon={faPlus} /> Add New Car</Button></Link>
        </div>
        <Col className="grid-cars-list">
          {data.map((items) => (
            <Col key={items.id}>
              <Card>
                <Card.Img style={styles.cardImage} className="rounded" variant="top" src={items.image ? items.image : NotFoundImg} />
                <Card.Body>
                  <Card.Text className="uppercase text-muted">{items.name}</Card.Text>
                  <Card.Title>Rp. {NumberFormat(items?.price)} / hari</Card.Title>
                  <Card.Text className="capitalize text-muted">{items.category}</Card.Text>
                  <Card.Text>{items.updateAt}</Card.Text>
                  <div className="d-flex justify-content-end gap-3">
                    <Button variant="success" size="sm">
                      <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                      Edit
                    </Button>
                    <div className="d-grid" onClick={() => editCar(items.id)}>
                      <Button variant="outline-danger" size="sm">
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Col>
      </Container>
    </>
  );
};

export default CarList;
