import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./molecules/Dashboard";
import CarList from "./molecules/CarList";
import Login from "./components/authorization/Login";
import PrivateRoutes from "./molecules/PrivateRoutes";
import AddCar from "./molecules/AddCar";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/dashboard" exact />
          <Route element={<CarList />} path="/car-list" />
          <Route element={<AddCar />} path="/addcar" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
