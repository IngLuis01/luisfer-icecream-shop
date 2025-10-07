import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Productos from "./pages/Products";
import Ingredientes from "./pages/Ingredients";
import Ventas from "./pages/Sales";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ingredientes" element={<Ingredientes />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

