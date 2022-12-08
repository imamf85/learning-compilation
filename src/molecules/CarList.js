import { useEffect, useState } from "react";
import { Card, Col, Container, Modal } from "react-bootstrap";
import { DateTime } from "luxon";
import { useNavigate } from "react-router-dom";
import { NumberFormat } from "../atom/NumberFormat";
import { fetchCars, deleteCar } from "../config/api";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

import Button from "react-bootstrap/Button";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import NotFoundImg from "../assets/ImageNotFound.jpeg";
import carDelete from "../assets/img-BeepBeep.svg";
import "../style.css";

const CarList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deletedId, setDeletedId] = useState("");

  const handleClose = () => setModal(false);

  useEffect(() => {
    getDataCars();
  }, []);

  const getDataCars = () => {
    fetchCars()
      .then((res) => setData(res.data.cars))
      .catch((err) => console.error(err));
  };

  const deleteItem = (id) => {
    setDeletedId(id);
    setModal(true);
    getDataCars();
    console.log(id);
  };

  // const deleteItem = (id) => {
  //   deleteCar()
  //     .then((res) => {
  //       setDeletedId(id);
  //       setModal(true);
  //       getDataCars();
  //       // setData(res.data.cars);
  //     })
  //     .catch((err) => console.log(err));
  //   console.log(id);
  // };

  const handleDeleteItem = () => {
    setData((pre) => {
      const newArray = [...pre];
      return newArray.filter((item) => item.id !== deletedId);
    });
    setModal(false);
  };

  const editCar = (id) => {
    navigate(`/car-list/edit/${id}`);
  };

  const styles = {
    cardImage: {
      height: "18rem",
      padding: "1rem",
      borderRadius: 25,
      objectFit: "cover",
    },
    card: {
      width: "24rem",
      margin: "1rem",
    },
  };

  useEffect(() => {
    getDataCars();
  }, []);

  return (
    <>
      <Modal show={modal} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <div>
            <img src={carDelete} alt="" />
            <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin tetap menghapus?</p>
          </div>
          <Button variant="primary" onClick={handleDeleteItem}>
            Ya
          </Button>
          <Button variant="outline-primary" onClick={handleClose}>
            Tidak
          </Button>
        </Modal.Body>
      </Modal>

      <Sidebar />
      <TopBar />
      <Container style={{ marginTop: 150, marginLeft: 350 }}>
        <Col className="grid-cars-list">
          {data.map((items) => (
            <Col key={items.id}>
              <Card style={styles.card}>
                <Card.Img style={styles.cardImage} variant="top" src={items.image ? items.image : NotFoundImg} />
                <Card.Body>
                  <Card.Text>{items.name}</Card.Text>
                  <Card.Title>Rp. {NumberFormat(items?.price)} / hari</Card.Title>
                  <Card.Text>
                    <PeopleAltOutlinedIcon />
                    {items.category}
                  </Card.Text>
                  <Card.Text>
                    <AccessTimeIcon />
                    Updated at {DateTime.fromISO(items.updatedAt).toFormat("ff")}
                  </Card.Text>
                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="success" size="lg" onClick={() => editCar(items.id)}>
                      <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="lg" onClick={() => deleteItem(items.id)}>
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                      Delete
                    </Button>
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
