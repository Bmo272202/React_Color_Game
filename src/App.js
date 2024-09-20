import "./App.css";
import { useState, useRef, useEffect } from "react";

function getColor(colorActual) {
  const colores = ["#ffc300", "#fc0808", " #00bf29 "];
  let randomColorIndex, colorAleatorio;

  do {
    randomColorIndex = Math.floor(Math.random() * colores.length);
    colorAleatorio = colores[randomColorIndex];
  } while (colorAleatorio === colorActual);

  return colorAleatorio;
}

function App() {
  const [colorActual1, setColorActual1] = useState(null);
  const [colorActual2, setColorActual2] = useState(null);
  const [colorActual3, setColorActual3] = useState(null);
  const [detenidos, setDetenidos] = useState({
    det1: false,
    det2: false,
    det3: false,
  });

  const elemento = useRef();
  const elemento1 = useRef();
  const elemento2 = useRef();
  const texto = useRef();

  const interval1 = useRef(null);
  const interval2 = useRef(null);
  const interval3 = useRef(null);

  useEffect(() => {
    interval1.current = setInterval(() => {
      setColorActual1((colorPrevio) => {
        const color1 = getColor(colorPrevio);
        if (elemento.current) {
          elemento.current.style.backgroundColor = color1;
        }
        return color1;
      });
    }, 500);

    interval2.current = setInterval(() => {
      setColorActual2((colorPrevio) => {
        const color2 = getColor(colorPrevio);
        if (elemento1.current) {
          elemento1.current.style.backgroundColor = color2;
        }
        return color2;
      });
    }, 500);

    interval3.current = setInterval(() => {
      setColorActual3((colorPrevio) => {
        const color3 = getColor(colorPrevio);
        if (elemento2.current) {
          elemento2.current.style.backgroundColor = color3;
        }
        return color3;
      });
    }, 500);

    return () => {
      clearInterval(interval1.current);
      clearInterval(interval2.current);
      clearInterval(interval3.current);
    };
  }, []);

  const detener = (interval, key) => {
    clearInterval(interval.current);
    setDetenidos((prevDetenidos) => ({ ...prevDetenidos, [key]: true }));
  };

  const detener1 = () => {
    detener(interval1, "det1");
  };

  const detener2 = () => {
    detener(interval2, "det2");
  };

  const detener3 = () => {
    detener(interval3, "det3");
  };

  useEffect(() => {
    if (detenidos.det1 && detenidos.det2 && detenidos.det3) {
      verificarResultado();
    }
  }, [detenidos]);

  const verificarResultado = () => {
    if (colorActual1 === colorActual2 && colorActual2 === colorActual3) {
      if (texto.current) {
        texto.current.innerText = "Ganaste!!!";
      }
    } else {
      if (texto.current) {
        texto.current.innerText = "Perdiste!!!";
      }
    }
  };

  const reiniciar = () => {
    clearInterval(interval1.current);
    clearInterval(interval2.current);
    clearInterval(interval3.current);
    setColorActual1(null);
    setColorActual2(null);
    setColorActual3(null);
    setDetenidos({
      det1: false,
      det2: false,
      det3: false,
    });
    if (texto.current) {
      texto.current.innerText = "";
    }

    interval1.current = setInterval(() => {
      setColorActual1((colorPrevio) => {
        const color1 = getColor(colorPrevio);
        if (elemento.current) {
          elemento.current.style.backgroundColor = color1;
        }
        return color1;
      });
    }, 500);

    interval2.current = setInterval(() => {
      setColorActual2((colorPrevio) => {
        const color2 = getColor(colorPrevio);
        if (elemento1.current) {
          elemento1.current.style.backgroundColor = color2;
        }
        return color2;
      });
    }, 500);

    interval3.current = setInterval(() => {
      setColorActual3((colorPrevio) => {
        const color3 = getColor(colorPrevio);
        if (elemento2.current) {
          elemento2.current.style.backgroundColor = color3;
        }
        return color3;
      });
    }, 500);
  };

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Document</title>
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
            crossOrigin="anonymous"
          />
        </head>
        <body>
          <div className="row">
            <div className="col" ref={elemento}></div>
            <div className="col" ref={elemento1}></div>
            <div className="col" ref={elemento2}></div>
          </div>

          <div className="stop">
            <button
              className="btn btn-outline-primary"
              id="btn"
              onClick={detener1}
            >
              Detener 1
            </button>
            <button
              className="btn btn-outline-primary"
              id="btn2"
              onClick={detener2}
            >
              Detener 2
            </button>
            <button
              className="btn btn-outline-primary"
              id="btn3"
              onClick={detener3}
            >
              Detener 3
            </button>
            <button
              className="btn btn-outline-secondary"
              id="btn1"
              onClick={reiniciar}
            >
              Reiniciar
            </button>
          </div>

          <div className="dd">
            <p className="display-1" ref={texto}></p>
          </div>
        </body>
      </html>
    </>
  );
}

export default App;
