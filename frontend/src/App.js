import { Routes, Route } from "react-router-dom";
import EquipmentPage from "./pages/EquipmentPage";
import MaintenancePage from "./pages/MaintenancePage";
import ReportPage from "./pages/ReportPage";

function App() {
  return (
    <div className="container mt-4">
      <Routes>
        <Route path="/equipments" element={<EquipmentPage />} />
        <Route path="/maintenances" element={<MaintenancePage />} />
        <Route path="/report" element={<ReportPage />} />
      </Routes>
    </div>
  );
}

export default App;
