import { Route, Routes } from "react-router-dom";
import Dashboard from "./molecules/Dashboard";
import CarList from "./molecules/CarList";
import Sidebar from "./atom/Sidebar";
import TopBar from "./atom/TopBar";
import Login from "./components/authorization/Login";

const App = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/car-list" element={<CarList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
