import React, { useState, useEffect } from "react";
import "../ElegiPersonaje/ElegiPersonaje.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./EmparejarSonido.css";

const JuegoDeSeleccion = () => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showWord1, setShowWord1] = useState(true);
  const [showWord2, setShowWord2] = useState(true);
  const [showWord3, setShowWord3] = useState(true);
  const [showWord4, setShowWord4] = useState(true);

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
      Swal.fire({
        title: "Juego terminado",
        text: "¡Has completado todos los niveles!",
        icon: "success",
      });
    }
    setShowWord1(true);
    setShowWord2(true);
    setShowWord3(true);
    setShowWord4(true);
  };

  const handleRemoveWord = () => {
    const currentGame = juegos[currentGameIndex];
    const palabraCorrecta = currentGame.palabraCorrecta;
    console.log("Current game:", currentGame);
    console.log("Palabra correcta:", palabraCorrecta);

    if (palabraCorrecta === 1) {
      setShowWord2(false);
    } else {
      setShowWord1(false);
    }
    if (palabraCorrecta === 2) {
      setShowWord1(false);
    } else {
      setShowWord2(false);
    }
    if (palabraCorrecta === 3) {
      setShowWord4(false);
    } else {
      setShowWord3(false);
    }
    if (palabraCorrecta === 4) {
      setShowWord3(false);
    } else {
      setShowWord4(false);
    }
  };

  const currentGame = juegos[currentGameIndex];

  const handleAudioClick = () => {
    const audio = new Audio(`../../src/assets/sound/${currentGame.sound}`);
    audio.play();
  };

  const handleWordClick = (selectedWordIndex) => {
    const currentGame = juegos[currentGameIndex];
    const palabraCorrecta = currentGame.palabraCorrecta;

    console.log("selectedWordIndex:", selectedWordIndex);
    console.log("palabraCorrecta:", palabraCorrecta);

    if (selectedWordIndex === palabraCorrecta) {
      Swal.fire({
        title: "¡Correcto!",
        text: "¡Has seleccionado la palabra correcta!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Siguiente",
        cancelButtonText: "Cerrar",
        preConfirm: () => {
          handleNextGame();
        },
      });
    } else {
      Swal.fire({
        title: "Incorrecto",
        text: "¡Has seleccionado la palabra incorrecta!",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      {currentGame && (
        <div className="game">
          <h2 className="level">Nivel: {currentGame.nivel}</h2>
          <h2 className="descrpition">{currentGame.descripcion}</h2>
          <div className="audio-container">
            <button className="button-play" onClick={handleAudioClick}>
              ▶️ Reproducir Audio
            </button>
          </div>
          <div className="caracteristicas">
            {showWord1 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(1)}
              >
                {currentGame.caracteristica1}
              </button>
            )}
            {showWord2 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(2)}
              >
                {currentGame.caracteristica2}
              </button>
            )}
            {showWord3 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(3)}
              >
                {currentGame.caracteristica3}
              </button>
            )}
            {showWord4 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(4)}
              >
                {currentGame.caracteristica4}
              </button>
            )}
          </div>
          <div className="button-container">
            <button className="button-next" onClick={handleNextGame}>
              ➡️ Siguiente
            </button>
            <Link className="button-exit" to="/Anomia">
              ❌ Salir
            </Link>
            <button className="button-help" onClick={handleRemoveWord}>
              💡 Ayuda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JuegoDeSeleccion;
