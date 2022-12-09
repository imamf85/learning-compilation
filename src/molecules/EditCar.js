import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getCarsById } from "../redux/action/cars";
import { editCar } from "../config/api";
import { Button, Container } from "react-bootstrap";
import Sidebar from "../atom/Sidebar";
import TopBar from "../atom/TopBar";
import "../style.css";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [isSuccess, setIsSuccess] = useState("");
  const { cars } = useSelector((state) => state.cars)

  useEffect(() => {
    dispatch(getCarsById(id));
  }, [id, dispatch]);

  const {
    register: input,
    handleSubmit,
    setValue,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const defaultValue = {
      name: cars?.name,
      price: cars?.price,
      category: cars?.category,
      image: cars?.image,
    }

    let formData = new FormData();
    formData.append("name", data.name ? data.name : defaultValue.name);
    formData.append("category", data.category ? data.category : defaultValue.category);
    formData.append("price", data.price ? data.price : defaultValue.price);
    formData.append("status", false);
    formData.append("image", data.image[0] ? data.image[0] : defaultValue.image);
    const response = await editCar(formData, id);
    if (response) {
      setIsLoading(false);
      setIsSuccess("Data successfull updated");
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
      <Container
        className="w-75 add-car"
        style={{ width: "80vw", marginLeft: 200 }}
      >
        <nav aria-label="breadcrumb" style={{ marginTop: "2rem" }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item fw-bold">Cars</li>
            <li className="breadcrumb-item fw-bold">List Cars</li>
            <li className="breadcrumb-item active" aria-current="page">
              Edit New Car
            </li>
          </ol>
        </nav>
        <h4 className="fw-bold my-4">Edit New Car</h4>
        <p className={`alert alert-success ${isSuccess ? '' : 'd-none'}`}>{isSuccess}</p>
        <p className={`alert alert-danger ${isError ? '' : 'd-none'}`}>{isError}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row align-items-center">
            <div className="col-auto w-14">
              <label htmlFor="name" className="form-label">
                Nama/Tipe Mobil <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="name"
                className="form-control w-22"
                placeholder="Input Nama/Tipe Mobil"
                defaultValue={cars?.name}
                {...input("name")}
              />
            </div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Harga <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input
                type="text"
                id="harga"
                className="form-control w-22"
                placeholder="Input Harga Sewa Mobil"
                defaultValue={cars?.price}
                onChange={(e) =>
                  setValue("price", e.target.value, {
                    shouldValidate: true,
                  })
                }
                {...input("price")}
              />
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-auto w-14">
              <label htmlFor="foto" className="col-form-label">
                Foto <span>*</span>
              </label>
            </div>
            <div className="col-auto">
              <input
                type="file"
                accept="image/jpg, image/png, image/jpeg"
                id="foto"
                className="form-control w-22"
                placeholder="Upload Foto Mobil"
                // defaultValue={cars?.image}
                // onChange={(e) =>
                //   setValue("image", e.target.files[0], {
                //     shouldValidate: true,
                //   })
                // }
                {...input("image")}
              />
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
              <select
                className="form-select w-22"
                {...input("category")}
                onChange={(e) =>
                  setValue("category", e.target.value, {
                    shouldValidate: true,
                  })
                }
              >
                <option defaultValue={cars?.category} disabled selected>
                  {cars?.category}
                </option>
                <option defaultValue={"small"}>Small</option>
                <option defaultValue={"medium"}>Medium</option>
                <option defaultValue={"large"}>Large</option>
              </select>
            </div>
          </div>

          <div className="row align-items-center py-3">
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Created At
              </label>
            </div>
            <div className="col-auto">{cars?.createdAt}</div>
          </div>

          <div className="row align-items-center py-3" style={{ marginBottom: "10rem" }}>
            <div className="col-auto w-14">
              <label htmlFor="harga" className="col-form-label">
                Updated At
              </label>
            </div>
            <div className="col-auto">{cars?.updatedAt}</div>
          </div>

          <div className="d-flex gap-3 fixed">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="btn btn-light">
              Cancel
            </Button>
            <Button variant="outline-success" type="submit" disabled={isLoading}>
              {isLoading ? "Loading.." : "Update"}
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default EditCar;
