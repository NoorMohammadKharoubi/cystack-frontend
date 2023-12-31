import MainPage from "./pages/MainPage";
import Certificate from "./pages/Certificate";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/certificates" element={<Certificate />} />
      </Routes>
    </div>
  );
}

export default App;
