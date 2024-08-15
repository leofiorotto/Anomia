import React, { useState, useEffect } from "react";
import "../ElegiPersonaje/ElegiPersonaje.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./EmparejarSonido.css";
import Pantalon from "../../assets/sound/pantalon.mp3";
import Zapatilla from "../../assets/sound/zapatilla.mp3";
import Cama from "../../assets/sound/cama.mp3";
import Cuchara from "../../assets/sound/cuchara.mp3";
import Tenis from "../../assets/sound/tenis.mp3";
import Lapicera from "../../assets/sound/lapicera.mp3";
import Aire from "../../assets/sound/aire.mp3";
import Amaca from "../../assets/sound/amaca.mp3";
import Copa from "../../assets/sound/copa.mp3";
import Chocolate from "../../assets/sound/chocolate.mp3";
import { CirclePlay } from "@styled-icons/fa-regular/CirclePlay";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";

const JuegoDeSeleccion = ({ toggleStates, setToggleStates}) => {
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
        customClass: {
          popup: "my-popup",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
      });
    }
    setShowWord1(false);
    setShowWord2(false);
    setShowWord3(false);
    setShowWord4(false);

    setTimeout(() => {
      setShowWord1(true);
      setShowWord2(true);
      setShowWord3(true);
      setShowWord4(true);
    }, 30);
  };

  const handlePreviousGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(currentGameIndex - 1);
    } else {
      Swal.fire({
        title: "Inicio del juego",
        text: "¡Este es el primer nivel!",
        icon: "info",
        customClass: {
          popup: "my-popup",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
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
      const audio = new Audio(Pantalon);
      audio.play();
    } else if (currentGameIndex === 1) {
      const audio = new Audio(Zapatilla);
      audio.play();
    } else if (currentGameIndex === 2) {
      const audio = new Audio(Cama);
      audio.play();
    } else if (currentGameIndex === 3) {
      const audio = new Audio(Cuchara);
      audio.play();
    } else if (currentGameIndex === 4) {
      const audio = new Audio(Tenis);
      audio.play();
    } else if (currentGameIndex === 5) {
      const audio = new Audio(Lapicera);
      audio.play();
    } else if (currentGameIndex === 6) {
      const audio = new Audio(Aire);
      audio.play();
    } else if (currentGameIndex === 7) {
      const audio = new Audio(Amaca);
      audio.play();
    } else if (currentGameIndex === 8) {
      const audio = new Audio(Copa);
      audio.play();
    } else if (currentGameIndex === 9) {
      const audio = new Audio(Chocolate);
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
        customClass: {
          popup: "my-popup",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
        preConfirm: () => {
          handleNextGame();
        },
      });
    } else {
      Swal.fire({
        title: "Incorrecto",
        text: "¡Has seleccionado la palabra incorrecta!",
        icon: "error",
        customClass: {
          popup: "my-popup",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
      });
    }
  };

  return (
    <div className="container">
      {currentGame && (
        <div className="game game-sound">
          <h2 className="level">Nivel: {currentGame.nivel}</h2>
          <h2 className="descrpition">{currentGame.descripcion}</h2>
          <div className="audio-container">
            <CirclePlay size={104} onClick={handleAudioClick}>
              {" Reproducir audio"}
            </CirclePlay>
          </div>
          <div className="img-container">
            {showWord1 && (
              <img
                src={currentGame.img1}
                className={
                  showWord1
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                alt="Imagen 2"
                onClick={() => handleImageClick(1)}
              />
            )}
            {showWord2 && (
              <img
                src={currentGame.img2}
                className={
                  showWord2
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                alt="Imagen 2"
                onClick={() => handleImageClick(2)}
              />
            )}
            {showWord3 && (
              <img
                src={currentGame.img3}
                className={
                  showWord3
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                alt="Imagen 2"
                onClick={() => handleImageClick(3)}
              />
            )}
            {showWord4 && (
              <img
                src={currentGame.img4}
                className={
                  showWord4
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                alt="Imagen 2"
                onClick={() => handleImageClick(4)}
              />
            )}
          </div>
          <div className="button-container">
            <ArrowCircleLeft
              size={100}
              onClick={handlePreviousGame}
            ></ArrowCircleLeft>
            <HelpCircle size={100} onClick={handleRemoveWord}></HelpCircle>
            <ArrowCircleRight
              size={100}
              onClick={handleNextGame}
            ></ArrowCircleRight>
            <Link to="/">
              <Home size={100}></Home>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default JuegoDeSeleccion;
