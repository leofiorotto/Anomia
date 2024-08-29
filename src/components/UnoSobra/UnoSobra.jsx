import React, { useState, useEffect } from "react";
import "./UnoSobra.css";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CorrectSound from "../../assets/sound/correcto.mp3";
import IncorrectSound from "../../assets/sound/incorrecto.mp3";

const UnoSobra = ({ toggleStates, setToggleStates }) => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showImg1, setShowImg1] = useState(true);
  const [showImg2, setShowImg2] = useState(true);
  const [showImg3, setShowImg3] = useState(true);
  const [showImg4, setShowImg4] = useState(true);

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

    setShowImg1(false);
    setShowImg2(false);
    setShowImg3(false);
    setShowImg4(false);

    setTimeout(() => {
      setShowImg1(true);
      setShowImg2(true);
      setShowImg3(true);
      setShowImg4(true);
    }, 20);
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
    setShowImg1(true);
    setShowImg2(true);
    setShowImg3(true);
    setShowImg4(true);
  };

  const handleRemoveImage = () => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;
    if (imagenCorrecta === 1) {
      setShowImg2(false);
    } else {
      setShowImg1(false);
    }
    if (imagenCorrecta === 2) {
      setShowImg1(false);
    } else {
      setShowImg2(false);
    }
    if (imagenCorrecta === 3) {
      setShowImg4(false);
    } else {
      setShowImg3(false);
    }
    if (imagenCorrecta === 4) {
      setShowImg3(false);
    } else {
      setShowImg4(false);
    }
  };

  const handleImageClick = (selectedImgIndex) => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;

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

    const isCorrect = selectedImgIndex == imagenCorrecta;

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

          <h1 className="tittle">
            Seleccione la imagen que no pertenece al grupo
          </h1>
          <div className="img-container">
            {showImg1 && (
              <img
                src={currentGame.img1}
                className="img-container-2"
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
            {showImg3 && (
              <img
                src={currentGame.img3}
                className="img-container-2"
                alt="Imagen 3"
                onClick={() => handleImageClick(3)}
              />
            )}
            {showImg4 && (
              <img
                src={currentGame.img4}
                className="img-container-2"
                alt="Imagen 4"
                onClick={() => handleImageClick(4)}
              />
            )}
          </div>

          <div className="button-container">
            <ArrowCircleLeft
              size={100}
              onClick={handlePreviousGame}
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

export default UnoSobra;
