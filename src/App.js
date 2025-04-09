import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import MetodoBiseccion from "./components/MetodoBiseccion";
import PuntoFijo from "./components/MetodoPuntoFijo";
import MetodoFalsaPosicion from "./components/MetodoFalsaPosicion";
import MetodoNewtonRaphson from "./components/MetodoNewtonRaphson";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/punto-fijo" element={<PuntoFijo />} />
        <Route path="/biseccion" element={<MetodoBiseccion />} />
        <Route path="/falsa-posicion" element={<MetodoFalsaPosicion />} />
        <Route path="/newton-raphson" element={<MetodoNewtonRaphson />} />
      </Routes>
    </Router>
  );
}

export default App;
