import React, { useState } from "react";
import "./modal.css";
import { ToggleOn, ToggleOff } from "@styled-icons/material";

const SettingsModal = ({
  isOpen,
  setIsOpen,
  toggleStates,
  setToggleStates,
}) => {
  const handleToggle = (key) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={handleClose}>
              &times;
            </span>
            <h2>Configuración</h2>

            <div className="containerHelp">
              <h3
                style={{
                  margin: "0px",
                  fontWeight: "800",
                  fontFamily: "Poppins",
                  color: "blue",
                }}
              >
                Tipo de ayuda
              </h3>
              <div className="columns">
                <div className="column">
                  <div className="flex-row">
                    <span>Oral</span>
                    <div
                      className="toggle-icon"
                      onClick={() => handleToggle("oralHelp")}
                    >
                      {toggleStates.oralHelp ? (
                        <ToggleOn size={35} />
                      ) : (
                        <ToggleOff size={35} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="flex-row">
                    <span>Escrita</span>
                    <div
                      className="toggle-icon"
                      onClick={() => handleToggle("writtenHelp")}
                    >
                      {toggleStates.writtenHelp ? (
                        <ToggleOn size={35} />
                      ) : (
                        <ToggleOff size={35} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="containerHelp">
              <h3 style={{ margin: "0px", fontWeight: "800", color: "blue" }}>
                Tipo de respuesta
              </h3>
              <div className="columns">
                <div className="column">
                  <div className="flex-row">
                    <span>Oral</span>
                    <div
                      className="toggle-icon"
                      onClick={() => handleToggle("oralFeedback")}
                    >
                      {toggleStates.oralFeedback ? (
                        <ToggleOn size={35} />
                      ) : (
                        <ToggleOff size={35} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="flex-row">
                    <span>Visual</span>
                    <div
                      className="toggle-icon"
                      onClick={() => handleToggle("writtenFeedback")}
                    >
                      {toggleStates.writtenFeedback ? (
                        <ToggleOn size={35} />
                      ) : (
                        <ToggleOff size={35} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsModal;
