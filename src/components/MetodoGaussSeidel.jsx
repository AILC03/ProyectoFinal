import React, { useState } from 'react';
import { evaluate } from 'mathjs';

function MetodoGaussSeidel() {
  const [ecX, setEcX] = useState('');
  const [ecY, setEcY] = useState('');
  const [ecZ, setEcZ] = useState('');
  const [tolerancia, setTolerancia] = useState(0.001);
  const [maxIteraciones, setMaxIteraciones] = useState(50);
  const [resultados, setResultados] = useState([]);
  const [tiempo, setTiempo] = useState(0);

  const ejecutarGaussSeidel = () => {
    try {
      const inicio = performance.now();

      let x = 0, y = 0, z = 0;
      let iteracion = 0;
      let errorX = 100, errorY = 100, errorZ = 100;

      const datos = [];

      while (
        (errorX > tolerancia || errorY > tolerancia || errorZ > tolerancia) &&
        iteracion < maxIteraciones
      ) {
        const anteriorX = x;
        const anteriorY = y;
        const anteriorZ = z;

        const contexto = { x, y, z };

        x = evaluate(ecX, contexto);
        contexto.x = x;
        y = evaluate(ecY, contexto);
        contexto.y = y;
        z = evaluate(ecZ, contexto);

        errorX = Math.abs((x - anteriorX) / (x || 1)) * 100;
        errorY = Math.abs((y - anteriorY) / (y || 1)) * 100;
        errorZ = Math.abs((z - anteriorZ) / (z || 1)) * 100;
        const errorPromedio = ((errorX + errorY + errorZ) / 3).toFixed(4);

        datos.push({
          iteracion: iteracion + 1,
          x: x.toFixed(6),
          y: y.toFixed(6),
          z: z.toFixed(6),
          errorX: errorX.toFixed(4),
          errorY: errorY.toFixed(4),
          errorZ: errorZ.toFixed(4),
          errorPromedio,
        });

        iteracion++;
      }

      const fin = performance.now();
      setTiempo((fin - inicio).toFixed(2));
      setResultados(datos);
    } catch (err) {
      alert('Error al procesar. Revisa el formato de las ecuaciones.');
    }
  };

  return (
    <div>
      <h2>Método de Gauss-Seidel</h2>
      <p>Ingresa las ecuaciones despejadas:</p>
      <label>x = </label>
      <input
        type="text"
        value={ecX}
        onChange={(e) => setEcX(e.target.value)}
        placeholder="Ej. (9 - 2*y - z) / 10"
      /><br />
      <label>y = </label>
      <input
        type="text"
        value={ecY}
        onChange={(e) => setEcY(e.target.value)}
        placeholder="Ej. (7 - 2*x - 3*z) / 10"
      /><br />
      <label>z = </label>
      <input
        type="text"
        value={ecZ}
        onChange={(e) => setEcZ(e.target.value)}
        placeholder="Ej. (8 - x - 3*y) / 10"
      /><br /><br />

      <label>Tolerancia (%): </label>
      <input
        type="number"
        step="any"
        value={tolerancia}
        onChange={(e) => setTolerancia(parseFloat(e.target.value))}
      />
      <br />
      <label>Máx. Iteraciones: </label>
      <input
        type="number"
        value={maxIteraciones}
        onChange={(e) => setMaxIteraciones(parseInt(e.target.value))}
      />
      <br />
      <button onClick={ejecutarGaussSeidel}>Calcular</button>

      {resultados.length > 0 && (
        <>
          <h3>Resultados por Iteración:</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Iteración</th>
                <th>x</th>
                <th>y</th>
                <th>z</th>
                <th>Error x (%)</th>
                <th>Error y (%)</th>
                <th>Error z (%)</th>
                <th>Error Promedio (%)</th>
              </tr>
            </thead>
            <tbody>
              {resultados.map((row, i) => (
                <tr key={i}>
                  <td>{row.iteracion}</td>
                  <td>{row.x}</td>
                  <td>{row.y}</td>
                  <td>{row.z}</td>
                  <td>{row.errorX}</td>
                  <td>{row.errorY}</td>
                  <td>{row.errorZ}</td>
                  <td>{row.errorPromedio}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>Tiempo de ejecución: <strong>{tiempo} ms</strong></p>
        </>
      )}
    </div>
  );
}

export default MetodoGaussSeidel;
