import { Route, Routes } from "react-router-dom";
import Login from "./components/authorization/Login";
import CarList from "./components/homepage/carList/CarList";
import Dashboard from "./components/homepage/dashboard/Dashboard";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/car-list" element={<CarList />} />
      </Routes>
    </div>
  );
};

export default App;
