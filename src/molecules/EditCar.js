import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";
import "../style.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { editCar } from "../config/api";
import { useState } from "react";

const schema = yup
  .object()
  .shape({
    name: yup.string().required("Name must be filled"),
    price: yup.string().required("Price must be filled"),
    category: yup.string().required("Category must be upload"),
  })
  .required();

const EditCar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const {
    register: input,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    let formData = new FormData();
    setIsLoading(true);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("status", false);
    formData.append("image", data.image[0]);
    const response = await editCar(formData);
    if (response.status === 201) {
      setIsLoading(false);
      setIsSuccess("Data successfull created");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    } else {
      setIsLoading(false);
      setIsError("Something wrong, try again later.");
      setTimeout(() => {
        navigate(-1);
      }, 2000);
    }
  };
  return (
    <div>
      <Sidebar />
      <TopBar />
      <Container className="w-75">
        <nav aria-label="breadcrumb" style={{ marginTop: "2rem" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">Cars</li>
            <li className="breadcrumb-item fw-bold">Edit Car</li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit Car
            </li>
          </ol>
        </nav>
        <h4 className="fw-bold my-4">Edit Car</h4>
        <p className="text-success">{isSuccess}</p>
        <p className="text-success">{isError}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row align-items-center">
            <div className="col-auto w-14">
              <label htmlFor="name" className="form-label">
                Nama/Tipe Mobil <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input type="text" id="name" className="form-control w-22" placeholder="Input Nama/Tipe Mobil" {...input("name")} />
              <p className="text-danger">{errors.name?.message}</p>
            </div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Harga <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input type="text" id="harga" className="form-control w-22" placeholder="Input Harga Sewa Mobil" {...input("price")} />
              <p className="text-danger">{errors.price?.message}</p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-auto w-14">
              <label htmlFor="foto" className="col-form-label">
                Foto <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input type="file" accept="image/jpg, image/png, image/jpeg" id="foto" className="form-control w-22" placeholder="Upload Foto Mobil" {...input("image")} />
              <p className="text-danger">{errors.image?.message}</p>
              <span className="form-text">File size max. 2MB</span>
            </div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="kategori" className="col-form-label">
                Kategori <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <select className="form-select w-22" {...input("category")} onChange={(e) => setValue("category", e.target.value, { shouldValidate: true })}>
                <option defaultValue={"Pilih Kategori Mobil"} disabled>
                  Pilih Kategori Mobil
                </option>
                <option defaultValue={"small"}>Small</option>
                <option defaultValue={"medium"}>Medium</option>
                <option defaultValue={"large"}>Large</option>
              </select>
              {errors.select && <p className="text-danger">{errors.category.message}</p>}
            </div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Created At
              </label>
            </div>
            <div className="col-auto">&nbsp;&nbsp;-</div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Updated At
              </label>
            </div>
            <div className="col-auto">&nbsp;&nbsp;-</div>
          </div>

          <div className="d-flex gap-3 fixed">
            <Button onClick={() => navigate(-1)} className="btn btn-light">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Loading.." : "Save"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditCar;
