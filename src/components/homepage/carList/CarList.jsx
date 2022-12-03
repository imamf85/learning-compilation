import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import carImg from "../../../assets/img_login.svg";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";

const CarList = () => {
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
      .get("https://bootcamp-rent-cars.herokuapp.com/admin/v2/order")
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  };
  return (
    <Container style={{ marginTop: 150, marginLeft: 150 }}>
      <Col className="grid-cars-list">
        <Col>
          <Card style={styles.card}>
            <Card.Img style={styles.cardImage} variant="top" src={carImg} />
            <Card.Body>
              <Card.Text>Avanza</Card.Text>
              <Card.Title>Rp. 500.000 / hari</Card.Title>
              <Card.Text>6 - 8 People</Card.Text>
              <Card.Text>Update at</Card.Text>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="success" size="lg">
                  <DriveFileRenameOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                  Edit
                </Button>
                <Button variant="outline-danger" size="lg">
                  <DeleteOutlineOutlinedIcon sx={{ fontSize: 25 }} />
                  Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Col>

      {/*
        {data.map((item) => {
        return (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <div>{item.name}</div>
            </div>
            <div>
              <Link to={`detail/${item.id}`} className="border-teal-500 border text-teal-500 rounded-md p-1 hover:bg-teal-700 hover:text-white flex items-center w-full justify-center">
                <Button variant="success">Edit</Button>
              </Link>
              <Button variant="outlie-danger">Delete</Button>
            </div>
          </div>
        );
      })}
    */}
    </Container>
  );
};

export default CarList;
