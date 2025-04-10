import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import './styles/styles.css';
import GeoGebraGraph from './Geogebra'; // Importa la gráfica

function MetodoFalsaPosicion() {
  const [results, setResults] = useState([]);
  const [fxInput, setFxInput] = useState('');
  const [executionTime, setExecutionTime] = useState(null); // ⏱️ Nuevo estado

  // Campos para el formulario
  const fields = [
    { name: 'fx', label: 'f(x)', type: 'text', required: true },
    { name: 'xi', label: 'Valor inicial (Xi)', type: 'number', required: true },
    { name: 'xu', label: 'Valor final (Xu)', type: 'number', required: true },
    { name: 'tol', label: 'Tolerancia (%)', type: 'number', step: 'any', required: true },
    { name: 'maxIter', label: 'Máx. iteraciones', type: 'number', required: true },
  ];

  // Columnas para la tabla
  const columns = [
    { header: 'Iteración', accessor: 'iteration' },
    { header: 'Xi', accessor: 'xi' },
    { header: 'Xu', accessor: 'xu' },
    { header: 'f(Xi)', accessor: 'fxi' },
    { header: 'f(Xu)', accessor: 'fxu' },
    { header: 'Xr', accessor: 'xr' },
    { header: 'f(Xr)', accessor: 'fxr' },
    { header: 'Error (%)', accessor: 'error' },
    { header: 'Signo', accessor: 'signo' },
  ];

  // Método de Falsa Posición
  const metodoFalsaPosicion = ({ fx, xi, xu, maxIter, tol }) => {
    const t0 = performance.now(); // ⏱️ Inicio del cronómetro
    const newResults = [];
    let error = 1;
    let iteration = 0;

    const f = (x) => evaluate(fx, { x });

    if (f(xi) * f(xu) >= 0) {
      alert("La función debe tener signos opuestos en xi y xu.");
      return;
    }

    while (error > tol && iteration < maxIter) {
      const fxi = f(xi);
      const fxu = f(xu);
      const xr = xu - (fxu * (xi - xu)) / (fxi - fxu);
      const fxr = f(xr);
      const signo = fxi * fxr < 0 ? '-' : '+';

      error = Math.abs((xr - xi) / xr) * 100;

      newResults.push({
        iteration: iteration + 1,
        xi,
        xu,
        fxi,
        fxu,
        xr,
        fxr,
        error,
        signo,
      });

      if (fxi * fxr < 0) {
        xu = xr;
      } else {
        xi = xr;
      }

      iteration++;
    }
    const t1 = performance.now(); // ⏱️ Fin del cronómetro
    setFxInput(fx); // Guarda la función para graficar
    setResults(newResults); // Guarda los resultados para la tabla
    setExecutionTime((t1 - t0).toFixed(2)); // Guardamos tiempo en ms con 2 decimales
  };

  // Función para manejar el envío del formulario
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevenir recarga de página
    // Aquí extraes los valores de InputForm, por ejemplo:
    const formData = {
      fx: event.target.fx.value,
      xi: parseFloat(event.target.xi.value),
      xu: parseFloat(event.target.xu.value),
      tol: parseFloat(event.target.tol.value),
      maxIter: parseInt(event.target.maxIter.value),
    };
    metodoFalsaPosicion(formData);
  };

  return (
    <div className="despliegue">
      <h1>Método de Falsa Posición</h1>
      <form onSubmit={handleFormSubmit}>
        <InputForm fields={fields} />
        <button type="submit">Calcular</button>
      </form>
      {results.length > 0 && (
        <>
          <div className='TiempoEjec'>
            <label><strong>Tiempo de ejecución:</strong> {executionTime} ms</label>
          </div>
          <ResultTable columns={columns} results={results} />
          <GeoGebraGraph fx={fxInput} xiFinal={results[results.length - 1].xr} /> {/* Aquí pasamos el valor de xr */}
        </>
      )}
    </div>
  );
}

export default MetodoFalsaPosicion;
