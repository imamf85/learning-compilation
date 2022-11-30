import CarsGraph from "./atom/CarsGraph";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./molecules/Dashboard";
import Cars from "./molecules/Cars";
import Sidebar from "./atom/Sidebar";
import TopBar from "./atom/TopBar";

const App = () => {
  return (
    <>
      <Sidebar />
      <TopBar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cars" element={<Cars />} />
      </Routes>
    </>
  );
};

export default App;
