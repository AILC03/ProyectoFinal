import React, { useState } from 'react';
import { derivative, parse } from 'mathjs';
import InputForm from './InputForm';
import ResultTable from './ResultTable';
import GeoGebraGraph from './Geogebra'; // 👈 Importa la gráfica
import './styles/styles.css';

function MetodoNewtonRaphson() {
  const [results, setResults] = useState([]);
  const [fxInput, setFxInput] = useState('');

  const fields = [
    { name: 'fx', label: 'f(x)', type: 'text', required: true },
    { name: 'xi', label: 'Valor inicial (Xi)', type: 'number', required: true },
    { name: 'tol', label: 'Tolerancia (%)', type: 'number', step: 'any', required: true },
    { name: 'maxIter', label: 'Máx. iteraciones', type: 'number', required: true },
  ];

  const columns = [
    { header: 'Iteración', accessor: 'iteration' },
    { header: 'Xi', accessor: 'xi' },
    { header: 'f(Xi)', accessor: 'fxi' },
    { header: "f'(Xi)", accessor: 'fpxi' },
    { header: 'Xi+1', accessor: 'xiPlus1' },
    { header: 'Error (%)', accessor: 'error' },
  ];

  const newtonRaphsonMethod = ({ fx, xi, maxIter, tol }) => {
    const newResults = [];
    let error = 1;
    let iteration = 0;

    const parsedFx = parse(fx);
    const parsedDerivative = derivative(fx, 'x');

    while (error > tol / 100 && iteration < maxIter) {
      const fxi = parsedFx.evaluate({ x: xi });
      const fpxi = parsedDerivative.evaluate({ x: xi });
      const xiPlus1 = xi - fxi / fpxi;
      error = Math.abs((xiPlus1 - xi) / xiPlus1) * 100;

      newResults.push({
        iteration: iteration + 1,
        xi,
        fxi,
        fpxi,
        xiPlus1,
        error,
      });

      xi = xiPlus1;
      iteration++;
    }

    setFxInput(fx); // Guarda la función para graficar
    setResults(newResults); // Guarda los resultados para la tabla
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      fx: event.target.fx.value,
      xi: parseFloat(event.target.xi.value),
      tol: parseFloat(event.target.tol.value),
      maxIter: parseInt(event.target.maxIter.value),
    };
    newtonRaphsonMethod(formData);
  };
  return (
    <div className="despliegue">
      <h1>Método de Newton-Raphson</h1>
      <form onSubmit={handleFormSubmit}>
        <InputForm fields={fields} />
        <button type="submit">Calcular</button>
      </form>
      {results.length > 0 && (
        <>
          <ResultTable columns={columns} results={results} />
          <GeoGebraGraph fx={fxInput} xiFinal={results[results.length - 1].xiPlus1} />
        </>
      )}
    </div>
  );
}

export default MetodoNewtonRaphson;
