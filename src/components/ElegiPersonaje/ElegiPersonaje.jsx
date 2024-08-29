import React, { useState, useEffect } from "react";
import "./ElegiPersonaje.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";
import Correcto from "../../assets/sound/correcto.mp3";
import Incorrecto from "../../assets/sound/incorrecto.mp3";

const JuegoDeSeleccion = ({ toggleStates, setToggleStates }) => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showImg2, setShowImg2] = useState(true);
  const [showImg1, setShowImg1] = useState(true);

  console.log(toggleStates, "TOGGLER IN 12");

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

    setTimeout(() => {
      setShowImg1(true);
      setShowImg2(true);
    }, 10);
  };

  const handleBackGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(currentGameIndex - 1);
    }

    if (setShowImg2 === true) {
      setShowImg2(false);
    } else {
      setShowImg2(true);
    }
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
  const currentGame = juegos[currentGameIndex];

  const handleImageClick = (selectedImage) => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;

    if (selectedImage === imagenCorrecta) {
      if (toggleStates.writtenFeedback && toggleStates.oralFeedback) {
        // Mostrar Swal y reproducir audio
        Swal.fire({
          title: "¡Correcto!",
          text: "¡Has seleccionado la imagen correcta!",
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
        const audio = new Audio(Correcto);
        audio.play();
      } else if (toggleStates.writtenFeedback) {
        // Mostrar Swal
        Swal.fire({
          title: "¡Correcto!",
          text: "¡Has seleccionado la imagen correcta!",
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
      } else if (toggleStates.oralFeedback) {
        const audio = new Audio(Correcto);
        audio.play();
        setTimeout(() => {
          handleNextGame();
        }, 1200);
      } else {
        // Mostrar Swal
        Swal.fire({
          title: "¡Correcto!",
          text: "¡Has seleccionado la imagen correcta!",
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
      }
    } else {
      if (toggleStates.writtenFeedback && toggleStates.oralFeedback) {
        Swal.fire({
          title: "Incorrecto",
          text: "¡Has seleccionado la imagen incorrecta!",
          icon: "error",
          customClass: {
            popup: "my-popup",
            title: "my-title",
            content: "my-content",
            confirmButton: "my-confirm-button",
            cancelButton: "my-cancel-button",
          },
        });
        const audio = new Audio(Incorrecto);
        audio.play();
      } else if (toggleStates.writtenFeedback) {
        Swal.fire({
          title: "Incorrecto",
          text: "¡Has seleccionado la imagen incorrecta!",
          icon: "error",
          customClass: {
            popup: "my-popup",
            title: "my-title",
            content: "my-content",
            confirmButton: "my-confirm-button",
            cancelButton: "my-cancel-button",
          },
        });
      } else if (toggleStates.oralFeedback) {
        console.log("Reproduciendo audio");
        const audio = new Audio(Incorrecto);
        audio.play();
      } else {
        Swal.fire({
          title: "Incorrecto",
          text: "¡Has seleccionado la imagen incorrecta!",
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
    }
  };

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
                className={
                  showImg1
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                id="imgg"
                alt="Imagen 1"
                onClick={() => handleImageClick(1)}
              />
            )}
            {showImg2 && (
              <img
                src={currentGame.img2}
                className={
                  showImg2
                    ? "img-container-2 slide-out-left"
                    : "img-container-2"
                }
                id="imgg"
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
