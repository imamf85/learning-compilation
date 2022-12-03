import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NumberFormat } from "../atom/NumberFormat";
import NotFoundImg from "../assets/ImageNotFound.jpeg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import "../style.css";
import { useNavigate } from "react-router-dom";
import carDelete from "../assets/img-BeepBeep.svg";

const CarList = () => {
  // let bulan = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'Mei',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Okt',
  //   'Nov',
  //   'Dec',
  // ];

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const config = {
    headers: { access_token: token, "Content-Type": "application/json" },
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
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/car", config)
      .then((res) => setData(res.data.cars))
      .catch((err) => console.log(err));
  };

  const deleteItem = (id) => {
    // axios
    //   .delete(`https://bootcamp-rent-cars.herokuapp.com/admin/car/${id}`, config)
    //   .then((res) => {
    //     setModal(false);
    //     getData();
    //   })
    //   .catch((err) => console.log(err));
    console.log(id);
  };

  const editItem = (id) => {
    navigate(`/edit${id}`);
  };

  return (
    <Container style={{ marginTop: 150, marginLeft: 350 }}>
      <Col className="grid-cars-list">
        {data.map((items) => (
          <Col key={items.id}>
            <Card style={styles.card}>
              <Card.Img style={styles.cardImage} variant="top" src={items.image ? items.image : NotFoundImg} />
              <Card.Body>
                <Card.Text>{items.name}</Card.Text>
                <Card.Title>Rp. {NumberFormat(items?.price)} / hari</Card.Title>
                <Card.Text>{items.category}</Card.Text>
                <Card.Text>{items.updateAt}</Card.Text>
                <div className="d-flex justify-content-center gap-3">
                  <Button variant="success" size="lg" onClick={() => editItem(items.id)}>
                    <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                    Edit
                  </Button>
                  <div className="d-grid">
                    <Button variant="outline-danger" size="lg" onClick={handleShow}>
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                      Delete
                    </Button>
                  </div>
                  <Modal show={modal} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body>
                      <div>
                        <img src={carDelete} alt="" />
                        <p>Setelah dihapus, data mobil tidak dapat dikembalikan. Yakin tetap menghapus?</p>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => {
                          deleteItem(items.id);
                        }}
                      >
                        Ya
                      </Button>
                      <Button variant="outline-primary" onClick={handleClose}>
                        Tidak
                      </Button>
                    </Modal.Body>
                  </Modal>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Col>
    </Container>
  );
};

export default CarList;
