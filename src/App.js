import { Route, Routes } from "react-router-dom";
import Dashboard from "./molecules/Dashboard";
import CarList from "./molecules/CarList";
import Login from "./components/authorization/Login";
import PrivateRoutes from "./molecules/PrivateRoutes";

const App = () => {
  return (
    <>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<CarList />} path="/car-list"/>
          </Route>
          <Route element={<Login/>} path="/login" />
        </Routes>
    </>
  );
};

export default App;
