import React, { useState, useEffect } from 'react';

const JuegoDeSeleccion = () => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonURL = new URL("./data.json", import.meta.url).toString();
        const response = await fetch(jsonURL);
                if (!response.ok) {
          throw new Error("No se pudo cargar el JSON.");
        }
        const data = await response.json();
        setJuegos(data.juegos);
      } catch (error) {
        console.error("Error al cargar el JSON:", error);
      }
    };

    fetchData();
  }, []);

  const handleNextGame = () => {
    if (currentGameIndex < juegos.length - 1) {
      setCurrentGameIndex(currentGameIndex + 1);
    } else {
      alert("Has completado todos los juegos.");
    }
  };

  const currentGame = juegos[currentGameIndex];


  return (
    <div>
      {currentGame && (
        <div>
          <h1>{currentGame.descripcion}</h1>
          <p>Palabra: {currentGame.palabra}</p>
          <div>
            <img src={currentGame.img1} alt="Imagen 1" />
            <img src={currentGame.img2} alt="Imagen 2" />
            <img src={currentGame.img3} alt="Imagen 3" />
            <img src={currentGame.img4} alt="Imagen 4" />
          </div>
          <button onClick={handleNextGame}>Siguiente</button>
        </div>
      )}
    </div>
  );
};

export default JuegoDeSeleccion;
