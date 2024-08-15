import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmparejarPalabra from "./components/EmparejarPalabra/EmparejarPalabra";
import EmparejarSonido from "./components/EmparejarSonido/EmparejarSonido";
import ElegiPersonaje from "./components/ElegiPersonaje/ElegiPersonaje";
import PalabraAislada from "./components/PalabraAislada/PalabraAislada";
import UnoSobra from "./components/UnoSobra/UnoSobra";
import ChooseImg from "./components/EmparejarSonido/ChooseImg";
import ChooseWord from "./components/EmparejarSonido/ChooseWord";
import { useState } from "react";

function App() {
  const [toggleStates, setToggleStates] = useState({
    oralHelp: false,
    writtenHelp: false,
    oralFeedback: false,
    writtenFeedback: false,
  });

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <ItemListContainer
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          {/* <Route path='/detail/:productId' element={<ItemDetailContainer />} /> */}
          <Route
            path="/detail/1"
            element={
              <ElegiPersonaje
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/2"
            element={
              <EmparejarSonido
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/3"
            element={
              <EmparejarPalabra
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/4"
            element={
              <UnoSobra
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/5"
            element={
              <PalabraAislada
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/2/img"
            element={
              <ChooseImg
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route
            path="/detail/2/word"
            element={
              <ChooseWord
                toggleStates={toggleStates}
                setToggleStates={setToggleStates}
              />
            }
          />
          <Route path="*" element={<h1>Error 404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
