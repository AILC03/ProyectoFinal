import React, { useState } from 'react';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import { evaluate } from 'mathjs';
import './styles/styles.css';
import GeoGebraGraph from './Geogebra'; // Importa la gráfica

function PuntoFijo() {
  const [results, setResults] = useState([]);
  const [fxInput, setFxInput] = useState('');

  const fields = [
    { name: 'fx', label: 'f(x)', type: 'text', required: true },
    { name: 'gx', label: 'g(x)', type: 'text', required: true },
    { name: 'xi', label: 'Valor inicial (Xi)', type: 'number', required: true },
    { name: 'tol', label: 'Tolerancia (%)', type: 'number', step: 'any', required: true },
    { name: 'maxIter', label: 'Máx. iteraciones', type: 'number', required: true },
  ];

  const columns = [
    { header: 'Iteración', accessor: 'iteration' },
    { header: 'Xi', accessor: 'xi' },
    { header: 'g(Xi)', accessor: 'gxi' },
    { header: 'f(g(Xi))', accessor: 'fxgxi' },
    { header: 'Error (%)', accessor: 'error' },
  ];

  const fixedPointMethod = ({ fx, gx, xi, maxIter, tol }) => {
    const newResults = [];
    let error = 1;
    let iteration = 0;

    while (error > tol / 100 && iteration < maxIter) {
      const gxi = evaluate(gx, { x: xi });
      const fxgxi = evaluate(fx, { x: gxi });
      error = Math.abs((gxi - xi) / gxi) * 100;

      newResults.push({
        iteration: iteration + 1,
        xi,
        gxi,
        fxgxi,
        error,
      });

      if (error < tol) break;

      xi = gxi;
      iteration++;
    }

    setFxInput(fx); // Guarda la función para graficar
    setResults(newResults); // Guarda los resultados para la tabla
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      fx: event.target.fx.value,
      gx: event.target.gx.value,
      xi: parseFloat(event.target.xi.value),
      tol: parseFloat(event.target.tol.value),
      maxIter: parseInt(event.target.maxIter.value),
    };
    fixedPointMethod(formData);
  };

  return (
    <div className="despliegue">
      <h1>Método de Punto Fijo</h1>
      <form onSubmit={handleFormSubmit}>
        <InputForm fields={fields} />
        <button type="submit">Calcular</button>
      </form>
      {results.length > 0 && (
        <>
          <ResultTable columns={columns} results={results} />
          <GeoGebraGraph fx={fxInput} xiFinal={results[results.length - 1].xi} /> {/* Aquí pasamos el valor de xi final */}
        </>
      )}
    </div>
  );
}

export default PuntoFijo;
