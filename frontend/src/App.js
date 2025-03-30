import { Routes, Route } from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";
import MaintenancePage from "./pages/MaintenancePage";
import ReportPage from "./pages/ReportPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/equipments" element={<EquipmentPage />} />
        <Route path="/maintenances" element={<MaintenancePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </div>
  );
}

export default App;
