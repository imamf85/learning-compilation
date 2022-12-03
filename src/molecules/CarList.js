import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { NumberFormat } from "../atom/NumberFormat";
import NotFoundImg from "../assets/ImageNotFound.jpeg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import "../style.css";
import { useNavigate } from "react-router-dom";

const CarList = () => {
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
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/car", config)
      .then((res) => setData(res.data.cars))
      .catch((err) => console.log(err));
  };

  const Edit = (id) => {
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
                  <Button variant="success" size="lg">
                    <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                    Edit
                  </Button>
                  <div className="d-grid" onClick={() => Edit(items.id)}>
                    <Button variant="outline-danger" size="lg">
                      <DeleteOutlineOutlinedIcon sx={{ fontSize: 25 }} />
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
  );
};

export default CarList;
