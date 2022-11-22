import { Route, Routes } from "react-router-dom";
import Login from "./components/authorization/Login";
import Dashboard from "./components/homepage/dashboard/Dashboard";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App;
