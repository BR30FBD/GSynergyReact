import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoresPage from "./pages/StoresPage";
import SKUsPage from "./pages/SKUsPage";
import PlanningPage from "./pages/PlanningPage";
import ChartPage from "./pages/ChartPage";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Router>
   
      <div className="flex">
        {/* Sidebar Navigation */}
     <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/skus" element={<SKUsPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/chart" element={<ChartPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
