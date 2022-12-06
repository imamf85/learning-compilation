import { useEffect, useState } from "react";
import { Card, Col, Container, Modal } from "react-bootstrap";
import { DateTime } from "luxon";
import { useNavigate, Link } from "react-router-dom";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
      padding: "0.5rem",
      objectFit: "cover",
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
      <Container className="w-75">
        <div className="d-flex justify-content-end my-4" style={{ marginRight: "1rem" }}>
          <Link to="/addcar">
            {" "}
            <Button className="bg-primary">
              <FontAwesomeIcon icon={faPlus} /> Add New Car
            </Button>
          </Link>
        </div>
        <Col className="grid-cars-list">
          {data.map((items) => (
            <Col key={items.id}>
              <Card>
                <Card.Img style={styles.cardImage} className="rounded" variant="top" src={items.image ? items.image : NotFoundImg} />
                <Card.Body>
                  <Card.Text className="uppercase text-muted">{items.name}</Card.Text>
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
