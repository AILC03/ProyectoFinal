import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para navegar entre las rutas
import './home.css'

const Home = () => {
  return (
    <div className="home">
      <h1>Bienvenido a la Calculadora Numérica</h1>
      <p>Selecciona un método para resolver tu ecuación:</p>

      {/* Formulario que contiene los botones */}
      <form className="method-form">
        <div className="button-group">
          <Link to="/biseccion">
            <button className="method-button">Método de Bisección</button>
          </Link>

          <Link to="/punto-fijo">
            <button className="method-button">Método de Punto Fijo</button>
          </Link>

          <Link to="/falsa-posicion">
            <button className="method-button">Método de Falsa Posición</button>
          </Link>

          <Link to="/newton-raphson">
            <button className="method-button">Método de Newton-Raphson</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Home;
