import React, { useState, useEffect } from 'react';
import './ElegiPersonaje.css'
import Swal from 'sweetalert2';


const JuegoDeSeleccion = () => {
  const [juegos, setJuegos] = useState([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [showImg2, setShowImg2] = useState(true); // Nuevo estado para controlar si mostrar img2



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

    if (setShowImg2 === true) {
      setShowImg2(false);
    } else {  
      setShowImg2(true);
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
    setShowImg2(false); // Ocultar la segunda imagen
  };
  const currentGame = juegos[currentGameIndex];

  const handleImageClick = (selectedImage) => {
    const currentGame = juegos[currentGameIndex];
    const imagenCorrecta = currentGame.imagenCorrecta;
  
    if (selectedImage === imagenCorrecta) {
      Swal.fire({
        title: '¡Correcto!',
        text: '¡Has seleccionado la imagen correcta!',
        icon: 'success',
        showCancelButton: true,
        confirmButtonText: 'Siguiente',
        cancelButtonText: 'Cerrar',
        preConfirm: () => {
          handleNextGame();
        }
      });
    } else {
      Swal.fire({
        title: 'Incorrecto',
        text: '¡Has seleccionado la imagen incorrecta!',
        icon: 'error',
      });
    }
  };
  


  return (
    <div className='container'>
    {currentGame && (
      <div className='game'>
        <h2 className='level'>Nivel: {currentGame.nivel}</h2>
        <h2 className='descrpition'>{currentGame.descripcion}</h2>
        <ul className='list'>
          {currentGame.caracteristicas.map((caracteristica, i) => (
            <li className='item-list' key={i}>{caracteristica} </li>
          ))}
        </ul>
        <div className='img-container'>
            <img src={currentGame.img1} 
            className='img-container-1' 
            alt="Imagen 1" 
            onClick={() => handleImageClick(1)} // Verificar si es la imagen correcta
            />
            {showImg2 && <img src={currentGame.img2} className='img-container-2' alt="Imagen 2" onClick={() => handleImageClick(2)} />} {/* Condicionalmente mostrar img2 */}
        </div>
          <div className='button-container'>
              <button className='button-help' onClick={handleRemoveImage}>💡 Ayuda</button>
              <button className='button-next' onClick={handleBackGame}>⬅️ Anterior</button>
              <button className='button-next' onClick={handleNextGame}> ➡️ Siguiente</button>
              <button className='button-exit' onClick={handleNextGame}>❌ Salir</button>
          </div>

      </div>
    )}
  </div>
  );
};

export default JuegoDeSeleccion;
