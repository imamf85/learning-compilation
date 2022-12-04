import { useState } from "react";
import { Button, Container, Dropdown, DropdownButton, Form } from "react-bootstrap";
// import { useHistory, useParams } from "react-router-dom";
import { editCar } from "../config/api";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";
import "./style.css";

const EditList = () => {
  const navigate = useNavigate();
  // const [carName, setCarName] = useState("");
  // const [carPrice, setCarPrice] = useState("");
  // const [carImage, setCarImage] = useState("");
  // const [carCategory, setCarCategory] = useState("");
  // const history = useHistory();
  // const { id } = useParams();

  let bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
  let date = new Date();

  const updateMobil = (id) => {
    editCar(id)
      .then((res) => {
        if (res.status === 200) {
          swal({
            title: "Saved!",
            text: "Berhasil Mengubah Data",
            icon: "success",
            timer: 2000,
          });
          navigate("/car-list");
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Sidebar />
      <TopBar />
      <div>
        Edit Car
        <Container style={{ marginTop: 100, marginLeft: 350 }}>
          <div>
            <label>Nama</label>
            <input id="nama" type="text" placeholder="Input Nama/Tipe Mobil" required></input>
          </div>
          <div>
            <label>Harga</label>
            <input id="harga" type="text" placeholder="Input Harga Sewa Mobil" required></input>
          </div>
          <div>
            <label>Foto</label>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="file" />
            </Form.Group>
          </div>
          <div>
            <label>Category</label>
            <DropdownButton id="dropdown-item-button" title="Pilih Category">
              <Dropdown.Item as="button">Small</Dropdown.Item>
              <Dropdown.Item as="button">Medium</Dropdown.Item>
              <Dropdown.Item as="button">Large</Dropdown.Item>
            </DropdownButton>
          </div>
          <div>
            <label>Created At</label>
            <p className="upload">
              {date.getDate()} {bulan[date.getMonth()]} {date.getFullYear()}, {date.getHours()}:{date.getMinutes()}
            </p>
          </div>
          <div>
            <label>Updated At</label>
            <p className="upload">
              {date.getDate()} {bulan[date.getMonth()]} {date.getFullYear()}, {date.getHours()}:{date.getMinutes()}
            </p>
          </div>
          <div>
            <Button variant="outline-primary" className="m-2 p-2">
              Cancel
            </Button>
            <Button variant="primary" className="m-2 p-2" onChange={updateMobil}>
              Save
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EditList;
