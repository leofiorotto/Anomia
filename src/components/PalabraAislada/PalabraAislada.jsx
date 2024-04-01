import React, { useState, useEffect } from "react";
import "./PalabraAislada.css";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const PalabraAislada = () => {
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

    if (palabraCorrecta == 1) {
      console.log("Palabra correcta:", palabraCorrecta);
      setShowWord2(false);
      setShowWord1(true);
    } else {
      setShowWord1(false);
    }
    if (palabraCorrecta == 2) {
      console.log("Palabra correcta:", palabraCorrecta);

      setShowWord1(false);
      setShowWord2(true);
    } else {
      setShowWord2(false);
    }
    if (palabraCorrecta == 3) {
      console.log("Palabra correcta:", palabraCorrecta);

      setShowWord4(false);
      setShowWord3(true);
    } else {
      setShowWord3(false);
    }
    if (palabraCorrecta == 4) {
      console.log("Palabra correcta:", palabraCorrecta);

      setShowWord3(false);
      setShowWord4(true);
    } else {
      setShowWord4(false);
    }
  };

  const handleWordClick = (selectedWordIndex) => {
    const currentGame = juegos[currentGameIndex];
    const palabraCorrecta = currentGame.palabraCorrecta;

    console.log("selectedWordIndex:", selectedWordIndex);
    console.log("palabraCorrecta:", palabraCorrecta);

    if (selectedWordIndex == palabraCorrecta) {
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

  const currentGame = juegos[currentGameIndex];

  return (
    <div className="container">
      {currentGame && (
        <div className="game">
          <h2 className="level">Nivel: {currentGame.nivel}</h2>
          <h1 className="tittle">
            Seleccione la palabra correspondiente a la siguiente imagen
          </h1>
          <div className="img-container">
            <img src={currentGame.img1} alt="Imagen 1" />
          </div>
          <div className="caracteristicas">
            {showWord1 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(1)}
              >
                {currentGame.word1}
              </button>
            )}
            {showWord2 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(2)}
              >
                {currentGame.word2}
              </button>
            )}
            {showWord3 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(3)}
              >
                {currentGame.word3}
              </button>
            )}
            {showWord4 && (
              <button
                className="button-word"
                onClick={() => handleWordClick(4)}
              >
                {currentGame.word4}
              </button>
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

export default PalabraAislada;
