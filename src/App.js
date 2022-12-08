import { Route, Routes } from "react-router-dom";
import CarList from "./molecules/CarList";
import Dashboard from "./molecules/Dashboard";
import EditList from "./molecules/EditList";
import Login from "./components/authorization/Login";
import PrivateRoutes from "./molecules/PrivateRoutes";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Dashboard />} path="/" exact />
          <Route element={<CarList />} path="/car-list" />
          <Route element={<EditList />} path="/car-list/edit/:id" />
        </Route>
        <Route element={<Login />} path="/login" />
      </Routes>
    </>
  );
};

export default App;
