import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Ingredientes from "./pages/Ingredients";

//import Ventas from "./pages/Ventas";
//import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
                             
        <Route path="/Ingredients" element={<Ingredientes />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
