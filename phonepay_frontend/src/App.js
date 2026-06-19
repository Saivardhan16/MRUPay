import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Pages/Login";
import Registration from "./components/Pages/Register";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;