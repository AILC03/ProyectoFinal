import { evaluate } from 'mathjs';
import React, { useEffect, useRef } from 'react';

function GeoGebraGraph({ fx, xiFinal }) {
  const appletRef = useRef(null);

  useEffect(() => {
    const params = {
      "appName": "graphing",
      "width": 600,
      "height": 400,
      "showToolBar": false,
      "showAlgebraInput": false,
      "showMenuBar": false,
      "appletOnLoad": function (api) {

        
        // Dibuja la función
        api.evalCommand(`f(x) = ${fx}`);

        // Dibuja el punto en la curva con coordenadas (xiFinal, f(xiFinal))
        try {
          const fxVal = evaluate(fx.replace(/x/g, `(${xiFinal})`)); // eval para obtener f(xiFinal)
          api.evalCommand(`A = (${xiFinal}, ${fxVal})`);
          api.setColor("A", 255, 0, 0);
          api.setPointSize("A", 5);
        } catch (error) {
          console.warn("Error evaluando f(x):", error);
        }
      }
    };

    // Carga el applet
    new window.GGBApplet(params, true).inject(appletRef.current);

  }, [fx, xiFinal]);

  return (
    <div ref={appletRef}></div>
  );
}

export default GeoGebraGraph;
