import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import MasterPage from "./components/MasterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/master" element={<MasterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
