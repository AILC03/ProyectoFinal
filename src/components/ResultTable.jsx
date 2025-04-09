// src/componentes/ResultTable.jsx
import React from 'react';

function ResultTable({ columns, results }) {
  return (
    <div className="table-container">
      <h2>Resultados</h2>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => {
                const value = row[col.accessor];
                return (
                  <td key={col.accessor}>
                    {typeof value === 'number'
                      ? value.toFixed(6)
                      : value ?? '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultTable;
