import React, { useState, useEffect } from 'react';
import './PalabraAislada.css'

const PalabraAislada = () => {
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
      // Has llegado al final de los juegos, puedes manejar esto como desees
      alert("Has completado todos los juegos.");
    }
  };

  const currentGame = juegos[currentGameIndex];


  return (
    <div className='container'>
    {currentGame && (
      <div className='game'>
        <h1 className='tittle'>Seleccione la palabra correspondiente a la siguiente imagen</h1>
          <div className='img-container'>
            <img src={currentGame.img1} alt="Imagen 1" />
          </div>
      <div className='container-words'>
        <p>{currentGame.word1}</p>
        <p>{currentGame.word2}</p>
        <p>{currentGame.word3}</p>
        <p>{currentGame.word4}</p>
      </div>
          <div className='button-container'>
              <button className='button-help' onClick={handleNextGame}>💡 Ayuda</button>
              <button className='button-next' onClick={handleNextGame}> ➡️ Siguiente</button>
              <button className='button-exit' onClick={handleNextGame}>❌ Salir</button>
          </div>

      </div>
    )}
  </div>
  );
};

export default PalabraAislada;
