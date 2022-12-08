import { Navigate, Route, Routes } from "react-router-dom";
import AddCar from "./molecules/AddCar";
import CarList from "./molecules/CarList";
import Dashboard from "./molecules/Dashboard";
import EditCar from "./molecules/EditCar";
import Login from "./components/authorization/Login";
import PrivateRoutes from "./molecules/PrivateRoutes";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/" exact />
          <Route element={<CarList />} path="/car-list" />
          <Route element={<AddCar />} path="/add-car" />
          <Route element={<EditCar />} path="/car-list/edit/:id" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
