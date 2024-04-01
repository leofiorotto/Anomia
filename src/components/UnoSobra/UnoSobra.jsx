import React, { useState, useEffect } from "react";
import "./UnoSobra.css";
import { ArrowCircleRight } from "@styled-icons/evaicons-solid/ArrowCircleRight";
import { ArrowCircleLeft } from "@styled-icons/evaicons-solid/ArrowCircleLeft";
import { HelpCircle } from "@styled-icons/boxicons-solid/HelpCircle";
import { Home } from "@styled-icons/boxicons-regular/Home";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const UnoSobra = () => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showImg1, setShowImg1] = useState(true); // Nuevo estado para controlar si mostrar img2
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
      // Has llegado al final de los juegos, puedes manejar esto como desees
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
    setShowImg3(true);
    setShowImg4(true);
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
    if (imagenCorrecta == 1) {
      setShowImg2(false);
    } else {
      setShowImg1(false);
    }
    if (imagenCorrecta == 2) {
      setShowImg1(false);
    } else {
      setShowImg2(false);
    }
    if (imagenCorrecta == 3) {
      setShowImg4(false);
    } else {
      setShowImg3(false);
    }
    if (imagenCorrecta == 4) {
      setShowImg3(false);
    } else {
      setShowImg4(false);
    }
  };

  const handleImageClick = (selectedImgIndex) => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;

    console.log("selectedImgIndex:", selectedImgIndex);
    console.log("imagenCorrecta:", imagenCorrecta);

    if (selectedImgIndex == imagenCorrecta) {
      console.log("¡Has seleccionado la imagen correcta!");
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
                alt="Imagen 2"
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
                alt="Imagen 2"
                onClick={() => handleImageClick(3)}
              />
            )}
            {showImg4 && (
              <img
                src={currentGame.img4}
                className="img-container-2"
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
