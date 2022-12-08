import axios from "axios";

const http = axios.create({ baseURL: "https://bootcamp-rent-cars.herokuapp.com" });
const token = localStorage.getItem("Token");

const config = {
  headers: { access_token: token, "Content-Type": "application/json" },
};
const config_multipart = {
  headers: { access_token: token, "Content-Type": "multipart/form-data" },
};
export const fetchCars = () => http.get("/admin/v2/car", config);
export const deleteCar = (id) => http.delete(`/admin/car/${id}`, config);
export const fetchCarsDetail = (id) => http.get(`/admin/car/${id}`, config);
export const addCar = (payload) => http.post(`/admin/car/`, payload, config_multipart);
export const editCar = (id) => http.put(`/admin/car/${id}`, config_multipart);
// export const postOrderRentCar = (id, payload) =>
// 	http.put(`/customer/order/${id}/slip/`, payload, config_multipart);
