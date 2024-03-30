import React from "react";
import "./EmparejarSonido.css";
import Volume from "../../assets/volume.svg";
import ChooseImg from "./ChooseImg";
import ChooseWord from "./ChooseWord";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom

const EmparejarSonido = () => {
  return (
    <div className="wrapper">
      <h1 className="tittle">¿Que deseas?</h1>
      <div className="containter-btn-select">
        <Link to="/detail/2/img" className="btn-select">
          <img className="icon-volume" src={Volume} alt="" />
          <br />
          <p>
            ESCUCHAR Y ELEGIR UNA <p className="btn1">PALABRA</p>
          </p>
        </Link>
        <Link to="/detail/2/word" className="btn-select">
          <img className="icon-volume" src={Volume} alt="" />
          <br />
          <p>
            ESCUCHAR Y ELEGIR UNA <p className="btn2">IMAGEN</p>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmparejarSonido;
