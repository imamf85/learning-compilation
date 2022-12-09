import { useEffect, useState } from "react";
import { Card, Col, Container, Modal } from "react-bootstrap";
import { DateTime } from "luxon";
import { Link, useNavigate } from "react-router-dom";
import { NumberFormat } from "../atom/NumberFormat";
import { fetchCars, deleteCar } from "../config/api";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import swal from "sweetalert";

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
  }, [data]);

  const getDataCars = () => {
    fetchCars()
      .then((res) => setData(res?.data?.cars))
      .catch((err) => console.error(err));
  };

  const deleteItem = (id) => {
    setDeletedId(id);
    setModal(true);
    getDataCars();
    console.log(id);
  };

  const handleDeleteItem = () => {
    deleteCar(deletedId)
      .then((res) => {
        setModal(false);
        if (res.status === 200) {
          swal({
            title: "Declared!",
            text: "Berhasil Menghapus Data",
            icon: "success",
            timer: 2000,
          });
          navigate("/car-list");
        }
      })
      .catch((err) => console.log(err.message));
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

  return (
    <>
      <Modal show={modal} onHide={handleClose} size="sm" centered>
        <Modal.Body className="text-center">
          <div>
            <img src={carDelete} alt="" justify-content-md-center />
            <p className="m-3">
              Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin tetap
              menghapus?
            </p>
          </div>
          <div>
            <Button
              variant="primary"
              className="m-2 p-3"
              onClick={() => handleDeleteItem()}
            >
              Ya
            </Button>
            <Button
              variant="outline-danger"
              className="m-2 p-3"
              onClick={handleClose}
            >
              Tidak
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Sidebar />
      <TopBar />
      <Container className="w-75 add-car" style={{ marginLeft: 200 }}>
        <div
          className="d-flex justify-content-end my-4"
          style={{ marginRight: "1rem" }}
        >
          <Link to="/add-car">
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
                <Card.Img
                  style={styles.cardImage}
                  className="rounded"
                  variant="top"
                  src={items.image ? items.image : NotFoundImg}
                />
                <Card.Body>
                  <Card.Text className="uppercase text-muted">
                    {items.name}
                  </Card.Text>
                  <Card.Title>
                    Rp. {NumberFormat(items?.price)} / hari
                  </Card.Title>
                  <Card.Text className="text-muted capitalize"><PeopleAltOutlinedIcon />&nbsp;{items.category}
                  </Card.Text>
                  <Card.Text className="mb-4 text-muted">
                    <AccessTimeIcon /> {DateTime.fromISO(items.updatedAt).toFormat("ff")}
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => editCar(items.id)}
                    >
                      <DriveFileRenameOutlineOutlinedIcon
                        sx={{ fontSize: 25 }}
                      />
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => deleteItem(items.id)}
                    >
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
