import React, { useState, useEffect } from "react";
import "../ElegiPersonaje/ElegiPersonaje.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { CirclePlay } from "@styled-icons/fa-regular/CirclePlay";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";
import CorrectSound from "../../assets/sound/correcto.mp3";
import IncorrectSound from "../../assets/sound/incorrecto.mp3";

const JuegoDeSeleccion = ({ toggleStates, setToggleStates }) => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showImg2, setShowImg2] = useState(true);
  const [showImg1, setShowImg1] = useState(true);

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
        customClass: {
          popup: "my-popup",
          title: "my-title",
          content: "my-content",
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
      });
    }

    setShowImg1(true);
    setShowImg2(true);
  };

  const handleBackGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(currentGameIndex - 1);
    }

    setShowImg1(true);
    setShowImg2(true);
  };

  const handleRemoveImage = () => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;

    if (imagenCorrecta === 1) {
      setShowImg2(false);
    } else if (imagenCorrecta === 2) {
      setShowImg1(false);
    }
  };

  const playFeedbackAudio = (isCorrect) => {
    const audio = new Audio(isCorrect ? CorrectSound : IncorrectSound);
    audio.play();
  };

  const showFeedbackModal = (isCorrect) => {
    Swal.fire({
      title: isCorrect ? "¡Correcto!" : "Incorrecto",
      text: isCorrect
        ? "¡Has seleccionado la imagen correcta!"
        : "¡Has seleccionado la imagen incorrecta!",
      icon: isCorrect ? "success" : "error",
      showCancelButton: isCorrect,
      confirmButtonText: isCorrect ? "Siguiente" : "Cerrar",
      cancelButtonText: "Cerrar",
      customClass: {
        popup: "my-popup",
        title: "my-title",
        content: "my-content",
        confirmButton: "my-confirm-button",
        cancelButton: "my-cancel-button",
      },
      preConfirm: isCorrect ? handleNextGame : null,
    });
  };

  const handleImageClick = (selectedImage) => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;

    const isCorrect = selectedImage === imagenCorrecta;

    if (toggleStates.oralFeedback && toggleStates.writtenFeedback) {
      playFeedbackAudio(isCorrect);
      showFeedbackModal(isCorrect);
    } else if (toggleStates.oralFeedback) {
      playFeedbackAudio(isCorrect);
    } else {
      showFeedbackModal(isCorrect);
    }
  };

  const currentGame = juegos[currentGameIndex];

  return (
    <div className="container">
      {currentGame && (
        <div className="game">
          <h2 className="level">Nivel: {currentGame.nivel}</h2>
          <h2 className="descrpition">{currentGame.descripcion}</h2>
          <ul className="list">
            {currentGame.caracteristicas.map((caracteristica, i) => (
              <li className="item-list" key={i}>
                {caracteristica}
              </li>
            ))}
          </ul>
          <div className="img-container">
            {showImg1 && (
              <img
                src={currentGame.img1}
                className="img-container-1"
                alt="Imagen 1"
                onClick={() => handleImageClick(1)}
              />
            )}
            {showImg2 && (
              <img
                src={currentGame.img2}
                className="img-container-2"
                alt="Imagen 2"
                onClick={() => handleImageClick(2)}
              />
            )}
          </div>
          <div className="button-container">
            <ArrowCircleLeft
              size={100}
              onClick={handleBackGame}
            ></ArrowCircleLeft>
            <HelpCircle size={100} onClick={handleRemoveImage}></HelpCircle>
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