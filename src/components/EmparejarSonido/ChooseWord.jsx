import React, { useState, useEffect } from "react";
import "../ElegiPersonaje/ElegiPersonaje.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./EmparejarSonido.css";
import Abeja from "../../assets/sound/abeja.mp3";
import Abuelo from "../../assets/sound/abuelo.mp3";
import Acelga from "../../assets/sound/acelga.mp3";
import Arbol from "../../assets/sound/arbol.mp3";
import Auto from "../../assets/sound/auto.mp3";
import Dentista from "../../assets/sound/dentista.mp3";
import Dentifrico from "../../assets/sound/dentifrico.mp3";
import Chamame from "../../assets/sound/chamame.mp3";
import Computadora from "../../assets/sound/computadora.mp3";
import Pelicula from "../../assets/sound/pelicula.mp3";

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
        const jsonURL = new URL("./data1.json", import.meta.url).toString();
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
    if (currentGameIndex === 0) {
      const audio = new Audio(Computadora);
      audio.play();
    } else if (currentGameIndex === 1) {
      const audio = new Audio(Bicicleta);
      audio.play();
    } else if (currentGameIndex === 2) {
      const audio = new Audio(Avion);
      audio.play();
    } else if (currentGameIndex === 3) {
      const audio = new Audio(Dentista);
      audio.play();
    } else if (currentGameIndex === 4) {
      const audio = new Audio(Dentifrico);
      audio.play();
    } else if (currentGameIndex === 5) {
      const audio = new Audio(Chamame);
      audio.play();
    } else if (currentGameIndex === 6) {
      const audio = new Audio(Computadora);
      audio.play();
    } else if (currentGameIndex === 7) {
      const audio = new Audio(Auto);
      audio.play();
    } else if (currentGameIndex === 8) {
      const audio = new Audio(Arbol);
      audio.play();
    } else if (currentGameIndex === 9) {
      const audio = new Audio(Pelicula);
      audio.play();
    }
  };

  const handleImageClick = (selectedWordIndex) => {
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
          <div className="img-container">
            {showWord1 && (
              <img
                src={currentGame.img1}
                className="img-container-2"
                alt="Imagen 2"
                onClick={() => handleImageClick(1)}
              />
            )}
            {showWord2 && (
              <img
                src={currentGame.img2}
                className="img-container-2"
                alt="Imagen 2"
                onClick={() => handleImageClick(2)}
              />
            )}
            {showWord3 && (
              <img
                src={currentGame.img3}
                className="img-container-2"
                alt="Imagen 2"
                onClick={() => handleImageClick(3)}
              />
            )}
            {showWord4 && (
              <img
                src={currentGame.img4}
                className="img-container-2"
                alt="Imagen 2"
                onClick={() => handleImageClick(4)}
              />
            )}
          </div>
          <div className="button-container">
            <button className="button-next" onClick={handleNextGame}>
              ➡️ Siguiente
            </button>
            <Link className="button-exit" to="/">
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
