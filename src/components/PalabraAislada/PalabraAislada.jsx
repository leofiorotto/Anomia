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
      setShowImg2(false); // Si la imagen correcta es la 1, oculta la imagen 2
    } else if (imagenCorrecta === 2) {
      setShowImg1(false); // Si la imagen correcta es la 2, oculta la imagen 1
    }
  };

  const currentGame = juegos[currentGameIndex];

  return (
    <div className="container">
      {currentGame && (
        <div className="game">
          <h1 className="tittle">
            Seleccione la palabra correspondiente a la siguiente imagen
          </h1>
          <div className="img-container">
            <img src={currentGame.img1} alt="Imagen 1" />
          </div>
          <div className="container-words">
            <p>{currentGame.word1}</p>
            <p>{currentGame.word2}</p>
            <p>{currentGame.word3}</p>
            <p>{currentGame.word4}</p>
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

export default PalabraAislada;